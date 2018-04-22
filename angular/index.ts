import { NgModule, ModuleWithProviders, InjectionToken } from "@angular/core";
import { SocketIO } from "../socketio";

export interface IOOptions {
    compress: boolean;
    connectParams: { [key: string]: any };
    cookies: string[];
    extraHeaders: { [key: string]: any };
    forceNew: boolean;
    forcePolling: boolean;
    forceWebsockets: boolean;
    log: boolean;
    path: string;
    reconnects: boolean;
    reconnectAttempts: number;
    reconnectWait: number; // Time in milli seconds
    secure: boolean;
}

export type SocketIOOptions = Partial<IOOptions>;

export const SOCKETIO_URL = new InjectionToken<string>("SOCKETIO_URL");
export const SOCKETIO_OPTIONS = new InjectionToken<SocketIOOptions>("SOCKETIO_OPTIONS");

function socketIOFactory(url: string, options: SocketIOOptions) {
    return new SocketIO(url, options);
}

@NgModule()
export class SocketIOModule {
    static forRoot(url: string, options: SocketIOOptions = {}): ModuleWithProviders {
        return {
            ngModule: SocketIOModule,
            providers: [
                {
                    provide: SocketIO,
                    useFactory: socketIOFactory,
                    deps: [SOCKETIO_URL, SOCKETIO_OPTIONS]
                },
                { provide: SOCKETIO_URL, useValue: url },
                { provide: SOCKETIO_OPTIONS, useValue: options },
            ]
        };
    }
}
