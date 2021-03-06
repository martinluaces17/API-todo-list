"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteUser = exports.updateTodo = exports.createTodo = exports.getTodos = exports.getTodo = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var Todo_1 = require("./entities/Todo");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newtodoDefault, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("users already exists with this email");
                newtodoDefault = typeorm_1.getRepository(Todo_1.Todo).create();
                newtodoDefault.label = "Ejemplo";
                newtodoDefault.done = false;
                newUser = userRepo.create();
                newUser.first_name = req.body.first_name;
                newUser.last_name = req.body.last_name;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.todos = [newtodoDefault];
                return [4 /*yield*/, userRepo.save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todo_1.Todo).findOne(req.params.id)];
            case 1:
                todos = _a.sent();
                return [2 /*return*/, res.json(todos)];
        }
    });
}); };
exports.getTodo = getTodo;
var getTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todo_1.Todo).find({ relations: ["users"] })];
            case 1:
                todos = _a.sent();
                return [2 /*return*/, res.json(todos)];
        }
    });
}); };
exports.getTodos = getTodos;
var createTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newtodo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.label)
                    throw new utils_1.Exception("Proporcione una etiqueta");
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ relations: ["todo"], where: { id: req.params.id } })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                newtodo = new Todo_1.Todo();
                newtodo.label = req.body.label;
                newtodo.done = false;
                user === null || user === void 0 ? void 0 : user.todos.push(newtodo);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json("Nada para hacer")];
        }
    });
}); };
exports.createTodo = createTodo;
var updateTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoRepo, todos, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todo_1.Todo)];
            case 1:
                todoRepo = _a.sent();
                return [4 /*yield*/, todoRepo.findOne(req.params.id)];
            case 2:
                todos = _a.sent();
                if (!todos)
                    throw new utils_1.Exception("No hay nada para hacer");
                todoRepo.merge(todos, req.body);
                return [4 /*yield*/, todoRepo.save(todos)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateTodo = updateTodo;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, user_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "Este usuario no existe" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"](req.params.id)];
            case 3:
                user_1 = _a.sent();
                return [2 /*return*/, res.json(user_1)];
        }
    });
}); };
exports.deleteUser = deleteUser;
