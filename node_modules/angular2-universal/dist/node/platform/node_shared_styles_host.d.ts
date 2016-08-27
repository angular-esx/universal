import { SharedStylesHost } from '@angular/platform-browser/src/dom/shared_styles_host';
import '../make_parse5_current';
export declare class NodeSharedStylesHost extends SharedStylesHost {
    private _hostNodes;
    constructor();
    /** @internal */
    _addStylesToHost(styles: string[], host: Node): void;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: string[]): void;
}
