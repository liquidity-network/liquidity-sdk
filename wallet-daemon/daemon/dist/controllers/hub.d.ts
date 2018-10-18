export declare class Hub {
    static urls: {
        admission: () => Promise<any>;
        audit: (address: any) => Promise<any>;
    };
}
