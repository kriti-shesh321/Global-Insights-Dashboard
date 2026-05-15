import mongoose from "mongoose";
import { seedDatabase } from "@/lib/seed";

async function main() {
    try {
        await seedDatabase();
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

main();
