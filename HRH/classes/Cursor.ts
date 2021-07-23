namespace HRH {
  import fc = FudgeCore;

  export class Cursor extends Tile {

    private static instance: Cursor;
    state: string = "world";
    selected: Tile;

    private constructor() {
      super("PlayerCursor", new fc.Vector2(1, 1), new fc.Vector2(1.1875, 1.1875), "none");

      let texture: fc.TextureImage = new fc.TextureImage("./textures/PlayerCursor.png");
      let material: fc.Material = new fc.Material("MaterialName", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("White"), texture));
      this.addComponent(new fc.ComponentMaterial(material));
    }

    public static getInstance(): Cursor {
      if (!Cursor.instance) {
        Cursor.instance = new Cursor();
      }
      return Cursor.instance;
    }

    public switchState(): void {
      if (this.state === "world") {
        this.state = "inventory";
        this.mtxLocal.translation = new fc.Vector3(-3.5, 9.5, 0);
      } else if (this.state === "inventory") {
        this.state = "world";
        this.mtxLocal.translation = new fc.Vector3(1.5, 1.5, 0);
      }
    }

  }


}