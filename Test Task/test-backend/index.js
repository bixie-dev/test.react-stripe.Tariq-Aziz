require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const flash = require('express-flash');
// const session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter)

const { Schema } = mongoose;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/test',
    (err) => {
        if (!err) {
            console.log('connection opened');
        } else {
            console.log(err);
        }
    }
)

const schema = new Schema({
    item: String,
    serviceName: String,
    price: Number,
})

const DryCleaning = 'dry-cleaning'; // dry
const DuvetAndPillow = 'duvet-and-pillow'; // duvet
const AltAndRepair = 'alternation-and-repairs-in-mill-hill'; // alt
const ShirtService = 'shirt-service'; // shirt
const IroningService = 'ironing-service'; // ironing
const ServiceWash = 'service-wash'; // service

app.get('/api/getData/:category', (req, res) => {
    let collection;
    switch (req.params.category) {
        case DryCleaning:
            collection = 'dry';
            break;
        case DuvetAndPillow:
            collection = 'duvet';
            break;
        case AltAndRepair:
            collection = 'alt';
            break;
        case ShirtService:
            collection = 'shirt';
            break;
        case IroningService:
            collection = 'ironing';
            break;
        case ServiceWash:
            collection = 'service';
            break;
        default:
            ;
    }

    const Model = new mongoose.model('model', schema, collection);
    Model.find((err, results) => res.status(200).json(results))
})

app.listen(process.env.PORT);
