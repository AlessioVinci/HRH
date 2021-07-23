namespace HRH {
  import fc = FudgeCore;

  export class LavaTile extends Tile {

    constructor(_pos: fc.Vector2) {
      super("LavaTile", _pos, new fc.Vector2(1, 1), "lava");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/TileLava.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}