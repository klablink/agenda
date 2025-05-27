"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enable = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:enable");
/**
 * Enables any jobs matching the passed MongoDB query by setting the `disabled` flag to `false`
 * @name Agenda#enable
 * @function
 * @param query MongoDB query to use when enabling
 * @caller client code, Agenda.purge(), Job.remove()
 * @returns {Promise<Number>} A promise that contains the number of removed documents when fulfilled.
 */
const enable = async function (query = {}) {
    debug("attempting to enable all jobs matching query", query);
    try {
        const { modifiedCount } = await this._collection.updateMany(query, {
            $set: { disabled: false },
        });
        debug("%s jobs enabled", modifiedCount);
        return modifiedCount;
    }
    catch (error) {
        debug("error trying to mark jobs as `enabled`");
        throw error;
    }
};
exports.enable = enable;
//# sourceMappingURL=enable.js.map