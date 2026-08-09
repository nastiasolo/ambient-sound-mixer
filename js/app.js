import { sounds, defaultPresets } from "./soundData.js";

class AmbientMixer {
  constructor() {
    console.log("Initializing state...");
    this.soundManager = null;
    this.ui = null;
    this.presetManager = null;
    this.timer = null;
    this.currentSoundState = {};
    this.isInitialized = false;
  }

  init() {
    try {
      console.log("Initializing app...");
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize!");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AmbientMixer();
  app.init();
});
