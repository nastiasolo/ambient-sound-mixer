export class SoundManager {
  constructor() {
    this.audioElements = new Map();
    this.isPlaying = false;
    console.log("Soundmanager created");
  }

  loadSound(soundId, filePath) {
    try {
      const audio = new Audio();
      audio.src = filePath;
      audio.loop = true;
      audio.preload = "metadata";

      this.audioElements.set(soundId, audio);
      return true;
    } catch (error) {
      console.error(`Failed to load sound ${soundId}`);
      return false;
    }
  }
}
