
module SpaceshipInTrouble.Server.Services.WebsocketService {

    var _:any = require('lodash-node');
    var io : any = require('socket.io');

    var fs = require('fs');
    var Q = require("q");
    var path = require("path");

    var bodyParser:any = require("body-parser");

    export class WebsocketConnection {

        private _socket;

        private _websocketService;

        private _name;

        private _session;

        public constructor(socket, websocketService) {
            _.bindAll(this);

            this._socket = socket;
            this._session = socket.handshake.session;
            this._websocketService = websocketService;

            if (this._session.name !== undefined) {
                this._name = this._session.name;
                this._session.loginCount++;
                this._session.save();
            } else {
                this._session.name = this._name = this._generateName();
                this._session.loginCount = 1;
                this._session.save();
            }

            socket.on('message', this._onMessage);
            socket.on('chat', this._onChat);
            socket.on('disconnect', this._onDisconnect);

        }

        public isFirstSessionLogin() {
            return this._session.loginCount === 1;
        }

        public getSession() {
            return this._session;
        }

        public getName() {
            return this._name;
        }

        public _generateName() {

            var foreNames = ["Heroic", "Lazy", "Vicious", "Noble", "Greathearted", "Lovely", "Lonely", "Abandoned", "Fabulous", "Naive", "Sad", "Ugly"];
            var lastNames = ["Aardvark","Albatross","Alligator","Alpaca","Ant","Anteater","Antelope","Ape","Armadillo","Donkey","Baboon","Badger","Barracuda","Bat","Bear","Beaver","Bee","Bison","Boar","Buffalo, African","Butterfly","Camel","Capybara","Caribou","Cassowary","Cat","Caterpillar","Cattle","Chamois","Cheetah","Chicken","Chimpanzee","Chinchilla","Chough","Clam","Cobra","Cockroach","Cod","Cormorant","Coyote","Crab","Crane","Crocodile","Crow","Curlew","Deer","Dinosaur","Dog","Dogfish","Dolphin","Donkey","Dotterel","Dove","Dragonfly","Duck","Dugong","Dunlin","Eagle","Echidna","Eel","Eland","Elephant","Elephant seal","Elk","Emu","Falcon","Ferret","Finch","Fish","Flamingo","Fly","Fox","Frog","Gaur","Gazelle","Gerbil","Giant Panda","Giraffe","Gnat","Gnu","Goat","Goose","Goldfinch","Goldfish","Gorilla","Goshawk","Grasshopper","Grouse","Guanaco","Guinea fowl","Guinea pig","Gull","Hamster","Hare","Hawk","Hedgehog","Heron","Herring","Hippopotamus","Hornet","Horse","Human","Hummingbird","Hyena","Ibex","Ibis","Jackal","Jaguar","Jay","Jay, Blue","Jellyfish","Kangaroo","Kingfisher","Koala","Komodo dragon","Kookabura","Kouprey","Kudu","Lapwing","Lark","Lemur","Leopard","Lion","Llama","Lobster","Locust","Loris","Louse","Lyrebird","Magpie","Mallard","Manatee","Mandrill","Mantis","Marten","Meerkat","Mink","Mole","Mongoose","Monkey","Moose","Mouse","Mosquito","Mule","Narwhal","Newt","Nightingale","Octopus","Okapi","Opossum","Oryx","Ostrich","Otter","Owl","Oyster","Panther","Parrot","Panda","Partridge","Peafowl","Pelican","Penguin","Pheasant","Pig","Pigeon","Polar Bear","Pony","See Horse","Porcupine","Porpoise","Prairie Dog","Quail","Quelea","Quetzal","Rabbit","Raccoon","Rail","Ram","Rat","Raven","Red deer","Red panda","Reindeer","Rhinoceros","Rook","Salamander","Salmon","Sand Dollar","Sandpiper","Sardine","Scorpion","Sea lion","Sea Urchin","Seahorse","Seal","Shark","Sheep","Shrew","Skunk","Snail","Snake","Sparrow","Spider","Spoonbill","Squid","Squirrel","Starling","Stingray","Stinkbug","Stork","Swallow","Swan","Tapir","Tarsier","Termite","Tiger","Toad","Trout","Turkey","Turtle","Vicuña","Viper","Vulture","Wallaby","Walrus","Wasp","Water buffalo","Weasel","Whale","Wildcat","Wolf","Wolverine","Wombat","Woodcock","Woodpecker","Worm","Wren","Yak","Zebra"];

            return foreNames[Math.floor(Math.random() * foreNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
        }

        public once(identifier, callback) {
            this._socket.once(identifier, callback);
        }

        public on(identifier, callback) {
            this._socket.on(identifier, callback);
        }

        public removeListener(identifier, callback) {
            this._socket.removeListener(identifier, callback);
        }

        public removeAllListeners(identifier) {
            this._socket.removeAllListeners(identifier);
        }

        public sendMessage(identifier, message) {
            console.log("emitting message " + identifier, message);
            this._socket.emit(identifier, message);
        }

        public _onMessage(message) {
            this._websocketService.onMessage(this, message);
        }

        public _onChat(message) {
            this._websocketService.onChat(this, {message:message.message, from: this.getName()});
        }

        public _onDisconnect() {
            this._websocketService.onDisconnect(this);
        }


    }
}