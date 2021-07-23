"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class LeftTile extends HRH.Tile {
        constructor() {
            super("LeftTile", new fc.Vector2(-5, 10), new fc.Vector2(1, 1), "left");
            let texture = new fc.TextureImage("./textures/TileLeft.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.LeftTile = LeftTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=LeftTile.js.map