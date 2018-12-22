export declare namespace Gettext {
    interface CompileOptions {
        sourcePath?: string;
        tragetPath?: string;
    }
}
export declare const DEFAULT_CTX = "_@@DEFAULT_CTX@@_";
export declare class Compiler {
    private options;
    constructor(options?: Gettext.CompileOptions);
    run(): void;
}
