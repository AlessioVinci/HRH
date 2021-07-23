namespace HRH {
    import fc = FudgeCore;

    export class Tile extends QuadNode {
        type: string;

        constructor(_name: string, _pos: fc.Vector2, _scale: fc.Vector2, _type: string) {
            super(_name, _pos, _scale);
            this.type = _type;
        }

        getType(): string {
            return this.type;
        }
    }
}