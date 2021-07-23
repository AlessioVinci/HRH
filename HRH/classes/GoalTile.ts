namespace HRH {
  import fc = FudgeCore;

  export class GoalTile extends Tile {

    constructor(_pos: fc.Vector2) {
      super("GoalTile", _pos, new fc.Vector2(1, 1), "goal");

      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 0.4)));
      this.addComponent(new fc.ComponentMaterial(material));
    }
  }
}