import * as mongoose from 'mongoose';
import User, { UserModelInterface } from './user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../env';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        minlength: 6
    },
    expTimeStamp: {
        type: Number,
        required: false
    },
    tokens: [
        {
            token: {
                type: String,
                required: false
            }
        }
    ]
});

export const userSchemaAuthenticated = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    expTimeStamp: {
        type: Number,
        required: false
    },
    tokens: [
        {
            token: {
                type: String,
                required: false
            }
        }
    ]
});

userSchema.pre<User>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.statics.replacePasswordHash = async function (email: string, password: string) {
    const user = await this.findOne({ email: email });
    user.password = password;
    user.expTimeStamp=Date.now();
    await user.save();
    return user;
};

userSchema.statics.findByCredentials = async function (email: string, password: string) {
    const user = await this.findOne({ email: email });
    if (!user) {
        throw new Error('No User! Wrong credentials provided');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        throw new Error('Wrong Password! Wrong credentials provided');
    }
    return user;
};

userSchema.methods.generateToken = async function generateToken() {
    const token = jwt.sign({ id: this.id, username: this.name }, JWT_KEY);
    this.tokens = this.tokens.concat({ token });
    this.expTimeStamp = Infinity;
    await this.save();
    return token;
};

const UserModel: UserModelInterface = mongoose.model<User, UserModelInterface>('User', userSchema);
const UserModelAuthenticated: UserModelInterface = mongoose.model<User, UserModelInterface>('User', userSchemaAuthenticated);

export UserModelAuthenticated;
export default UserModel;