"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:now");
/**
 * Create a job for this exact moment
 * @name Agenda#now
 * @function
 * @param name name of job to schedule
 * @param data data to pass to job
 */
const now = async function (name, data) {
    debug("Agenda.now(%s, [Object])", name);
    try {
        const job = this.create(name, data);
        job.schedule(new Date());
        await job.save();
        return job;
    }
    catch (error) {
        debug("error trying to create a job for this exact moment");
        throw error;
    }
};
exports.now = now;
//# sourceMappingURL=now.js.map