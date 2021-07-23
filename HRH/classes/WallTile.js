"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class WallTile extends HRH.Tile {
        constructor(_pos) {
            super("WallTile" + (++WallTile.count), _pos, new fc.Vector2(1, 1), "none");
            let material = new fc.Material("MaterialName", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 0.2)));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    WallTile.count = 0;
    HRH.WallTile = WallTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=WallTile.js.map