"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = schedule;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:schedule");
function schedule(when, names, data) {
    /**
     * Internal method that creates a job with given date
     * @param when when the job gets run
     * @param name of job to run
     * @param data data to send to job
     * @returns instance of new job
     */
    const createJob = async (when, name, data) => {
        const job = this.create(name, data);
        await job.schedule(when).save();
        return job;
    };
    /**
     * Internal helper method that calls createJob on a names array
     * @param when when the job gets run
     * @param names names of jobs to run
     * @param data data to send to job
     * @returns jobs that were created
     */
    const createJobs = async (when, names, data) => {
        try {
            const createJobList = [];
            names.map((name) => createJobList.push(createJob(when, name, data)));
            debug("Agenda.schedule()::createJobs() -> all jobs created successfully");
            return Promise.all(createJobList);
        }
        catch (error) {
            debug("Agenda.schedule()::createJobs() -> error creating one or more of the jobs");
            throw error;
        }
    };
    if (typeof names === "string") {
        debug("Agenda.schedule(%s, %O, [%O], cb)", when, names);
        return createJob(when, names, data);
    }
    if (Array.isArray(names)) {
        debug("Agenda.schedule(%s, %O, [%O])", when, names);
        return createJobs(when, names, data);
    }
    throw new TypeError("Name must be string or array of strings");
}
;
//# sourceMappingURL=schedule.js.map