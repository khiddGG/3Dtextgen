const Events = {
  init() {
    this.bindTextInput();
    this.bindOptionCards();
    this.bindEnvironmentCards();
    this.bindBoosterCards();
    this.bindGenerateButton();
    this.bindCopyButton();
  },

  bindTextInput() {
    const input = document.getElementById('text-input');
    if (input) {
      input.addEventListener('input', (e) => {
        AppState.setText(e.target.value);
        Renderer.updateCharacterCount();
        Renderer.updateGenerateButton();
      });
    }
  },

  bindOptionCards() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.option-card');
      if (!card) return;

      const type = card.dataset.type;
      const id = card.dataset.id;

      if (type === 'single') {
        const section = card.closest('.option-section');
        const category = section.dataset.category;

        if (category === 'font') {
          AppState.setFont(id);
        } else if (category === 'lighting') {
          AppState.setLighting(id);
        } else if (category === 'camera') {
          AppState.setCamera(id);
        } else if (category === 'aspect') {
          AppState.setAspectRatio(id);
        }

        Renderer.renderOptions();
        Renderer.updateGenerateButton();
      }
    });
  },

  bindEnvironmentCards() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.env-card');
      if (!card) return;

      const env = card.dataset.env;
      AppState.setEnvironment(env);
      Renderer.renderEnvironment();
      Renderer.updateGenerateButton();
    });
  },

  bindBoosterCards() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.booster-card');
      if (!card) return;

      const id = card.dataset.id;
      AppState.toggleBooster(id);
      Renderer.renderBoosters();
      Renderer.updateGenerateButton();
    });
  },

  bindGenerateButton() {
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('#generate-btn');
      if (!btn || !AppState.canGenerate() || AppState.isLoading) return;

      AppState.isLoading = true;
      Renderer.updateGenerateButton();

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(AppState.getState())
        });

        const data = await response.json();

        if (data.success) {
          AppState.generatedPrompt = data.prompt;
          Renderer.renderOutput();
        } else {
          console.error('Failed to generate prompt');
        }
      } catch (error) {
        console.error('Error generating prompt:', error);
      } finally {
        AppState.isLoading = false;
        Renderer.updateGenerateButton();
      }
    });
  },

  bindCopyButton() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#copy-btn');
      if (!btn || !AppState.generatedPrompt) return;

      Clipboard.copy(AppState.generatedPrompt).then(() => {
        UI.createToast('Prompt copied to clipboard!');
      });
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Events;
}