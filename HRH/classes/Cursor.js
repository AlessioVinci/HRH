"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class Cursor extends HRH.Tile {
        constructor() {
            super("PlayerCursor", new fc.Vector2(1, 1), new fc.Vector2(1.1875, 1.1875), "none");
            this.state = "world";
            let texture = new fc.TextureImage("./textures/PlayerCursor.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
        static getInstance() {
            if (!Cursor.instance) {
                Cursor.instance = new Cursor();
            }
            return Cursor.instance;
        }
        switchState() {
            if (this.state === "world") {
                this.state = "inventory";
                this.mtxLocal.translation = new fc.Vector3(-3.5, 9.5, 0);
            }
            else if (this.state === "inventory") {
                this.state = "world";
                this.mtxLocal.translation = new fc.Vector3(1.5, 1.5, 0);
            }
        }
    }
    HRH.Cursor = Cursor;
})(HRH || (HRH = {}));
//# sourceMappingURL=Cursor.js.map