"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class DownTile extends HRH.Tile {
        constructor() {
            super("DownTile", new fc.Vector2(-3, 8), new fc.Vector2(1, 1), "down");
            let texture = new fc.TextureImage("./textures/TileDown.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.DownTile = DownTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=DownTile.js.map