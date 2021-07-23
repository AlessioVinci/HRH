namespace HRH {
  import fc = FudgeCore;

  export class RightTile extends Tile {

    constructor() {
      super("RightTile", new fc.Vector2(-3, 10), new fc.Vector2(1, 1), "right");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/TileRight.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}