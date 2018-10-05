"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageManagerService {
    constructor() {
        this.memory = new Map();
    }
    get(key) {
        return this.memory.get(key);
    }
    set(key, value) {
        this.memory.set(key, value);
        return true;
    }
    del(key) {
        return this.memory.delete(key);
    }
}
exports.StorageManagerService = StorageManagerService;
//# sourceMappingURL=storage-manager.service.js.map