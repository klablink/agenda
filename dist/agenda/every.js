"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:every");
/**
 * Creates a scheduled job with given interval and name/names of the job to run
 * @name Agenda#every
 * @function
 * @param interval - run every X interval
 * @param names - String or strings of jobs to schedule
 * @param data - data to run for job
 * @param options - options to run job for
 * @returns Job/s created. Resolves when schedule fails or passes
 */
const every = async function (interval, names, data, options) {
    /**
     * Internal method to setup job that gets run every interval
     * @param interval run every X interval
     * @param name String job to schedule
     * @param [data] data to run for job
     * @param [options] options to run job for
     * @returns instance of job
     */
    const createJob = async (interval, name, data, options) => {
        const job = this.create(name, data);
        job.attrs.type = "single";
        job.repeatEvery(interval, options);
        return job.save();
    };
    /**
     * Internal helper method that uses createJob to create jobs for an array of names
     * @param interval run every X interval
     * @param names Strings of jobs to schedule
     * @param [data] data to run for job
     * @param [options] options to run job for
     * @return array of jobs created
     */
    const createJobs = async (interval, names, data, options) => {
        try {
            const jobs = [];
            names.map((name) => jobs.push(createJob(interval, name, data, options)));
            debug("every() -> all jobs created successfully");
            return Promise.all(jobs);
        }
        catch (error) {
            // @TODO: catch - ignore :O
            debug("every() -> error creating one or more of the jobs", error);
        }
    };
    if (typeof names === "string") {
        debug("Agenda.every(%s, %O, %O)", interval, names, options);
        const jobs = await createJob(interval, names, data, options);
        return jobs;
    }
    if (Array.isArray(names)) {
        debug("Agenda.every(%s, %s, %O)", interval, names, options);
        const jobs = await createJobs(interval, names, data, options);
        return jobs;
    }
};
exports.every = every;
//# sourceMappingURL=every.js.map