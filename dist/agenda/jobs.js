"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = void 0;
const utils_1 = require("../utils");
/**
 * Finds all jobs matching 'query'
 * @name Agenda#jobs
 * @function
 * @param [query] object for MongoDB
 * @param [sort] object for MongoDB
 * @param [limit] number of documents to return from MongoDB
 * @param [number] of documents to skip in MongoDB
 * @returns resolves when fails or passes
 */
const jobs = async function (query = {}, sort = {}, limit = 0, skip = 0) {
    const result = await this._collection
        .find(query) // eslint-disable-line
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .toArray();
    return result.map((job) => (0, utils_1.createJob)(this, job));
};
exports.jobs = jobs;
//# sourceMappingURL=jobs.js.map