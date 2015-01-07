module SpaceshipInTrouble.Game {

    export class Startup {

        private _gameEngine: SpaceshipInTrouble.Engine.GameEngine;

        public init() {
            this._gameEngine = new SpaceshipInTrouble.Engine.GameEngine();
            this._gameEngine.init();
        }

        public startGame() {

            this._gameEngine.start();
        }
    }




    $(document).ready(function() {
        var startUp = new Startup();

        startUp.init();
        startUp.startGame();
    });

}