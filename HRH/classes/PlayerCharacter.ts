namespace HRH {
  import fc = FudgeCore;

  export class PlayerCharacter extends Tile {

      constructor(_pos: fc.Vector2) {
          super("PC", _pos, new fc.Vector2(1, 1), "none");

          let texture: fc.TextureImage = new fc.TextureImage("./textures/Player.png");
          let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
          this.addComponent(new fc.ComponentMaterial(material));
      }

      move(_direction: MovementDirections, _distance: number): void {
        switch (+_direction) {
          case MovementDirections.UP: {
            this.mtxLocal.translateY(_distance);
            break;
          }
          case MovementDirections.RIGHT: {
            this.mtxLocal.translateX(_distance);
            break;
          }
          case MovementDirections.DOWN: {
            this.mtxLocal.translateY(-_distance);
            break;
          }
          case MovementDirections.LEFT: {
            this.mtxLocal.translateX(-_distance);
            break;
          }
          default: {
            break;
          }
        }
        this.setRectPosition();
      }
  }
}