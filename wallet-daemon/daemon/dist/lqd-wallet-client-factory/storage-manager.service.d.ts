import { StorageManagerInterface } from 'lqd-wallet-client';
export declare class StorageManagerService implements StorageManagerInterface {
    private memory;
    get(key: string): string;
    set(key: string, value: string): boolean;
    del(key: string): boolean;
}
