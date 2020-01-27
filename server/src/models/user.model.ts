import * as mongoose from 'mongoose';
import User, { UserModelInterface } from './user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../env';

const userSchema = new mongoose.Schema({
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
    tokens: [
        {
            token: {
                type: String,
                required: true
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

userSchema.statics.findByCredentials = async function (name: string, password: string) {
    const user = await this.findOne({ name: name });
    if (!user) {
        throw new Error('Wrong credentials provided');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        throw new Error('Wrong credentials provided');
    }
    return user;
};

userSchema.methods.generateToken = async function generateToken() {
    const token = jwt.sign({ id: this.id, username: this.name }, JWT_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

const UserModel: UserModelInterface = mongoose.model<User, UserModelInterface>('User', userSchema);

export default UserModel;