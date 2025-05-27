"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touch = void 0;
/**
 * Updates "lockedAt" time so the job does not get picked up again
 * @name Job#touch
 * @function
 */
const touch = async function () {
    this.attrs.lockedAt = new Date();
    return this.save();
};
exports.touch = touch;
//# sourceMappingURL=touch.js.map