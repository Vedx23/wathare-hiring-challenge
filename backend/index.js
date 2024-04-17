const express = require('express');
const {MongoClient} = require("mongodb");
const uri = 'mongodb+srv://sudo:admin123@cluster0.golxv4m.mongodb.net/';
const getfilterString = require("./GetFilterString");
const connectToMongo = require("./ConnectToMongo");
const app = express();

const client = new MongoClient(uri);

connectToMongo(client); // Connect to MongoDB server.

app.get('/data', async (req, res) => {

    const { start, end, frequency } = req.query;

    if (!start || start === "" || !end || end === "") {
        res.status(403).json({ message: "start or end date not found" })
    }

    const filter = getfilterString(frequency);

    try {
        const database = client.db('mwdb');
        const collection = database.collection('Record');

        const aggregationResult = await collection.aggregate([
            // Your aggregation pipeline stages here
            {
                '$match': {
                    'ts': {
                        '$gte': new Date('Mon, 01 Jan 2024 00:00:00 GMT'),
                        '$lte': new Date('Thu, 01 Feb 2024 00:00:00 GMT')
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

        res.json(aggregationResult);
    } catch (error) {
        console.error('Error performing aggregation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
