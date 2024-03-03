"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdController = exports.getAllController = exports.editByIdController = exports.deleteByIdController = void 0;
const deleteByIdController_1 = __importDefault(require("./deleteByIdController"));
exports.deleteByIdController = deleteByIdController_1.default;
const editByIdController_1 = __importDefault(require("./editByIdController"));
exports.editByIdController = editByIdController_1.default;
const getAllController_1 = __importDefault(require("./getAllController"));
exports.getAllController = getAllController_1.default;
const getByIdController_1 = __importDefault(require("./getByIdController"));
exports.getByIdController = getByIdController_1.default;
