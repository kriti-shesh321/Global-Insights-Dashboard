import mongoose, { Schema } from "mongoose";

const InsightSchema = new Schema(
    {
        end_year: {
            type: Schema.Types.Mixed,
            default: "",
        },
        intensity: {
            type: Number,
            default: 0,
        },
        sector: {
            type: String,
            default: "",
            trim: true,
        },
        topic: {
            type: String,
            default: "",
            trim: true,
        },
        insight: {
            type: String,
            default: "",
            trim: true,
        },
        url: {
            type: String,
            default: "",
            trim: true,
        },
        region: {
            type: String,
            default: "",
            trim: true,
        },
        start_year: {
            type: Schema.Types.Mixed,
            default: "",
        },
        impact: {
            type: Schema.Types.Mixed,
            default: "",
        },
        added: {
            type: String,
            default: "",
        },
        published: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
            trim: true,
        },
        relevance: {
            type: Number,
            default: 0,
        },
        pestle: {
            type: String,
            default: "",
            trim: true,
        },
        source: {
            type: String,
            default: "",
            trim: true,
        },
        title: {
            type: String,
            default: "",
            trim: true,
        },
        likelihood: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Insight =
    mongoose.models.Insight || mongoose.model("Insight", InsightSchema);

export default Insight;