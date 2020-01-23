
import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb'

const authorisationRouter = express.Router();
// const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var passwordHash = require('password-hash');




authorisationRouter.post('/register', function (req: express.Request, res: express.Response, next: express.NextFunction) {
	const userString: string = req.body.username;
	const emailString: string = req.body.email;
	const hashedPassword = passwordHash.generate(req.body.password);


	///check if user exists in db
	MongoHelper.client.db('messaging').collection('users').findOne({user:req.body.username}, function(err, result) {
		if(err) {
	        console.log('Error occurred while finding');
	        res.sendStatus(400);
	       // return 
	    } else {
	    	if (result!=null){
	    		res.status(400).send({error:"User with this name/email already exists!"});
	    	}
	    }
	});
	    	
	
	///insert user into db
	MongoHelper.client.db('messaging').collection('users').insertOne({user:userString,email:emailString,pwHash:hashedPassword}, function (error, response) {
	    if(error) {
	        console.log('Error occurred while inserting');
	        res.sendStatus(400);
	       // return 
	    } else {
	       console.log('inserted record', response.ops[0]);
	       res.sendStatus(200);
	      // return 
	    }
	});
	

});

authorisationRouter.post('/reset', function (req: express.Request, res: express.Response, next: express.NextFunction) {

	MongoHelper.client.db('messaging').collection('users').deleteMany({});
	res.send(200);
});

authorisationRouter.post('/login', function (req: express.Request, res: express.Response, next: express.NextFunction) {


	

	
	MongoHelper.client.db('messaging').collection('users').findOne({user:req.body.username}, function(err, result) {
		if(err) {
	        console.log('Error occurred while inserting');
	        res.sendStatus(400);
	       // return 
	    } else {
	    	console.log('found the following boi', result);
	    	console.log("req.body.password: ",req.body.password);
	    	if (result == null){
	    		res.status(400).send({error:"Username doesn't exist!"});
	    	}
	    	if (passwordHash.verify(req.body.password,result.pwHash)){
	    		res.sendStatus(200);
	    	}else{
	    		res.status(400).send({error:"Incorrect password!"});
	    	}
	    	
	       
	      // return 
	    }
	});

	

	
});

export { authorisationRouter };