module SpaceshipInTrouble.Game {

    export class Startup {

        private _gameEngine: SpaceshipInTrouble.Engine.GameEngine;

        public constructor() {
            _.bindAll(this);
        }

        public init() : Q.Promise<any> {
            this._gameEngine = new SpaceshipInTrouble.Engine.GameEngine();
            return this._gameEngine.init();
        }

        public startGame() : Q.Promise <any> {
            var loadLevelScreen = new SpaceshipInTrouble.Game.Screens.PlayLevelScreen(this._gameEngine.getRenderer());
            return this._gameEngine.start(loadLevelScreen);
        }
    }




    $(document).ready(function() {
        var startUp = new Startup();

        startUp.init().then(startUp.startGame);

    });

}