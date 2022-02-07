import express from 'express';
import { AssistantController } from '../controllers/assistant.controller';
const assistantRouter = express.Router();

assistantRouter.route('/allCities').post(
    (req, res) => new AssistantController().allCities(req, res)
)

assistantRouter.route('/allMunicipalities').post(
    (req, res) => new AssistantController().allMunicipalities(req, res)
)

assistantRouter.route('/addLocation').post(
    (req, res) => new AssistantController().addLocation(req, res)
)

assistantRouter.route('/allLocationes').post(
    (req, res) => new AssistantController().allLocationes(req, res)
)

assistantRouter.route('/getLocation').post(
    (req, res) => new AssistantController().getLocation(req, res)
)

assistantRouter.route('/getBusses').post(
    (req, res) => new AssistantController().getBusses(req, res)
)

assistantRouter.route('/getAllUnsold').post(
    (req, res) => new AssistantController().getAllUnsold(req, res)
)

assistantRouter.route('/getSoldByLocation').post(
    (req, res) => new AssistantController().getSoldByLocation(req, res)
)

assistantRouter.route('/getSoldByLocationUser').post(
    (req, res) => new AssistantController().getSoldByLocationUser(req, res)
)
export default assistantRouter;