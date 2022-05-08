export class CooldownManager {
  private _canFire: boolean;
  private _shortCD: number;
  private _longCD: number;
  private _maxShots: number;
  private _shotsFired: number;

  constructor(shortCD: number, longCD: number, maxShots: number) {
    this._shortCD = shortCD;
    this._longCD = longCD;
    this._maxShots = maxShots;

    this._canFire = true;
    this._shotsFired = 0;
  }

  public canFire(): boolean {
    return this._canFire;
  }

  public step(): void {
    this._shotsFired++;
    this._canFire = false;

    if (this._shotsFired >= this._maxShots) {
      setTimeout(() => {
        this._canFire = true;
        this._shotsFired = 0;
      }, this._longCD * 100);
    } else {
      setTimeout(() => {
        this._canFire = true;
      }, this._shortCD * 100);
    }
  }
}
