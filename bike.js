"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
var Bike = /** @class */ (function () {
    function Bike(name, type, bodySize, maxLoad, rate, description, ratings, imageUrls, id) {
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.maxLoad = maxLoad;
        this.rate = rate;
        this.description = description;
        this.ratings = ratings;
        this.imageUrls = imageUrls;
        this.id = id;
    }
    return Bike;
}());
exports.Bike = Bike;
