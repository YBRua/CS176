export enum OreoType {
  O = "O",
  Re = "R",
  Empty = " ",
}

export enum OreoActionType {
  AppendO,
  AppendRe,
  AppendEmpty,
  RemoveLast,
  ClearAll,
}

export enum OreoFlavor {
  Vanilla = "vanilla",
  Chocolate = "chocolate",
  Strawberry = "strawberry",
  Matcha = "matcha",
}

export interface OreoAction {
  type: OreoActionType;
}

interface OreoRenderConfig {
  image: HTMLImageElement;
  x: number;
  y: number;
  height: number;
  width: number;
}

export class OreoArtist {
  canvas: HTMLCanvasElement | null;
  images: Map<string, HTMLImageElement>;
  configs: OreoRenderConfig[];
  setIsLoading: (isLoading: boolean) => void;
  setCanvasReady: (isReady: boolean) => void;

  static imageKeys = [
    "O",
    "R.vanilla",
    "R.strawberry",
    "R.chocolate",
    "R.matcha",
    "Ob",
  ];

  constructor(
    setIsLoading: (arg0: boolean) => void,
    setCanvasReady: (arg0: boolean) => void
  ) {
    this.canvas = null;
    this.images = new Map();
    this.configs = [];
    this.setIsLoading = setIsLoading;
    this.setCanvasReady = setCanvasReady;
  }

  _loadImages() {
    this.setIsLoading(true);
    let loaded = 0;
    for (const key of OreoArtist.imageKeys) {
      const image = new Image();

      image.src = `src/figs/minified/${key}.png`;
      image.onload = () => {
        ++loaded;
        this.images.set(key, image);
        if (loaded === OreoArtist.imageKeys.length) {
          // console.log("All image assets loaded.");
        }
      };
    }
    setTimeout(() => {
      this.setIsLoading(false);
    }, 1000);
  }

  _generateCanvasCtx(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    return ctx;
  }

  _generateRenderConfigs(oreo: OreoType[], flavor: OreoFlavor) {
    let isFirstO = true;
    let currentHeight = 0;

    // remove leading and trailing spaces
    while (oreo[0] === OreoType.Empty) {
      oreo.shift();
    }
    while (oreo[oreo.length - 1] === OreoType.Empty) {
      oreo.pop();
    }

    for (const o of oreo) {
      switch (o) {
        case OreoType.O:
          this.configs.unshift({
            image: isFirstO ? this.images.get("O")! : this.images.get("Ob")!,
            x: 0,
            y: currentHeight,
            width: 240,
            height: 160,
          });
          currentHeight += 24;
          if (isFirstO) {
            isFirstO = false;
          }
          break;
        case OreoType.Re:
          this.configs.unshift({
            image: this.images.get(`R.${flavor}`)!,
            x: 10,
            y: currentHeight,
            width: 220,
            height: 155,
          });
          currentHeight += 24;
          break;
        case OreoType.Empty:
          currentHeight += 72;
      }
    }

    currentHeight += 160 - 24;
    this.canvas!.height = currentHeight;
    this.canvas!.width = 240;
  }

  _resetConfigs() {
    this.configs = [];
  }

  draw(oreo: OreoType[], flavor: OreoFlavor, canvas: HTMLCanvasElement) {
    const oreo_ = Array.from(oreo);
    this.setCanvasReady(false);
    const ctx = this._generateCanvasCtx(canvas);
    this._resetConfigs();
    this._generateRenderConfigs(oreo_, flavor);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.configs.length > 0) {
      this.configs.forEach((cfg) => {
        ctx.drawImage(cfg.image, cfg.x, cfg.y, cfg.width, cfg.height);
      });
    }
    // console.log("Render Done.");
    setTimeout(() => {
      // console.log("Post-rendering callback");
      this.setCanvasReady(true);
    }, 1000);
  }
}
