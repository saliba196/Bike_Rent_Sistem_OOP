"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var App = /** @class */ (function () {
    function App() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    App.prototype.findUser = function (email) {
        return this.users.find(function (user) {
            return user.email === email;
        });
    };
    App.prototype.registerUser = function (user) {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var rUser = _a[_i];
            if (rUser.email === user.email) {
                throw new Error("Duplicate user.");
            }
        }
        this.users.push(user);
    };
    return App;
}());
exports.App = App;
