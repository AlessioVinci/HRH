namespace HRH {
    import fc = FudgeCore;

    export class QuadNode extends fc.Node {
        static mesh: fc.Mesh = new fc.MeshQuad("Quad");
        static material: fc.Material = new fc.Material("Blue", fc.ShaderUniColor, new fc.CoatColored());

        public rect: fc.Rectangle;

        constructor(_name: string, _pos: fc.Vector2, _scale: fc.Vector2) {
            super(_name);
            this.rect = new fc.Rectangle(_pos.x, _pos.y, _scale.x / 2, _scale.y / 2, fc.ORIGIN2D.CENTER);

            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translateX(_pos.x + 0.5);
            this.mtxLocal.translateY(_pos.y + 0.5);
      
            let cmpMesh: fc.ComponentMesh = new fc.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
      
            //this.addComponent(new fc.ComponentMaterial(QuadNode.material));
        }

        public checkCollision(_target: QuadNode): boolean {
            return this.rect.collides(_target.rect);
        }

        public setRectPosition(): void {
          this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
          this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
}