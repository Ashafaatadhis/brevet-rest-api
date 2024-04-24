"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdQuestionController = exports.getAllQuestionController = exports.getAllByIdQuestionController = exports.editQuestionController = exports.deleteQuestionController = exports.addQuestionController = void 0;
const addQuestionController_1 = __importDefault(require("./addQuestionController"));
exports.addQuestionController = addQuestionController_1.default;
const deleteQuestionController_1 = __importDefault(require("./deleteQuestionController"));
exports.deleteQuestionController = deleteQuestionController_1.default;
const editQuestionController_1 = __importDefault(require("./editQuestionController"));
exports.editQuestionController = editQuestionController_1.default;
const getAllByIdQuestionController_1 = __importDefault(require("./getAllByIdQuestionController"));
exports.getAllByIdQuestionController = getAllByIdQuestionController_1.default;
const getAllQuestionController_1 = __importDefault(require("./getAllQuestionController"));
exports.getAllQuestionController = getAllQuestionController_1.default;
const getByIdQuestionController_1 = __importDefault(require("./getByIdQuestionController"));
exports.getByIdQuestionController = getByIdQuestionController_1.default;
