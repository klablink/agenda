"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("agenda:close");
/** Close the db and it's underlying connections
 * Only works if agenda was instantiated without preconfigured mongoDb instance.
 * If the mongoDb instance was supplied during instantiation or via agenda.mongo, this function will do nothing and return agenda anyway.
 * @name Agenda#close
 * @function
 * @param [option] {{ force: boolean }} Force close, emitting no events
 *
 *
 * @caller client code
 *
 * @link https://mongodb.github.io/node-mongodb-native/2.0/api/Db.html#close
 */
const close = async function (option) {
    debug("close db connection for this agenda instance");
    const closeOptions = Object.assign({ force: false }, option);
    try {
        if (this._db) {
            await this._db.close(closeOptions.force);
        }
        return this;
    }
    catch (error) {
        debug("error trying to close db connection to");
        throw error;
    }
};
exports.close = close;
//# sourceMappingURL=close.js.map