"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:disable");
/**
 * Disables any jobs matching the passed MongoDB query by setting the `disabled` flag to `true`
 * @name Agenda#disable
 * @function
 * @param query MongoDB query to use when enabling
 * @returns {Promise<number>} Resolved with the number of disabled job instances.
 */
const disable = async function (query = {}) {
    debug("attempting to disable all jobs matching query", query);
    try {
        const { modifiedCount } = await this._collection.updateMany(query, {
            $set: { disabled: true },
        });
        debug("%s jobs disabled");
        return modifiedCount;
    }
    catch (error) {
        debug("error trying to mark jobs as `disabled`");
        throw error;
    }
};
exports.disable = disable;
//# sourceMappingURL=disable.js.map