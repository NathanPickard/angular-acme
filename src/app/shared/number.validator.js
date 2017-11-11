"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberValidators = (function () {
    function NumberValidators() {
    }
    NumberValidators.range = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    };
    return NumberValidators;
}());
exports.NumberValidators = NumberValidators;
//# sourceMappingURL=number.validator.js.map