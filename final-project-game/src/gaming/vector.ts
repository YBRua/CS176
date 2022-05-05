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

  public scale(s: number): Vector2D {
    return Vector2D.scale(this, s);
  }

  public addX(x: number): Vector2D {
    return Vector2D.addX(this, x);
  }

  public addY(y: number): Vector2D {
    return Vector2D.AddY(this, y);
  }

  static add(v1: Vector2D, v2: Vector2D): Vector2D {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
  }

  static scale(v: Vector2D, s: number): Vector2D {
    return new Vector2D(v.x * s, v.y * s);
  }

  static addX(v: Vector2D, x: number): Vector2D {
    return new Vector2D(v.x + x, v.y);
  }

  static AddY(v: Vector2D, y: number): Vector2D {
    return new Vector2D(v.x, v.y + y);
  }
}
