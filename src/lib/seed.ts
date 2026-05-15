import data from "@/data/jsondata.json";
import { connectDB } from "./mongodb";
import Insight from "@/models/Insight";

export async function seedDatabase() {
    await connectDB();

    await Insight.deleteMany();

    await Insight.insertMany(data);

    console.log("Database Seeded!");
}