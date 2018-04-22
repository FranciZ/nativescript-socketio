import { Common } from "./socketio-common";

const IO = io.socket.client.IO;

export class SocketIO extends Common {
    protected socket: any;

    constructor(...args: any[]) {
        super();
        switch (args.length) {
            case 2: {
                let opts = new IO.Options();
                Object.assign(opts, args[1]);
                this.socket = IO.socket(args[0], opts);
                break;
            }

            case 3: {
                this.instance = args.pop();
                break;
            }

            default:
        }
    }

    on(event: string, callback) {
        this.socket.on(event, new io.socket.emitter.Emitter.Listener({
            call(args) {
                let payload = Array.prototype.slice.call(args);
                let ack = payload.pop();
                if (ack && !(ack.getClass().getName().indexOf("io.socket.client.Socket") === 0 && ack.call)) {
                    payload.push(ack);
                    ack = null;
                }

                payload = payload.map(SocketIO.deserialize);

                if (ack) {
                    let _ack = ack;
                    ack = function () {
                        let _args = Array.prototype.slice.call(arguments).map(SocketIO.serialize);
                        _ack.call(_args);
                    };
                    payload.push(ack);
                }
                callback.apply(null, payload);
            }
        }));
    }

    emit(...args: any[]) {
        if (!args) {
            return console.error("Emit Failed: No arguments");
        }

        let event = args[0];
        let payload = Array.prototype.slice.call(args, 1);
        let ack = payload.pop();
        if (ack && typeof ack !== "function") {
            payload.push(ack);
            ack = null;
        }
        payload = payload.map(SocketIO.serialize);
        if (ack) {
            payload.push(new io.socket.client.Ack({
                call: _args => ack.apply(null, Array.prototype.slice.call(_args).map(SocketIO.deserialize)),
            }));
        }
        this.socket.emit(event, payload);
    }

    joinNamespace(nsp: string): void {
        if (this.socket.connected()) {
            const manager = this.socket.io();
            this.socket = manager.socket(nsp);

            // Only join if currently connected. Otherwise just configure to join on connect.
            // This mirrors IOS behavior
            this.socket.connect();
        } else {
            const manager = this.socket.io();
            this.socket = manager.socket(nsp);
        }
    }

    leaveNamespace(): void {
        // Not Implemented
    }

    static serialize(value) {
        let store;
        switch (typeof value) {
            case "string":
            case "boolean":
            case "number": {
                return value;
            }

            case "object": {
                if (!value) {
                    return null;
                }

                if (value instanceof Date) {
                    return value.toJSON();
                }
                if (Array.isArray(value)) {
                    store = new org.json.JSONArray();
                    value.forEach((item) => store.put(item));
                    return store;
                }
                store = new org.json.JSONObject();
                Object.keys(value).forEach((key) => store.put(key, SocketIO.serialize(value[key])));
                return store;
            }

            default: return null;
        }

    }

    static deserialize(value) {
        if (value === null || typeof value !== "object") {
            return value;
        }
        let store;
        switch (value.getClass().getName()) {
            case "java.lang.String": {
                return String(value);
            }

            case "java.lang.Boolean": {
                return Boolean(value);
            }

            case "java.lang.Integer":
            case "java.lang.Long":
            case "java.lang.Double":
            case "java.lang.Short": {
                return Number(value);
            }

            case "org.json.JSONArray": {
                store = new Array();
                for (let j = 0; j < value.length(); j++) {
                    store[j] = SocketIO.deserialize(value.get(j));
                }
                break;
            }

            case "org.json.JSONObject": {
                store = new Object();
                let i = value.keys();
                while (i.hasNext()) {
                    let key = i.next();
                    store[key] = SocketIO.deserialize(value.get(key));
                }
                break;
            }

            default: store = null;
        }
        return store;
    }
}
