"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purge = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:purge");
/**
 * Removes all jobs from queue
 * @name Agenda#purge
 * @function
 * @returns resolved when job cancelling fails or passes
 */
const purge = async function () {
    // @NOTE: Only use after defining your jobs
    const definedNames = Object.keys(this._definitions);
    debug("Agenda.purge(%o)", definedNames);
    return this.cancel({ name: { $not: { $in: definedNames } } });
};
exports.purge = purge;
//# sourceMappingURL=purge.js.map