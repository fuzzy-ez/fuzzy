declare type CodingStyle = 'ts' | 'vue';
interface CreateOptions {
    name?: string;
    ts?: boolean;
    sfc?: boolean;
}
interface RenderData {
    kebabCaseName: string;
    bigCamelizeName: string;
    camelizeName: string;
    style: CodingStyle;
}
export declare function create(options: CreateOptions): Promise<void>;
export declare function renderTemplates(componentFolder: string, componentFolderName: string, renderData: RenderData): Promise<void>;
export {};
