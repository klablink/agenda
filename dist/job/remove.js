"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
/**
 * Remove the job from MongoDB
 * @name Job#remove
 * @function
 */
const remove = async function () {
    return this.agenda.cancel({ _id: this.attrs._id });
};
exports.remove = remove;
//# sourceMappingURL=remove.js.map