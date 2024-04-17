const express = require('express');
const {MongoClient} = require("mongodb");
const getfilterString = require("./GetFilterString");
const connectToMongo = require("./ConnectToMongo");
const getZeroStats = require("./GetZeroStats");
const cors = require('cors')

const freqroute = require("./routes/GetFrequencies");

const uri = 'mongodb+srv://sudo:admin123@cluster0.golxv4m.mongodb.net/';
const app = express();

const client = new MongoClient(uri);

connectToMongo(client); // Connect to MongoDB server.

//cors allow for all origins
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow specified headers
//     next();
// });

app.use(cors());

app.use("/getfreqs",freqroute);

app.post('/data', async (req, res) => {

    const { start, end, frequency } = req.query;

    console.log(start);
    console.log(end);

    if (!start || start === "" || !end || end === "") {
        res.status(403).json({ message: "start or end date not found" })
    }

    const filter = getfilterString(frequency);

    try {
        const database = client.db('mwdb');
        const collection = database.collection('Record');

        const aggregationResult = await collection.aggregate([
            {
                '$match': {
                    'ts': {
                        '$gte': new Date('2024-01-01T00:00:00Z'),
                        '$lte': new Date('2024-02-02T00:00:00Z')
                    }
                }
            }, {
                '$group': {
                    '_id': {
                        '$dateToString': {
                            'format': filter,
                            'date': '$ts'
                        }
                    },
                    'data': {
                        '$first': '$$ROOT'
                    }
                }
            }, {
                '$replaceRoot': {
                    'newRoot': '$data'
                }
            }, {
                '$sort': {
                    'ts': 1
                }
            }
        ]).toArray();

        let zeroStats = getZeroStats(aggregationResult);

        res.status(200).send({
            stats: zeroStats,
            machine_data: aggregationResult
        })
    } catch (error) {
        console.error('Error performing aggregation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
