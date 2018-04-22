[![npm](https://img.shields.io/npm/v/nativescript-socketio.svg)](https://www.npmjs.com/package/nativescript-socketio)
[![npm](https://img.shields.io/npm/dt/nativescript-socketio.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-socketio)
# nativescript-socketio
# Usage

```
npm install nativescript-socketio
```

or

```
tns plugin add nativescript-socketio
```

## Nativescript Core

Set connection string and options then connect

```js
var SocketIO = require('nativescript-socketio').SocketIO; 
var socketIO = new SocketIO(url, opts);
```
Alternatively:
```js
import { SocketIO } from 'nativescript-socketio';
var socketIO = new SocketIO(url, opts);
```

Connect to server
```js
socketIO.connect()
```

Send data to the server
```js
socketIO.emit(event,data)
```
Listen for data 
```js
socketIO.on(event,callback)
```
Set instance
```js
new SocketIO(null,null,oldInstance)
```

## Angular

``` ts
// app.module.ts
import { SocketIOModule } from "nativescript-socketio/angular";

@NgModule({
  imports: [
    SocketIOModule.forRoot(server),
  ]
})
```

``` ts
// app.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketIO } from "nativescript-socketio";

@Component({
  // ...
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private socketIO: SocketIO) { }

  ngOnInit() {
    this.socketIO.connect();
  }

  ngOnDestroy() {
    this.socketIO.disconnect();
  }
}
```

``` ts
// test.component.ts
import { Component, OnInit, NgZone } from "@angular/core";
import { SocketIO } from "nativescript-socketio";

@Component({
  // ...
})
export class TestComponent implements OnInit {
  constructor(
    private socketIO: SocketIO,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.socketIO.on("test", data => {
      this.ngZone.run(() => {
        // Do stuff here
      });
    });
  }

  test() {
    this.socketIO.emit("test", { test: "test" });
  }
}
```

## Running Demo

Start socketio server
``` bash
cd demo/demo-server
npm install
node app
```

## Screenshot
![socketio](screenshots/socketio_.gif?raw=true)
