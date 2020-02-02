
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
	} catch (error) {
		console.log(error.toString());
		res.status(422).json({ "error": error.toString() });
	}
});

authorisationRouter.post('/reset', function (req: express.Request, res: express.Response, next: express.NextFunction) {
	MongoHelper.client.db('messaging').collection('users').deleteMany({});
	res.send(200);
});

authorisationRouter.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log(req);
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findByCredentials(email, password);
		if ((Date.now() - user.expTimeStamp) / 1000 > 100) {
			return res.status(401).send({ "error": "New password expired!" });
		}
		const token = await user.generateToken();
		res.json(token);
	} catch (error) {
		console.log(error.toString());
		res.status(422).json({ "error": error.toString() });
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