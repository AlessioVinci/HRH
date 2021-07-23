"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class PlayerCharacter extends HRH.Tile {
        constructor(_pos) {
            super("PC", _pos, new fc.Vector2(1, 1), "none");
            let texture = new fc.TextureImage("./textures/Player.png");
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
        move(_direction, _distance) {
            switch (+_direction) {
                case HRH.MovementDirections.UP: {
                    this.mtxLocal.translateY(_distance);
                    break;
                }
                case HRH.MovementDirections.RIGHT: {
                    this.mtxLocal.translateX(_distance);
                    break;
                }
                case HRH.MovementDirections.DOWN: {
                    this.mtxLocal.translateY(-_distance);
                    break;
                }
                case HRH.MovementDirections.LEFT: {
                    this.mtxLocal.translateX(-_distance);
                    break;
                }
                default: {
                    break;
                }
            }
            this.setRectPosition();
        }
    }
    HRH.PlayerCharacter = PlayerCharacter;
})(HRH || (HRH = {}));
//# sourceMappingURL=PlayerCharacter.js.map