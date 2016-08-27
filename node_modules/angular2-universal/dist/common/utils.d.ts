export declare function isPresent(obj: any): boolean;
export declare function isBlank(obj: any): boolean;
export declare function regExFirstMatch(regExp: RegExp, input: string): RegExpExecArray;
export declare const listContains: (list: any[], el: any) => boolean;
export declare function stringMapForEach(map: {
    [key: string]: any;
}, callback: (V, K) => void): void;
export declare const isSuccess: (status: number) => boolean;
