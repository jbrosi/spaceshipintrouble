/// <reference path="../../../../lib.d/three.d.ts" />
/// <amd-dependency path="three" />
/// <amd-dependency path="helvetiker-font" />

module SpaceshipInTrouble.Engine.Helpers.D3.Text {

    export class TextGeometry implements THREE.TextGeometryParameters {

        public height = 3;
        public size = 12;
        public hover = 3;
        public curveSegments = 4;
        public bevelThickness = 0.2;
        public bevelSize = 0.2;
        public bevelSegments = 3;
        public bevelEnabled = true;
        public font = "helvetiker";
        public weight = "normal";
        public style = "normal";

        public getHeight():number {
            return this.height;
        }

        public setHeight(height:number) {
            this.height = height;
        }

        public getSize():number {
            return this.size;
        }

        public setSize(size:number) {
            this.size = size;
        }

        public getHover():number {
            return this.hover;
        }

        public setHover(hover:number) {
            this.hover = hover;
        }

        public getCurveSegments():number {
            return this.curveSegments;
        }

        public setCurveSegments(curveSegments:number) {
            this.curveSegments = curveSegments;
        }

        public getBevelThickness():number {
            return this.bevelThickness;
        }

        public setBevelThickness(bevelThickness:number) {
            this.bevelThickness = bevelThickness;
        }

        public getBevelSize():number {
            return this.bevelSize;
        }

        public setBevelSize(bevelSize:number) {
            this.bevelSize = bevelSize;
        }

        public getBevelSegments():number {
            return this.bevelSegments;
        }

        public setBevelSegments(bevelSegments:number) {
            this.bevelSegments = bevelSegments;
        }

        public isBevelEnabled():boolean {
            return this.bevelEnabled;
        }

        public setBevelEnabled(bevelEnabled:boolean) {
            this.bevelEnabled = bevelEnabled;
        }

        public createTextGeometry(text:string):THREE.TextGeometry {
            return new THREE.TextGeometry(text, this);
        }

        public getFont():string {
            return this.font;
        }

        public setFont(font:string) {
            this.font = font;
        }

        public getStyle():string {
            return this.style;
        }

        public setStyle(style:string) {
            this.style = style;
        }

        public getWeight():string {
            return this.weight;
        }

        public setWeight(weight:string) {
            this.weight = weight;
        }

    }

}