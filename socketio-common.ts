/**
 *
 */
export abstract class Common {
    protected abstract socket; /** Contains instance of Socket */

    abstract emit(...args: any[]): void;
    abstract on(event: string, callback): void;

    abstract joinNamespace(nsp: String): void;
    abstract leaveNamespace(): void;

    public connect() {
        this.socket.connect();
    }

    public disconnect() {
        this.socket.disconnect();
    }

    public get instance() {
        return this.socket;
    }

    public set instance(instance) {
        this.socket = instance;
    }
}
