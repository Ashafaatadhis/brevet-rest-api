"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdQuestionAnswerController = exports.getAllQuestionAnswerController = exports.getAllByIdQuestionAnswerController = exports.deleteQuestionAnswerController = exports.editQuestionAnswerController = exports.addQuestionAnswerController = void 0;
const addQuestionAnswerController_1 = __importDefault(require("./addQuestionAnswerController"));
exports.addQuestionAnswerController = addQuestionAnswerController_1.default;
const editQuestionAnswerController_1 = __importDefault(require("./editQuestionAnswerController"));
exports.editQuestionAnswerController = editQuestionAnswerController_1.default;
const getAllByIdQuestionAnswerController_1 = __importDefault(require("./getAllByIdQuestionAnswerController"));
exports.getAllByIdQuestionAnswerController = getAllByIdQuestionAnswerController_1.default;
const getAllQuestionAnswerController_1 = __importDefault(require("./getAllQuestionAnswerController"));
exports.getAllQuestionAnswerController = getAllQuestionAnswerController_1.default;
const getByIdQuestionAnswerController_1 = __importDefault(require("./getByIdQuestionAnswerController"));
exports.getByIdQuestionAnswerController = getByIdQuestionAnswerController_1.default;
const deleteQuestionAnswerController_1 = __importDefault(require("./deleteQuestionAnswerController"));
exports.deleteQuestionAnswerController = deleteQuestionAnswerController_1.default;
