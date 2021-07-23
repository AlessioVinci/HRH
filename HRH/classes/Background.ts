namespace HRH {
  import fc = FudgeCore;

  export class Background extends fc.Node {
    private static count: number = 0;

      constructor(_pos: fc.Vector2, _scale: fc.Vector2, _path: string) {
          super("Background" + (++Background.count));
          
          this.addComponent(new fc.ComponentTransform);
          this.mtxLocal.translate(new fc.Vector3(_pos.x, _pos.y, -0.0001));

          this.mtxLocal.scale(new fc.Vector3(_scale.x, _scale.y, 1));

          let meshItem: fc.Mesh = new fc.MeshSprite("ItemMesh");
          this.addComponent(new fc.ComponentMesh(meshItem));

          let texture: fc.TextureImage = new fc.TextureImage(_path);
          let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
          this.addComponent(new fc.ComponentMaterial(material));
          
      }
  }
}