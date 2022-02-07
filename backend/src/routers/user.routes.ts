import express from 'express';
import { UserContoller } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserContoller().login(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserContoller().register(req, res)
)

userRouter.route('/registerAdmin').post(
    (req, res) => new UserContoller().registerAdmin(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserContoller().changePassword(req, res)
)

userRouter.route('/allRequests').post(
    (req, res) => new UserContoller().allRequests(req, res)
)

userRouter.route('/allUsers').post(
    (req, res) => new UserContoller().allUsers(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserContoller().getUser(req, res)
)

userRouter.route('/getUserWithEmail').post(
    (req, res) => new UserContoller().getUserWithEmail(req, res)
)

userRouter.route('/acceptRequest').post(
    (req, res) => new UserContoller().acceptRequest(req, res)
)

userRouter.route('/declineRequest').post(
    (req, res) => new UserContoller().declineRequest(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res) => new UserContoller().deleteUser(req, res)
)

userRouter.route('/edit').post(
    (req, res) => new UserContoller().edit(req, res)
)

userRouter.route('/addAgency').post(
    (req, res) => new UserContoller().addAgency(req, res)
)

userRouter.route('/getAgency').post(
    (req, res) => new UserContoller().getAgency(req, res)
)

userRouter.route('/getAllAgencies').post(
    (req, res) => new UserContoller().getAllAgencies(req, res)
)

userRouter.route('/addToFavorites').post(
    (req, res) => new UserContoller().addToFavorites(req, res)
)
export default userRouter;