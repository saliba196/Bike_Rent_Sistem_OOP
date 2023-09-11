"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
var Rent = /** @class */ (function () {
    function Rent(bike, user, dateFrom, dateTo, dateReturned) {
        this.bike = bike;
        this.user = user;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.dateReturned = dateReturned;
    }
    Rent.create = function (rents, bike, user, startDate, endDate) {
        var canCreate = Rent.canRent(rents, startDate, endDate);
        if (canCreate)
            return new Rent(bike, user, startDate, endDate);
        throw new Error('Overlapping dates.');
    };
    Rent.canRent = function (rents, startDate, endDate) {
        for (var _i = 0, rents_1 = rents; _i < rents_1.length; _i++) {
            var rent = rents_1[_i];
            if (startDate <= rent.dateTo && endDate >= rent.dateFrom) {
                return false;
            }
        }
        return true;
    };
    return Rent;
}());
exports.Rent = Rent;
