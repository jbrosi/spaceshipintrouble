


class EntityPrototype {
    private _scripts: string[];
    private _data: any;
    
    public getData() {
        return this._data;
    }
    public setData(data: any) {
        this._data = data;
    }
    
    public getScripts() {
        return this._scripts;
    }
    
    public addScript(script: string) {
        this._scripts.push(script);
    }
    
};
    

export = EntityPrototype;