import { sounds, defaultPresets } from "./soundData.js";
import { SoundManager } from "./soundManager.js";
import { UI } from "./ui.js";

class AmbientMixer {
  constructor() {
    this.soundManager = new SoundManager();
    this.ui = new UI();
    this.presetManager = null;
    this.timer = null;
    this.currentSoundState = {};
    this.isInitialized = false;
  }

  init() {
    try {
      this.ui.init();
      this.ui.renderSoundCards(sounds);

      this.setupEventListeners();

      this.loadAllSounds();

      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize!");
    }
  }

  setupEventListeners() {
    document.addEventListener("click", async (e) => {
      if (e.target.closest(".play-btn")) {
        const soundId = e.target.closest(".play-btn").dataset.sound;
        await this.toggleSound(soundId);
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.classList.contains("volume-slider")) {
        const soundId = e.target.dataset.sound;
        const volume = parseInt(e.target.value);
        this.setSoundVolume(soundId, volume);
      }
    });
  }

  loadAllSounds() {
    sounds.forEach((sound) => {
      const audioUrl = `audio/${sound.file}`;
      const success = this.soundManager.loadSound(sound.id, audioUrl);
      if (!success) {
        console.warn(`Could not load sound: ${sound.name} from ${audioUrl}`);
      }
    });
  }

  async toggleSound(soundId) {
    const audio = this.soundManager.audioElements.get(soundId);

    if (!audio) {
      console.error(`Sound ${soundId} not found`);
      return false;
    }

    if (audio.paused) {
      const card = document.querySelector(`[data-sound="${soundId}"]`);
      const slider = card.querySelector(".volume-slider");
      let volume = parseInt(slider.value);

      if (volume === 0) {
        volume = 50;
        this.ui.updateVolumeDisplay(soundId, volume);
      }

      this.soundManager.setVolume(soundId, volume);
      await this.soundManager.playSound(soundId);
      this.ui.updateSoundPlayButton(soundId, true);
    } else {
      this.soundManager.pauseSound(soundId);
      this.ui.updateSoundPlayButton(soundId, false);
    }
  }

  setSoundVolume(soundId, volume) {
    this.soundManager.setVolume(soundId, volume);

    this.ui.updateVolumeDisplay(soundId, volume);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AmbientMixer();
  app.init();
});
