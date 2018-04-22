import { Common } from "./socketio-common";
export declare class SocketIO extends Common {
    protected socket: any;
    constructor(...args: any[]);
    on(event: string, callback: any): void;
    emit(...args: any[]): void;
    joinNamespace(nsp: string): void;
    leaveNamespace(): void;
    static serialize(value: any): any;
    static deserialize(value: any): any;
}
