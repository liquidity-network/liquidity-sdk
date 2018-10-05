import { LoggingInterface } from 'lqd-wallet-client';
export declare class LoggingService implements LoggingInterface {
    static debug(obj: any): void;
    static error(obj: any): void;
    static info(obj: any): void;
    static warning(obj: any): void;
    static log(obj: any): void;
    debug(obj: any): void;
    error(obj: any): void;
    info(obj: any): void;
    warning(obj: any): void;
    log(obj: any): void;
}
