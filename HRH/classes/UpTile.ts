namespace HRH {
  import fc = FudgeCore;

  export class UpTile extends Tile {

    constructor() {
      super("UpTile", new fc.Vector2(-5, 8), new fc.Vector2(1, 1), "up");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/TileUp.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}