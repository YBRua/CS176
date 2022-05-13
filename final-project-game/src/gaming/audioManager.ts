import { Weapon } from "../data/weapon/weapon";

import SHORT_KINETIC_SFX from "../assets/audio/1911-.45-ACP-Close-Single-Gunshot-A-www.fesliyanstudios.com.mp3";
import SHORT_PLASMA_SFX from "../assets/audio/mixkit-short-laser-gun-shot-1670.wav";
import LARGE_SFX from "../assets/audio/mixkit-laser-weapon-shot-1681.wav";

import BGM from "../assets/audio/Es-STAGE2.mp3";

export class AudioManager {
  protected _audioElement: HTMLAudioElement;

  constructor(audioElement: HTMLAudioElement) {
    this._audioElement = audioElement;
  }

  public play() {
    this._audioElement.pause();
    this._audioElement.currentTime = 0;
    this._audioElement.play();
  }

  public loop() {
    this._audioElement.loop = true;
    return this._audioElement.play();
  }

  public pause() {
    this._audioElement.pause();
  }

  public reset() {
    this._audioElement.currentTime = 0;
  }
}

export function getWeaponSfx(weapon: Weapon): AudioManager {
  switch (weapon.id) {
    case 1:
    case 3:
      return new AudioManager(new Audio(SHORT_KINETIC_SFX));
    case 2:
    case 4:
    case 6:
      return new AudioManager(new Audio(SHORT_PLASMA_SFX));
    case 5:
      return new AudioManager(new Audio(LARGE_SFX));
    default:
      throw new Error("Unknown weapon");
  }
}

export function getBGMPlayer(): AudioManager {
  return new AudioManager(new Audio(BGM));
}
