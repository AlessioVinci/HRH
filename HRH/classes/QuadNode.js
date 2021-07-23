"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    class QuadNode extends fc.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.rect = new fc.Rectangle(_pos.x, _pos.y, _scale.x / 2, _scale.y / 2, fc.ORIGIN2D.CENTER);
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translateX(_pos.x + 0.5);
            this.mtxLocal.translateY(_pos.y + 0.5);
            let cmpMesh = new fc.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
            //this.addComponent(new fc.ComponentMaterial(QuadNode.material));
        }
        checkCollision(_target) {
            return this.rect.collides(_target.rect);
        }
        setRectPosition() {
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    QuadNode.mesh = new fc.MeshQuad("Quad");
    QuadNode.material = new fc.Material("Blue", fc.ShaderUniColor, new fc.CoatColored());
    HRH.QuadNode = QuadNode;
})(HRH || (HRH = {}));
//# sourceMappingURL=QuadNode.js.map