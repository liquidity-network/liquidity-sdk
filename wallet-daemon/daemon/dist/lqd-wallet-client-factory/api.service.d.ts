import { RestApiInterface } from 'lqd-wallet-client';
export declare class ApiService implements RestApiInterface {
    private static requestToPromise;
    private static addSuffix;
    get<T>(host: string, path: string, query?: string, auth?: boolean): Promise<T>;
    post<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T>;
    submit<T>(host: string, path: string, body?: string, query?: string, auth?: boolean): Promise<T>;
    put<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T>;
    patch<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T>;
    delete<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T>;
    options<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T>;
}
