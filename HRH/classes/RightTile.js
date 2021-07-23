"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class RightTile extends HRH.Tile {
        constructor() {
            super("RightTile", new fc.Vector2(-3, 10), new fc.Vector2(1, 1), "right");
            let texture = new fc.TextureImage("./textures/TileRight.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.RightTile = RightTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=RightTile.js.map