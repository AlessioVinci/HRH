"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class Background extends fc.Node {
        constructor(_pos, _scale, _path) {
            super("Background" + (++Background.count));
            this.addComponent(new fc.ComponentTransform);
            this.mtxLocal.translate(new fc.Vector3(_pos.x, _pos.y, -0.0001));
            this.mtxLocal.scale(new fc.Vector3(_scale.x, _scale.y, 1));
            let meshItem = new fc.MeshSprite("ItemMesh");
            this.addComponent(new fc.ComponentMesh(meshItem));
            let texture = new fc.TextureImage(_path);
            let material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
            this.addComponent(new fc.ComponentMaterial(material));
        }
    }
    Background.count = 0;
    HRH.Background = Background;
})(HRH || (HRH = {}));
//# sourceMappingURL=Background.js.map