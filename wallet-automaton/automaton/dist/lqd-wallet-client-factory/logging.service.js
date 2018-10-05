"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggingService {
    static debug(obj) {
        console.debug(obj);
    }
    static error(obj) {
        console.error(obj);
    }
    static info(obj) {
        console.info(obj);
    }
    static warning(obj) {
        console.warn(obj);
    }
    static log(obj) {
        console.log(obj);
    }
    debug(obj) {
        LoggingService.debug(obj);
    }
    error(obj) {
        LoggingService.error(obj);
    }
    info(obj) {
        LoggingService.info(obj);
    }
    warning(obj) {
        LoggingService.warning(obj);
    }
    log(obj) {
        LoggingService.log(obj);
    }
}
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.service.js.map