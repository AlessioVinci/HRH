namespace HRH {
  import fc = FudgeCore;

  export class WallTile extends Tile {
    private static count: number = 0;

    constructor(_pos: fc.Vector2) {
      super("WallTile" + (++WallTile.count), _pos, new fc.Vector2(1, 1), "none");

      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 0.2)));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}