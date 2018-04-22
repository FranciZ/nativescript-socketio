import { Common } from "./socketio-common";
export declare class SocketIO extends Common {
    protected socket: SocketIOClient;
    constructor(...args: any[]);
    on(event: string, callback: Function): void;
    emit(...args: any[]): void;
    joinNamespace(nsp: string): void;
    leaveNamespace(): void;
}
