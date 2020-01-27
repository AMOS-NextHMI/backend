
import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import User from './models/user.model';

const authorisationRouter = express.Router();

authorisationRouter.post('/register', async function (req: express.Request, res: express.Response, next: express.NextFunction) {

	try {
		const user = new User(req.body);
		await user.save();
		console.log(user);
		const token = await user.generateToken();
		res.status(201).json(token);
	} catch (e) {
		res.status(400).json({ error: e });
	}

});

authorisationRouter.post('/reset', function (req: express.Request, res: express.Response, next: express.NextFunction) {
	MongoHelper.client.db('messaging').collection('users').deleteMany({});
	res.send(200);
});

authorisationRouter.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const { name, password } = req.body;
		const user = await User.findByCredentials(name, password);
		if (!user) {
			return res.status(401).json({ error: 'Wrong credentials provided' });
		}
		const token = await user.generateToken();
		res.json(token);
	} catch (e) {
		res.status(400).json(e);
	}
});

export { authorisationRouter };