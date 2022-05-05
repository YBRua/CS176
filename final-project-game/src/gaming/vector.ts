export class Vector2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public add(v: Vector2D): Vector2D {
    return Vector2D.add(this, v);
  }

  static add(v1: Vector2D, v2: Vector2D): Vector2D {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
  }

  static scale(v: Vector2D, s: number): Vector2D {
    return new Vector2D(v.x * s, v.y * s);
  }
}
