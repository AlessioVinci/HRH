namespace HRH {
  import fc = FudgeCore;

  export class LeftTile extends Tile {

    constructor() {
      super("LeftTile", new fc.Vector2(-5, 10), new fc.Vector2(1, 1), "left");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/TileLeft.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}