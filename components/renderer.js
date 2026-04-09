const Renderer = {
  init() {
    this.renderTextInput();
    this.renderFonts();
    this.renderElements();
    this.renderLighting();
    this.renderCamera();
    this.renderAspectRatios();
    this.renderBoosters();
    this.renderEnvironment();
    this.renderGenerateButton();
    this.renderOutput();
  },

  renderTextInput() {
    const container = document.getElementById('text-input-container');
    if (container) {
      container.innerHTML = UI.createInputField(AppState.text, 20);
    }
  },

  renderFonts() {
    const container = document.getElementById('fonts-container');
    if (container) {
      container.innerHTML = UI.createSectionWithOptions(
        OPTIONS.fonts,
        AppState.font,
        'single'
      );
    }
  },

  renderElements() {
    const container = document.getElementById('elements-container');
    if (container) {
      container.innerHTML = UI.createSectionWithOptions(
        OPTIONS.elements,
        AppState.element,
        'single'
      );
      container.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
          const elementId = card.dataset.id;
          AppState.setElement(elementId);
          this.renderElements();
          this.renderEnvironment();
          this.renderBoosters();
          this.updateGenerateButton();
        });
      });
    }
  },

  renderEnvironment() {
    const container = document.getElementById('environment-container');
    if (container) {
      const environments = AppState.getEnvironments();
      container.innerHTML = UI.createEnvironmentDropdown(
        environments,
        AppState.environment
      );
    }
  },

  renderLighting() {
    const container = document.getElementById('lighting-container');
    if (container) {
      container.innerHTML = UI.createSectionWithOptions(
        OPTIONS.lighting,
        AppState.lighting,
        'single'
      );
    }
  },

  renderCamera() {
    const container = document.getElementById('camera-container');
    if (container) {
      container.innerHTML = UI.createSectionWithOptions(
        OPTIONS.cameras,
        AppState.camera,
        'single'
      );
    }
  },

  renderAspectRatios() {
    const container = document.getElementById('aspect-container');
    if (container) {
      container.innerHTML = UI.createSectionWithOptions(
        OPTIONS.aspectRatios,
        AppState.aspectRatio,
        'single'
      );
    }
  },

  renderBoosters() {
    const container = document.getElementById('boosters-container');
    if (container) {
      container.innerHTML = UI.createBoosterCards(
        OPTIONS.boosters,
        AppState.boosters
      );
    }
  },

  renderGenerateButton() {
    const container = document.getElementById('generate-container');
    if (container) {
      container.innerHTML = UI.createGenerateButton(
        AppState.canGenerate(),
        AppState.isLoading
      );
    }
  },

  renderOutput() {
    const container = document.getElementById('output-container');
    if (container) {
      container.innerHTML = UI.createOutputSection(AppState.generatedPrompt);
    }
  },

  updateCharacterCount() {
    const counter = document.querySelector('#text-input-container + .text-sm');
    if (counter) {
      counter.textContent = `${AppState.text.length}/20`;
    }
  },

  updateGenerateButton() {
    this.renderGenerateButton();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Renderer;
}