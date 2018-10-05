"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const lqd_client_1 = __importDefault(require("./controllers/lqd-client"));
const index_1 = __importDefault(require("./routes/index"));
lqd_client_1.default.start({});
const app = express_1.default();
app.use(cors_1.default({ origin: true }));
app.use(body_parser_1.default.json());
index_1.default(app);
app.listen(80, () => 'Listening...');
//# sourceMappingURL=index.js.map