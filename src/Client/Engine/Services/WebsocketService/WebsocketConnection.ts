/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all_client.ts
/// <reference path="../../../include_all_client.ts"/> ///ts:ref:generated
module SpaceshipInTrouble.Engine.Services.WebsocketService {


    export class WebsocketConnection {

        private static _instance : WebsocketConnection = null;


        public constructor() {
            var socket = io(window.location.protocol + "//" + window.location.host);


            socket.on('news', function (data) {
                socket.emit('my other event', { my: 'data' });
            });

            socket.on('chat', function (data) {
                var from = data.from;
                var msg = data.message;
                var messageElem = $('<div class="message hidden"></div>');

                if (data.message.indexOf("/e ") === 0) {
                    //emote
                    messageElem.append($('<span class="chat-name"></span>').text(from + " " + msg.substr(3)));
                } else {
                    messageElem.append($('<span class="chat-name"></span>').text(from), ": ", $('<span class="chat-text"></span>').text(msg));
                }

                $(".chat-content").append(messageElem);

                setTimeout(function() {
                    messageElem.removeClass("hidden");
                }, 50)
            });


            var sendChat = function () {
                var msg = $(".chat-container input").val();
                $(".chat-container input").val("");

                socket.emit("chat", {message: msg});
            };

            $(".chat-container input").keypress(function(e) {
                if (e.which === 13) {
                    sendChat();
                }
            });
            $(".chat-container button").click(sendChat);

        }

        public static getInstance() {
            if (WebsocketConnection._instance === null) {
                WebsocketConnection._instance = new WebsocketConnection();
            }

            return WebsocketConnection._instance;
        }

    }
}