///ts:ref=node.d.ts
/// No file or directory matched name "node.d.ts" ///ts:ref:generated



module SpaceshipInTrouble.Server.CLI {
    var optimist = require("optimist");
    var prompt = require("prompt");
    var _ : any = require('lodash-node');
    var path = require('path');

    export class CLISettings {

        private _args: any;

        public constructor() {

            this._args = optimist.usage("Spaceship in trouble - startup options")
                .boolean(["h"])

                .alias('p', 'port')
                .describe('p', 'Defines the http port this instance will listen on (defaults to 80)')
                .default('p', '80')


                .alias('h', 'help')
                .describe('h', 'Shows all the options available')

                .argv
            ;

            if (this._args.h) {
                console.log(optimist.showHelp());
                process.exit(0);
            }

            _.bindAll(this);
        }

        public getPort() {
            return this._args.p;
        }

    }
}