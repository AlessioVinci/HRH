"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class UpTile extends HRH.Tile {
        constructor() {
            super("UpTile", new fc.Vector2(-5, 8), new fc.Vector2(1, 1), "up");
            let texture = new fc.TextureImage("./textures/TileUp.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.UpTile = UpTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=UpTile.js.map