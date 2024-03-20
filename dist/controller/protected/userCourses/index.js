"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdUserCoursesController = exports.getAllUserCoursesController = exports.editUserCoursesController = exports.deleteUserCoursesController = exports.addUserCoursesController = void 0;
const addUserCoursesController_1 = __importDefault(require("./addUserCoursesController"));
exports.addUserCoursesController = addUserCoursesController_1.default;
const deleteUserCoursesController_1 = __importDefault(require("./deleteUserCoursesController"));
exports.deleteUserCoursesController = deleteUserCoursesController_1.default;
const editUserCoursesController_1 = __importDefault(require("./editUserCoursesController"));
exports.editUserCoursesController = editUserCoursesController_1.default;
const getAllUserCoursesController_1 = __importDefault(require("./getAllUserCoursesController"));
exports.getAllUserCoursesController = getAllUserCoursesController_1.default;
const getByIdUserCoursesController_1 = __importDefault(require("./getByIdUserCoursesController"));
exports.getByIdUserCoursesController = getByIdUserCoursesController_1.default;
