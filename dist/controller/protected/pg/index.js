"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdPGController = exports.getAllPGController = exports.getAllByIdPGController = exports.editPGController = exports.deletePGController = exports.addPGController = void 0;
const addPGController_1 = __importDefault(require("./addPGController"));
exports.addPGController = addPGController_1.default;
const deletePGController_1 = __importDefault(require("./deletePGController"));
exports.deletePGController = deletePGController_1.default;
const editPGController_1 = __importDefault(require("./editPGController"));
exports.editPGController = editPGController_1.default;
const getAllByIdPGController_1 = __importDefault(require("./getAllByIdPGController"));
exports.getAllByIdPGController = getAllByIdPGController_1.default;
const getAllPGController_1 = __importDefault(require("./getAllPGController"));
exports.getAllPGController = getAllPGController_1.default;
const getByIdPGController_1 = __importDefault(require("./getByIdPGController"));
exports.getByIdPGController = getByIdPGController_1.default;
