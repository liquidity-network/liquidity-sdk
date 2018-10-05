import {LoggingInterface} from 'lqd-wallet-client';

export class LoggingService implements LoggingInterface {

    public static debug(obj: any): void {
        console.debug(obj);
    }

    public static error(obj: any): void {
        console.error(obj);
    }

    public static info(obj: any): void {
        console.info(obj);
    }

    public static warning(obj: any): void {
        console.warn(obj);
    }

    public static log(obj: any): void {
        console.log(obj);
    }

    debug(obj: any): void {
        LoggingService.debug(obj);
    }

    error(obj: any): void {
        LoggingService.error(obj);
    }

    info(obj: any): void {
        LoggingService.info(obj);
    }

    warning(obj: any): void {
        LoggingService.warning(obj);
    }

    log(obj: any): void {
        LoggingService.log(obj);
    }
}
