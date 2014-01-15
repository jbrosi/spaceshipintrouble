

class AbstractScreen {
    public show() {
        //gets callend when the screen gets visible
    }
    
    public render(timeStep: number) {
        //implement for drawing
    }
};

export = AbstractScreen;