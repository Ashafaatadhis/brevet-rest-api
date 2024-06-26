"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdController = exports.getCurrentUser = exports.getBatchController = exports.getCoursesController = exports.getAllController = exports.editByIdController = exports.deleteByIdController = exports.changePasswordByIdController = void 0;
const deleteByIdController_1 = __importDefault(require("./deleteByIdController"));
exports.deleteByIdController = deleteByIdController_1.default;
const editByIdController_1 = __importDefault(require("./editByIdController"));
exports.editByIdController = editByIdController_1.default;
const getAllController_1 = __importDefault(require("./getAllController"));
exports.getAllController = getAllController_1.default;
const getByIdController_1 = __importDefault(require("./getByIdController"));
exports.getByIdController = getByIdController_1.default;
const getBatchController_1 = __importDefault(require("./getBatchController"));
exports.getBatchController = getBatchController_1.default;
const getCoursesController_1 = __importDefault(require("./getCoursesController"));
exports.getCoursesController = getCoursesController_1.default;
const changePasswordByIdController_1 = __importDefault(require("./changePasswordByIdController"));
exports.changePasswordByIdController = changePasswordByIdController_1.default;
const getCurrentUser_1 = __importDefault(require("./getCurrentUser"));
exports.getCurrentUser = getCurrentUser_1.default;
