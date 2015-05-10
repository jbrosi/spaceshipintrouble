
module SpaceshipInTrouble.Server.Engine.Services.WebsocketService {

    var _:any = require('lodash-node');
    var io : any = require('socket.io');

    var fs = require('fs');
    var Q = require("q");
    var path = require("path");
    var session : any = require('express-session');

    var cookieParser : any = require('cookie-parser');
    var uuid : any = require('node-uuid');

    export class WebsocketService {

        private _server;

        private _connections = [];

        public constructor(server, myStore) {
            _.bindAll(this);

            this._server = server;
            var socket = io(this._server);


            var cookieSession = session({
                genid: function(req) {
                    return uuid.v4() // use UUIDs for session IDs
                },
                name: "ccide",
                secret: 'cute kitten',
                store: myStore,
                saveUninitialized: true,
                resave: true
            });

            socket.use(function(socket, next) {
                var handshake = socket.handshake;

                if (handshake.headers.cookie) {
                    cookieParser("cute kitten", {})(handshake, {}, function (err) {
                        handshake.sessionID = handshake.signedCookies.ccide;
                        handshake.sessionStore = myStore;
                        handshake.sessionStore.get(handshake.sessionID, function (err, data) {
                            if (err) return next(err);
                            if (!data) return next(new Error('Invalid Session'));
                            handshake.session = new session.Session(handshake, data);
                            console.log("socket session:", handshake.session.views, handshake.sessionID);
                            next();
                        });
                    });
                }
                else {
                    next(new Error('Missing Cookies'));
                }
            });
            socket.on('connection', this._onConnection);
        }

        public chat(client, message) {
            this.sendMessage("chat", {from: client.getName(), message: message});
        }

        public _onConnection(socketConnection) {
            var client = new WebsocketConnection(socketConnection, this);
            this._connections.push(client);
            if (client.isFirstSessionLogin()) {
                this.chat(client, "/e entered the room.");
            } else {
                this.chat(client, "/e reconnected.");
            }

        }

        public sendMessage(identifier, message) {
            _.forEach(this._connections, function(elem) {
                elem.sendMessage(identifier, message);
            });

        }

        public getConnectedNames(): string[] {
            var answer = [];

            _.forEach(this._connections, function(con) {
                answer.push(con.getName());
            });
            return answer;
        }

        public onChat(client, message) {
            if (message.message.trim().toLocaleLowerCase() === "/list") {
                //show all connected clients
                client.sendMessage("chat", {from: "System", message: "Persons in this room: " + this.getConnectedNames().join(", ")});
                return;
            }
            this.sendMessage("chat", message);
        }

        public onMessage(client, message) {
            console.log("message received", message);
        }

        public onDisconnect(client) {
            this._connections = _.without(this._connections, client);
            this.chat(client, "/e disconnected.");
        }


    }
}