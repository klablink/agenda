"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndLockNextJob = void 0;
const debug_1 = __importDefault(require("debug"));
const utils_1 = require("../utils");
const debug = (0, debug_1.default)("agenda:internal:_findAndLockNextJob");
/**
 * Find and lock jobs
 * @name Agenda#findAndLockNextJob
 * @function
 * @param jobName name of job to try to lock
 * @param definition definition used to tell how job is run
 * @access protected
 * @caller jobQueueFilling() only
 */
const findAndLockNextJob = async function (jobName, definition) {
    const now = new Date();
    const lockDeadline = new Date(Date.now().valueOf() - definition.lockLifetime);
    debug("_findAndLockNextJob(%s, [Function])", jobName);
    const JOB_PROCESS_WHERE_QUERY = {
        $and: [
            {
                name: jobName,
                disabled: { $ne: true },
            },
            {
                $or: [
                    {
                        lockedAt: { $eq: null },
                        nextRunAt: { $lte: this._nextScanAt },
                    },
                    {
                        lockedAt: { $lte: lockDeadline },
                    },
                ],
            },
        ],
    };
    /**
     * Query used to set a job as locked
     * @type {{$set: {lockedAt: Date}}}
     */
    const JOB_PROCESS_SET_QUERY = { $set: { lockedAt: now } };
    /**
     * Query used to affect what gets returned
     * @type {{returnOriginal: boolean, sort: object}}
     */
    const JOB_RETURN_QUERY = { returnDocument: "after", sort: this._sort };
    // Find ONE and ONLY ONE job and set the 'lockedAt' time so that job begins to be processed
    const result = await this._collection.findOneAndUpdate(JOB_PROCESS_WHERE_QUERY, JOB_PROCESS_SET_QUERY, 
    // @ts-ignore
    JOB_RETURN_QUERY);
    let job = undefined;
    // @ts-ignore
    if (result.value) {
        debug("found a job available to lock, creating a new job on Agenda with id [%s]", 
        // @ts-ignore
        result.value._id);
        // @ts-ignore
        job = (0, utils_1.createJob)(this, result.value);
    }
    return job;
};
exports.findAndLockNextJob = findAndLockNextJob;
//# sourceMappingURL=find-and-lock-next-job.js.map