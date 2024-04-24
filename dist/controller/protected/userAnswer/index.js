"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdUserAnswerController = exports.getAllUserAnswerController = exports.getAllByIdUserAnswerController = exports.editUserAnswerController = exports.deleteUserAnswerController = exports.addUserAnswerController = void 0;
const addUserAnswerController_1 = __importDefault(require("./addUserAnswerController"));
exports.addUserAnswerController = addUserAnswerController_1.default;
const deleteUserAnswerController_1 = __importDefault(require("./deleteUserAnswerController"));
exports.deleteUserAnswerController = deleteUserAnswerController_1.default;
const editUserAnswerController_1 = __importDefault(require("./editUserAnswerController"));
exports.editUserAnswerController = editUserAnswerController_1.default;
const getAllByIdUserAnswerController_1 = __importDefault(require("./getAllByIdUserAnswerController"));
exports.getAllByIdUserAnswerController = getAllByIdUserAnswerController_1.default;
const getAllUserAnswerController_1 = __importDefault(require("./getAllUserAnswerController"));
exports.getAllUserAnswerController = getAllUserAnswerController_1.default;
const getByIdUserAnswerController_1 = __importDefault(require("./getByIdUserAnswerController"));
exports.getByIdUserAnswerController = getByIdUserAnswerController_1.default;
