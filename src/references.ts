export declare namespace I18n {
    interface Package {
        language: string;
        contexts: Contexts;
    }

    interface Contexts {
        [key: string]: Items;
    }

    interface Items {
        [key: string]: string | string[];
    }
}
