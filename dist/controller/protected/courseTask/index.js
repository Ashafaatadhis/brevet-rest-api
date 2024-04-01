"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdCourseTaskController = exports.getAllCourseTaskController = exports.editCourseTaskController = exports.deleteCourseTaskController = exports.addCourseTaskController = void 0;
const addCourseTaskController_1 = __importDefault(require("./addCourseTaskController"));
exports.addCourseTaskController = addCourseTaskController_1.default;
const deleteCourseTaskController_1 = __importDefault(require("./deleteCourseTaskController"));
exports.deleteCourseTaskController = deleteCourseTaskController_1.default;
const editCourseTaskController_1 = __importDefault(require("./editCourseTaskController"));
exports.editCourseTaskController = editCourseTaskController_1.default;
const getAllCourseTaskController_1 = __importDefault(require("./getAllCourseTaskController"));
exports.getAllCourseTaskController = getAllCourseTaskController_1.default;
const getByIdCourseTaskController_1 = __importDefault(require("./getByIdCourseTaskController"));
exports.getByIdCourseTaskController = getByIdCourseTaskController_1.default;
