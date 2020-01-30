
import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import User from './models/user.model';
import * as nodemailer from "nodemailer";
import * as generator from 'generate-password'

const authorisationRouter = express.Router();

authorisationRouter.post('/register', async function (req: express.Request, res: express.Response, next: express.NextFunction) {

	try {
		const user = new User(req.body);
		await user.save();
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

authorisationRouter.post('/asdf', function (req: express.Request, res: express.Response, next: express.NextFunction) {
	res.status(200).send("hello world");
});

authorisationRouter.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
	try {

		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findByCredentials(email, password);
		if ((Date.now() - user.expTimeStamp) / 1000 > 100) {
			return res.status(401).send({ error: 'New password expired!' });
		}
		if (!user) {
			return res.status(401).json({ error: 'Wrong credentials provided' });
		}

		const token = await user.generateToken();
		res.json(token);
	} catch (e) {
		console.log("error!" + e);
		res.status(400).json(e);

	}
});

authorisationRouter.post('/passwordReset', async function (req: express.Request, res: express.Response, next: express.NextFunction) {

	const email = req.body.email;


	// create reusable transporter object using the default SMTP transport

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'teiterteitle@gmail.com',
			pass: 'turtleman'
		}
	});


	var password = generator.generate({
		length: 10,
		numbers: true
	});

	const user = await User.replacePasswordHash(email, password);

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'allenTheSpam@gmail.com', // sender address
		to: "teiterteitle@gmail.com", // list of receivers
		subject: "password reset", // Subject line
		text: "Random password generated: ", // plain text body
		html: "<b>" + password + "</b>" // html body
	});

	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	res.status(200).send("A new password has been sent to the provided email");
});



export { authorisationRouter };