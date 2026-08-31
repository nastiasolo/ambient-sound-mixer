export class SoundManager {
  constructor() {
    this.audioElements = new Map();
    this.isPlaying = false;
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

  async playSound(soundId) {
    const audio = this.audioElements.get(soundId);

    if (audio) {
      try {
        await audio.play();
        return true;
      } catch (error) {
        console.error(`Failed to play ${soundId}`, error);
        return false;
      }
    }
  }

  pauseSound(soundId) {
    const audio = this.audioElements.get(soundId);

    if (audio && !audio.paused) {
      audio.pause();
    }
  }

  setVolume(soundId, volume) {
    const audio = this.audioElements.get(soundId);

    if (!audio) {
      console.error(`Sound ${soundId} not found`);
      return false;
    }

    audio.volume = volume / 100;
    return true;
  }

  playAll() {
    for (const [soundId, audio] of this.audioElements) {
      if (audio.paused) {
        audio.play();
      }
    }
    this.isPlaying = true;
  }

  pauseAll() {
    for (const [soundId, audio] of this.audioElements) {
      if (!audio.paused) {
        audio.pause();
      }
    }
    this.isPlaying = false;
  }
}
