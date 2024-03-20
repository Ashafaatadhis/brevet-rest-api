"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdPaymentController = exports.getAllPaymentController = exports.editPaymentController = exports.deletePaymentController = exports.addPaymentController = void 0;
const addPaymentController_1 = __importDefault(require("./addPaymentController"));
exports.addPaymentController = addPaymentController_1.default;
const deletePaymentController_1 = __importDefault(require("./deletePaymentController"));
exports.deletePaymentController = deletePaymentController_1.default;
const editPaymentController_1 = __importDefault(require("./editPaymentController"));
exports.editPaymentController = editPaymentController_1.default;
const getAllPaymentController_1 = __importDefault(require("./getAllPaymentController"));
exports.getAllPaymentController = getAllPaymentController_1.default;
const getByIdPaymentController_1 = __importDefault(require("./getByIdPaymentController"));
exports.getByIdPaymentController = getByIdPaymentController_1.default;
