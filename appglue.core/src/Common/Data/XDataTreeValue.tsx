export class XDataTreeValue {
    name: string;
    path?: string;
    children: XDataTreeValue[] = [];

    // only pass path if we can select it.
    constructor(name: string, path?: string, children?: XDataTreeValue[]) {
        this.name = name;
        this.path = path;
        this.children = children ?? [];
    }

    isSelectable(): boolean {
        return this.path !== undefined;
    }
}