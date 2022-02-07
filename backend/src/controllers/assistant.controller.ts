import * as express from 'express';
import Municipality from '../models/Municipality';
import City from '../models/city';
import Location from '../models/location';
import Bus from '../models/bus';
import Estate from '../models/estate';

export class AssistantController {

    allCities = (req: express.Request, res: express.Response) => {
        City.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    allMunicipalities = (req: express.Request, res: express.Response) => {
        Municipality.find({ "city": req.body.city }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    allLocationes = (req: express.Request, res: express.Response) => {
        Location.find({ "city": req.body.city, "municipality": req.body.municipality }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getLocation = (req: express.Request, res: express.Response) => {
        Location.findOne({ "city": req.body.city, "municipality": req.body.municipality, "location": req.body.location }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    addLocation = (req: express.Request, res: express.Response) => {
        let location = new Location(req.body);
        location.save().then(location => {
            res.status(200).json({ 'message': 'Location added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'Location not added' })
        });
    }

    getBusses = (req: express.Request, res: express.Response) => {
        Bus.findOne({ 'city': req.body.city }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getAllUnsold = (req: express.Request, res: express.Response) => {
        Estate.find({ sold: 0 }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getSoldByLocation = (req: express.Request, res: express.Response) => {
        Estate.find({ sold: { $ne: 0 }, city: req.body.city, municipality: req.body.municipality, location: req.body.location, agencyName: req.body.agency }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getSoldByLocationUser = (req: express.Request, res: express.Response) => {
        Estate.find({ sold: { $ne: 0 }, city: req.body.city, municipality: req.body.municipality, location: req.body.location }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }
}