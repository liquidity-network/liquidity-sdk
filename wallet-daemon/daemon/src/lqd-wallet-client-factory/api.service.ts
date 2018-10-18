import {RestApiInterface} from 'lqd-wallet-client';
import request, {RequestPromise} from "request-promise-native";

export class ApiService implements RestApiInterface {
    private static requestToPromise<T>(requestPromise: RequestPromise): Promise<T> {
        return new Promise((resolve, reject) => {
            requestPromise.then((result: T) => resolve(result)).catch(reject);
        });
    }

    private static addSuffix(host: string, path: string): string {
        if (!path) {
            return host.endsWith('/') ? host : `${host}/`;
        }
        return host.endsWith('/') || path.startsWith('/') ? host : `${host}/`;
    }

    get<T>(host: string, path: string, query?: string, auth?: boolean): Promise<T> {
        return ApiService.requestToPromise<T>(request.get(
            `${ApiService.addSuffix(host, path)}${path}?${query}`,
            {json: true}));
    }

    post<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T> {
        return ApiService.requestToPromise<T>(request.post(
            `${ApiService.addSuffix(host, path)}${path}?${query}`,
            {
                body: body,
                json: true
            }));
    }

    submit<T>(host: string, path: string, body?: string, query?: string, auth?: boolean): Promise<T> {
        return undefined;
    }

    put<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T> {
        return ApiService.requestToPromise<T>(request.put(
            `${ApiService.addSuffix(host, path)}${path}?${query}`,
            {
                body: body,
                json: true
            }));
    }

    patch<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T> {
        return ApiService.requestToPromise<T>(request.patch(
            `${ApiService.addSuffix(host, path)}${path}?${query}`,
            {
                body: body,
                json: true
            }));
    }

    delete<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T> {
        return ApiService.requestToPromise<T>(request.delete(
            `${ApiService.addSuffix(host, path)}${path}?${query}`,
            {json: true}));
    }

    options<T>(host: string, path: string, body?: any, query?: string, auth?: boolean): Promise<T> {
        return undefined;
    }

}
