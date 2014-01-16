

class AbstractScreen {
    
    private _renderer;
    
    public constructor(renderer) {
        this._renderer = renderer;
    }
    
    public getRenderer() {
        return this._renderer;
    }
    
    public show() {
        //gets callend when the screen gets visible
    }
    
    public render(timeStep: number) {
        //implement for drawing
    }
};

export = AbstractScreen;