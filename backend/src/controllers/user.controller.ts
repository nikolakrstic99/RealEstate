import * as express from 'express';
import Request from '../models/Request';
import User from '../models/user';
import mongodb = require("mongodb");
import Agency from '../models/agency';
const ObjectID = mongodb.ObjectID;

export class UserContoller {
    login = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let request = new Request(req.body);
        request.save().then(request => {
            res.status(200).json({ 'message': 'Request added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'Request not added' })
        });
    }

    registerAdmin = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        user.save().then(user => {
            res.status(200).json({ 'message': 'User added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'User not added' })
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        User.collection.updateOne({ 'username': req.body.username }, { $set: { 'password': req.body.newPassword } });
        res.status(200).json({ 'message': 'changed password' });
    }

    allRequests = (req: express.Request, res: express.Response) => {
        Request.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    allUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        User.find({ 'username': req.body.username }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        Request.findOneAndDelete({ 'username': req.body.username }, (err, request) => {
            if (err) console.log(err);
            else {
                const data = {
                    firstname: request.get('firstname'),
                    surname: request.get('surname'),
                    username: request.get('username'),
                    password: request.get('password'),
                    email: request.get('email'),
                    phone: request.get('phone'),
                    agency: request.get('agency'),
                    license: request.get('license'),
                    birthday: request.get('birthday'),
                    type: request.get('type'),
                    imageFile: request.get('imageFile')
                }
                let user = new User(data);
                user.save();
            }
        });
    }

    declineRequest = (req: express.Request, res: express.Response) => {
        res.status(200).json({ 'message': 'decline' });
        Request.collection.deleteOne({ 'username': req.body.username });
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        res.status(200).json({ 'message': 'delete' });
        User.collection.deleteOne({ 'username': req.body.username });
    }

    edit = (req: express.Request, res: express.Response) => {
        User.collection.deleteOne({ 'username': req.body.username });
        let user = new User(req.body);
        user.save().then(user => {
            res.status(200).json({ 'message': 'User edited' });
        }).catch(err => {
            res.status(400).json({ 'message': 'User not edited' })
        });
    }

    addAgency = (req: express.Request, res: express.Response) => {
        let agency = new Agency(req.body);
        agency.save().then(agency => {
            res.status(200).json({ 'message': 'Agency added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'Agency not added' })
        });
    }

    getAllAgencies = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getAgency = (req: express.Request, res: express.Response) => {
        Agency.findOne({ 'name': req.body.name }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    addToFavorites = (req: express.Request, res: express.Response) => {
        User.collection.findOneAndUpdate({ 'username': req.body.username }, { $push: { 'favorites': req.body.estateId } });
        res.status(200).json({ 'message': 'added to favorites' });
    }
    
    getUserWithEmail = (req: express.Request, res: express.Response) => {
        User.findOne({ 'email': req.body.email }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }
}