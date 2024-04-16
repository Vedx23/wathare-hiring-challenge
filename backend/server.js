const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to fetch data by range of time and frequency
app.get('/data', async (req, res) => {
    const { start, end, frequency } = req.query;

    try {
        let query = {
            ts: {
                gte: new Date(start),
                lte: new Date(end)
            }
        };

        // Fetch data from Prisma
        const data = await prisma.record.findMany({
            where: query
        });
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
