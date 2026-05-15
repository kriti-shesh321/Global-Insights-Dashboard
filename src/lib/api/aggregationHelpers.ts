import Insight from "@/models/Insight";
import { MongoFilter } from "./buildMongoFilters";

function buildMatchWithNonEmptyField(filters: MongoFilter, field: string) {
    return {
        $and: [
            filters,
            {
                [field]: {
                    $nin: ["", null],
                },
            },
        ],
    };
}

function buildMatchWithNonEmptyFieldAndNumberMetric(
    filters: MongoFilter,
    groupField: string,
    averageField: string
) {
    return {
        $and: [
            filters,
            {
                [groupField]: {
                    $nin: ["", null],
                },
            },
            {
                [averageField]: {
                    $type: "number",
                },
            },
        ],
    };
}

export async function getCountByField(
    field: string,
    filters: MongoFilter = {},
    limit = 10
) {
    return Insight.aggregate([
        {
            $match: buildMatchWithNonEmptyField(filters, field),
        },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
        {
            $limit: limit,
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                count: 1,
            },
        },
    ]);
}

export async function getAverageByField(
    groupField: string,
    averageField: string,
    outputKey: string,
    filters: MongoFilter = {},
    limit = 10
) {
    return Insight.aggregate([
        {
            $match: buildMatchWithNonEmptyFieldAndNumberMetric(
                filters,
                groupField,
                averageField
            ),
        },
        {
            $group: {
                _id: `$${groupField}`,
                [outputKey]: { $avg: `$${averageField}` },
            },
        },
        {
            $sort: {
                [outputKey]: -1,
            },
        },
        {
            $limit: limit,
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                [outputKey]: { $round: [`$${outputKey}`, 2] },
            },
        },
    ]);
}

export async function getDistinctValues(field: string) {
    const values = await Insight.distinct(field, {
        [field]: { $nin: ["", null] },
    });

    return values
        .map((value) => String(value))
        .filter((value) => value.trim() !== "")
        .sort((a, b) => a.localeCompare(b));
}

export async function getAverageMetric(
    metric: string,
    filters: MongoFilter = {}
) {
    const result = await Insight.aggregate([
        {
            $match: {
                $and: [
                    filters,
                    {
                        [metric]: {
                            $type: "number",
                        },
                    },
                ],
            },
        },
        {
            $group: {
                _id: null,
                average: { $avg: `$${metric}` },
            },
        },
        {
            $project: {
                _id: 0,
                average: { $round: ["$average", 2] },
            },
        },
    ]);

    return result[0]?.average ?? 0;
}

export async function getDistinctCount(
    field: string,
    filters: MongoFilter = {}
) {
    const values = await Insight.distinct(field, {
        $and: [
            filters,
            {
                [field]: {
                    $nin: ["", null],
                },
            },
        ],
    });

    return values.length;
}