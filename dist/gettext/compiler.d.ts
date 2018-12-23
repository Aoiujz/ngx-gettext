export declare namespace Gettext {
    interface CompileOptions {
        sourcePath?: string;
        tragetPath?: string;
    }
}
export declare class Compiler {
    private options;
    constructor(options?: Gettext.CompileOptions);
    run(): void;
}
