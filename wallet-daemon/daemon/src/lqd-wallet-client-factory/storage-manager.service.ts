import {StorageManagerInterface} from 'lqd-wallet-client';

export class StorageManagerService implements StorageManagerInterface {
    private memory = new Map();

    public get(key: string): string {
        return this.memory.get(key);
    }

    public set(key: string, value: string): boolean {
        this.memory.set(key, value);
        return true;
    }

    public del(key: string): boolean {
        return this.memory.delete(key);
    }
}
