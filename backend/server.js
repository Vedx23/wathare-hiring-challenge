import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient();

async function main() {
    const data = await prismaClient.record.create({
        data: {
            "ts": new Date('2024-01-21T15:00:01Z'),
            "machine_status": 1,
            "vibration": 536
        }
    })

    console.log(data);
}

main();