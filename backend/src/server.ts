import express from 'express';
import cors from 'cors'
//import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import assistantRouter from './routers/assistant.routes';
import realEstateRouter from './routers/realEstate.route';

const app = express();

app.use(cors())
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/realEstate');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();
router.use('/assistant', assistantRouter)
router.use('/user',userRouter);
router.use('/realEstate',realEstateRouter);
app.use('/', router);


app.listen(4000, () => console.log(`Express server running on port 4000`));