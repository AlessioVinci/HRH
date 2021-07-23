namespace HRH {
  import fc = FudgeCore;

  export class DownTile extends Tile {

    constructor() {
      super("DownTile", new fc.Vector2(-3, 8), new fc.Vector2(1, 1), "down");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/TileDown.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}