"use strict";
var HRH;
(function (HRH) {
    class Tile extends HRH.QuadNode {
        constructor(_name, _pos, _scale, _type) {
            super(_name, _pos, _scale);
            this.type = _type;
        }
        getType() {
            return this.type;
        }
    }
    HRH.Tile = Tile;
})(HRH || (HRH = {}));
//# sourceMappingURL=Tile.js.map