const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/data', async (req, res) => {
    const { start, end, frequency } = req.query;
    const validFrequencies = ["seconds", "minutes", "hours"];
    const freqValue = validFrequencies.includes(frequency) ? frequency : "seconds"; //default step is one second

    try {
        let query = {
            ts: {
                gte: new Date(start),
                lte: new Date(end)
            }
        };

        const data = await prisma.record.findMany({
            where: query
        });
   
        res.json(data);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
