import express from 'express';
import { RealEstateController } from '../controllers/realEstate.controller';
const realEstateRouter = express.Router();

realEstateRouter.route('/addRealEstate').post(
    (req, res) => new RealEstateController().addRealEstate(req, res)
)

realEstateRouter.route('/editRealEstate').post(
    (req, res) => new RealEstateController().editRealEstate(req, res)
)

realEstateRouter.route('/getEstateWithUsername').post(
    (req, res) => new RealEstateController().getEstateWithUsername(req, res)
)

realEstateRouter.route('/sold').post(
    (req, res) => new RealEstateController().sold(req, res)
)

realEstateRouter.route('/getLastFive').post(
    (req, res) => new RealEstateController().getLastFive(req, res)
)

realEstateRouter.route('/findEstateByLocation').post(
    (req, res) => new RealEstateController().findEstateByLocation(req, res)
)

realEstateRouter.route('/getLastRealEstate').post(
    (req, res) => new RealEstateController().getLastRealEstate(req, res)
)

realEstateRouter.route('/findRealEstateById').post(
    (req, res) => new RealEstateController().findRealEstateById(req, res)
)

realEstateRouter.route('/getPrice').post(
    (req, res) => new RealEstateController().getPrice(req, res)
)

realEstateRouter.route('/getArea').post(
    (req, res) => new RealEstateController().getArea(req, res)
)

realEstateRouter.route('/getYear').post(
    (req, res) => new RealEstateController().getYear(req, res)
)

realEstateRouter.route('/getMonthlyCost').post(
    (req, res) => new RealEstateController().getMonthlyCost(req, res)
)

realEstateRouter.route('/getFloor').post(
    (req, res) => new RealEstateController().getFloor(req, res)
)

realEstateRouter.route('/allOthersEstates').post(
    (req, res) => new RealEstateController().allOthersEstates(req, res)
)

realEstateRouter.route('/getAll').post(
    (req, res) => new RealEstateController().getAll(req, res)
)
export default realEstateRouter;