"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class LavaTile extends HRH.Tile {
        constructor(_pos) {
            super("LavaTile", _pos, new fc.Vector2(1, 1), "lava");
            let texture = new fc.TextureImage("./textures/TileLava.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.LavaTile = LavaTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=LavaTile.js.map