const AppState = {
  text: '',
  font: null,
  element: null,
  environment: null,
  lighting: null,
  camera: null,
  aspectRatio: '1:1',
  boosters: [],
  generatedPrompt: '',
  isLoading: false,

  getEnvironments() {
    if (!this.element) return [];
    const elementData = OPTIONS.elements.find(e => e.id === this.element);
    return elementData ? elementData.environments : [];
  },

  resetEnvironment() {
    this.environment = null;
  },

  setText(text) {
    this.text = text.slice(0, 20);
  },

  setFont(fontId) {
    this.font = fontId;
  },

  setElement(elementId) {
    this.element = elementId;
    this.environment = null;
  },

  setEnvironment(environment) {
    this.environment = environment;
  },

  setLighting(lightingId) {
    this.lighting = lightingId;
  },

  setCamera(cameraId) {
    this.camera = cameraId;
  },

  setAspectRatio(ratio) {
    this.aspectRatio = ratio;
  },

  toggleBooster(boosterId) {
    const index = this.boosters.indexOf(boosterId);
    if (index === -1) {
      this.boosters.push(boosterId);
    } else {
      this.boosters.splice(index, 1);
    }
  },

  isBoosterSelected(boosterId) {
    return this.boosters.includes(boosterId);
  },

  canGenerate() {
    return this.text.trim().length > 0 && 
           this.font && 
           this.element && 
           this.environment && 
           this.lighting && 
           this.camera;
  },

  getState() {
    return {
      text: this.text,
      font: this.font,
      element: this.element,
      environment: this.environment,
      lighting: this.lighting,
      camera: this.camera,
      aspectRatio: this.aspectRatio,
      boosters: [...this.boosters]
    };
  },

  reset() {
    this.text = '';
    this.font = null;
    this.element = null;
    this.environment = null;
    this.lighting = null;
    this.camera = null;
    this.aspectRatio = '1:1';
    this.boosters = [];
    this.generatedPrompt = '';
    this.isLoading = false;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppState;
}