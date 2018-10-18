import { LoggingInterface } from "../interfaces/logging.interface";
export declare class Logging {
    static loggingInterface: LoggingInterface;
    static debug(obj: any): void;
    static error(obj: any): void;
    static info(obj: any): void;
    static log(obj: any): void;
    static warning(obj: any): void;
}
