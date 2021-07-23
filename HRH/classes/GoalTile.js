"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class GoalTile extends HRH.Tile {
        constructor(_pos) {
            super("GoalTile", _pos, new fc.Vector2(1, 1), "goal");
            let material = new fc.Material("MaterialName", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 0.4)));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    HRH.GoalTile = GoalTile;
})(HRH || (HRH = {}));
//# sourceMappingURL=GoalTile.js.map