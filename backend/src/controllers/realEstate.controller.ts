import * as express from 'express';
import Estate from '../models/estate';
const ObjectId = require('mongodb').ObjectId;

export class RealEstateController {
    addRealEstate = (req: express.Request, res: express.Response) => {
        let estate = new Estate(req.body);
        estate.save().then(estate => {
            res.status(200).json({ 'message': 'Real estate added' });
        }).catch(err => {
            res.status(400).json({ 'message': 'Real estate not added' })
        });
    }

    editRealEstate = (req: express.Request, res: express.Response) => {
        Estate.collection.updateOne({ _id: ObjectId(req.body._id) }, {
            $set: {
                'type': req.body.type,
                'name': req.body.name,
                'city': req.body.city,
                'municipality': req.body.municipality,
                'location': req.body.location,
                'street': req.body.street,
                'area': req.body.area,
                'rooms': req.body.rooms,
                'constructionYear': req.body.constructionYear,
                'state': req.body.state,
                'heating': req.body.heating,
                'floor': req.body.floor,
                'totalFloors': req.body.totalFloors,
                'parking': req.body.parking,
                'monthly': req.body.monthly,
                'price': req.body.price,
                'about': req.body.about,
                'characteristics': req.body.characteristics,
                'busses': req.body.busses,
                'agencyName': req.body.agencyName,
                'agencyPIB': req.body.agencyPIB,
                'agencyCity': req.body.agencyCity,
                'agencyAddress': req.body.agencyAddress,
                'agencyPhone': req.body.agencyPhone,
                'adFirstName': req.body.adFirstName,
                'adSurname': req.body.adSurname,
                'adPhone': req.body.adPhone,
                'sold': req.body.sold,
                'lastModified': req.body.lastModified,
                'lat': req.body.lat,
                'lng': req.body.lng
            }
        });
        res.status(200).json({ 'message': 'Real Estate edited' });
    }

    getEstateWithUsername = (req: express.Request, res: express.Response) => {
        Estate.find({ 'adFirstName': req.body.adFirstName, 'adSurname': req.body.adSurname }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    sold = (req: express.Request, res: express.Response) => {
        Estate.collection.updateOne({ 'name': req.body.name, 'adFirstName': req.body.adFirstName, 'adSurname': req.body.adSurname }, { $set: { 'sold': true } });
        res.status(200).json({ 'message': 'Real Estate sold' });
    }

    getLastFive = (req: express.Request, res: express.Response) => {
        Estate.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ _id: -1 }).limit(5);
    }

    findEstateByLocation = (req: express.Request, res: express.Response) => {
        Estate.find({ 'city': req.body.city, 'municipality': req.body.municipality, 'location': req.body.location }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })
    }

    getLastRealEstate = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err)
                console.log(err);
            else {
                res.json(requests);
            }
        }).sort({ 'id': -1 });
    }

    findRealEstateById = (req: express.Request, res: express.Response) => {
        Estate.findOne({ 'id': req.body.id }, (err, requests) => {
            if (err)
                console.log(err);
            else {
                res.json(requests);
            }
        });
    }

    getPrice = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ price: req.body.num }).limit(1);
    }

    getArea = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ area: req.body.num }).limit(1);
    }

    getYear = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ constructionYear: req.body.num }).limit(1);
    }

    getMonthlyCost = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ monthly: req.body.num }).limit(1);
    }

    getFloor = (req: express.Request, res: express.Response) => {
        Estate.findOne({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        }).sort({ floor: req.body.num }).limit(1);
    }

    allOthersEstates = (req: express.Request, res: express.Response) => {//all estates except id that are not sold
        Estate.find({ id: { $ne: req.body.id }, sold: 0  }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        });
    }

    getAll = (req: express.Request, res: express.Response) => {
        Estate.find({}, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        });
    }
}
