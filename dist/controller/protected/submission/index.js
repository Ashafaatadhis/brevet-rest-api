"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdSubmissionController = exports.getAllSubmissionController = exports.getAllByIdSubmissionController = exports.editSubmissionController = exports.deleteSubmissionController = exports.addSubmissionController = void 0;
const addSubmissionController_1 = __importDefault(require("./addSubmissionController"));
exports.addSubmissionController = addSubmissionController_1.default;
const deleteSubmissionController_1 = __importDefault(require("./deleteSubmissionController"));
exports.deleteSubmissionController = deleteSubmissionController_1.default;
const editSubmissionController_1 = __importDefault(require("./editSubmissionController"));
exports.editSubmissionController = editSubmissionController_1.default;
const getAllByIdSubmissionController_1 = __importDefault(require("./getAllByIdSubmissionController"));
exports.getAllByIdSubmissionController = getAllByIdSubmissionController_1.default;
const getAllSubmissionController_1 = __importDefault(require("./getAllSubmissionController"));
exports.getAllSubmissionController = getAllSubmissionController_1.default;
const getByIdSubmissionController_1 = __importDefault(require("./getByIdSubmissionController"));
exports.getByIdSubmissionController = getByIdSubmissionController_1.default;
