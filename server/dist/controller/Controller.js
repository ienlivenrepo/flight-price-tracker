"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("../service/Service");
var lodash_1 = __importDefault(require("lodash"));
var DailyPrice_1 = require("../model/DailyPrice");
var typescript_map_1 = require("typescript-map");
var Controller = /** @class */ (function () {
    function Controller() {
        this.flightRatesService = new Service_1.Service();
    }
    Controller.prototype.getMinPrice = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateArray, currentDate, results, lastDateOfMonth, _i, _a, flightRoute, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dateArray = new Array();
                        currentDate = new Date(date);
                        results = [];
                        lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                        return [4 /*yield*/, this.getDateArray(currentDate, lastDateOfMonth)];
                    case 1:
                        dateArray = _e.sent();
                        console.log(dateArray);
                        _i = 0, _a = Controller.flightRoutes;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        flightRoute = _a[_i];
                        _c = (_b = results).push;
                        return [4 /*yield*/, this.getDestinationPriceMap(dateArray, flightRoute)];
                    case 3:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _d = this.formatPayload;
                        return [4 /*yield*/, Promise.all(results)];
                    case 6: return [2 /*return*/, _d.apply(this, [_e.sent()])];
                }
            });
        });
    };
    Controller.prototype.formatPayload = function (dailyPriceArray) {
        return __awaiter(this, void 0, void 0, function () {
            var arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [].concat.apply([], dailyPriceArray);
                        return [4 /*yield*/, lodash_1.default(arr)
                                .groupBy(function (x) { return x.date; })
                                .map(function (value, key) { return ({ date: key, pricesWithDates: value }); })
                                .value()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.getDestinationPriceMap = function (dateArray, element) {
        return __awaiter(this, void 0, void 0, function () {
            var legPriceMap, dailyMinimumPriceArray, finalArray, resolvedFinalArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        legPriceMap = new typescript_map_1.TSMap();
                        dailyMinimumPriceArray = new Array();
                        finalArray = new Array();
                        return [4 /*yield*/, Promise.all((finalArray = dateArray.map(function (date) { return __awaiter(_this, void 0, void 0, function () {
                                var from, to, response, price;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            from = element.split(":")[0];
                                            to = element.split(":")[1];
                                            return [4 /*yield*/, this.flightRatesService.getMinPriceForDay(date, from, to)];
                                        case 1:
                                            response = _a.sent();
                                            return [4 /*yield*/, this.findMinPrice(response)];
                                        case 2:
                                            price = _a.sent();
                                            return [2 /*return*/, new DailyPrice_1.DailyPrice(date, price, element)];
                                    }
                                });
                            }); })))];
                    case 1:
                        resolvedFinalArray = _a.sent();
                        return [2 /*return*/, resolvedFinalArray];
                }
            });
        });
    };
    Controller.prototype.findMinPrice = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var itineraries, minPriceList, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itineraries = new Array();
                        minPriceList = new Array();
                        res = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, response["Itineraries"]];
                    case 2:
                        itineraries = _a.sent();
                        return [4 /*yield*/, itineraries.forEach(function (element) {
                                var prices;
                                minPriceList.push(lodash_1.default.minBy(element["PricingOptions"], "Price"));
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, lodash_1.default.minBy(minPriceList, "Price")["Price"]];
                    case 4:
                        res = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log("error occurred: " + err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, res];
                }
            });
        });
    };
    Controller.prototype.getDateArray = function (start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var dateArray, dt;
            return __generator(this, function (_a) {
                dateArray = new Array();
                dt = new Date(start);
                dt.setDate(dt.getDate() + 1);
                end.setDate(end.getDate() + 1);
                while (dt <= end) {
                    dateArray.push(new Date(dt).toISOString().split("T")[0]);
                    dt.setDate(dt.getDate() + 1);
                }
                return [2 /*return*/, dateArray];
            });
        });
    };
    Controller.flightRoutes = [
        "SIN-sky:KUL-sky",
        "KUL-sky:SIN-sky",
        "KUL-sky:SFO-sky"
    ];
    return Controller;
}());
exports.Controller = Controller;
