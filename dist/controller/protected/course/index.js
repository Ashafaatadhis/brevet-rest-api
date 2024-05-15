"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdCourseController = exports.getAllByIdController = exports.getAllCourseController = exports.deleteCourseController = exports.editCourseController = exports.addCourseController = void 0;
const addCourseController_1 = __importDefault(require("./addCourseController"));
exports.addCourseController = addCourseController_1.default;
const editCourseController_1 = __importDefault(require("./editCourseController"));
exports.editCourseController = editCourseController_1.default;
const deleteCourseController_1 = __importDefault(require("./deleteCourseController"));
exports.deleteCourseController = deleteCourseController_1.default;
const getAllCourseController_1 = __importDefault(require("./getAllCourseController"));
exports.getAllCourseController = getAllCourseController_1.default;
const getByIdCourseController_1 = __importDefault(require("./getByIdCourseController"));
exports.getByIdCourseController = getByIdCourseController_1.default;
const getAllByIdController_1 = __importDefault(require("./getAllByIdController"));
exports.getAllByIdController = getAllByIdController_1.default;
