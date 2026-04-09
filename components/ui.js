const UI = {
  createSection(title, description) {
    return `
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-white mb-1">${title}</h3>
        ${description ? `<p class="text-sm text-gray-400">${description}</p>` : ''}
      </div>
    `;
  },

  createSectionWithOptions(options, selectedId, type, onSelect) {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${options.map(opt => `
          <button 
            class="option-card ${type === 'multi' ? 'multi-select' : 'single-select'} ${type !== 'multi' && selectedId === opt.id ? 'selected' : ''}"
            data-type="${type}"
            data-id="${opt.id}"
          >
            ${opt.icon ? `<span class="text-xl mb-1 block">${opt.icon}</span>` : ''}
            <span class="text-sm font-medium">${opt.label}</span>
            ${type === 'multi' && selectedId === opt.id ? '<span class="checkmark">✓</span>' : ''}
          </button>
        `).join('')}
      </div>
    `;
  },

  createBoosterCards(boosters, selectedBoosters) {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        ${boosters.map(booster => {
          const isSelected = selectedBoosters.includes(booster.id);
          return `
            <button 
              class="booster-card ${isSelected ? 'selected' : ''}"
              data-id="${booster.id}"
            >
              <span class="booster-label">${booster.label}</span>
              <span class="booster-desc">${booster.desc}</span>
              ${isSelected ? '<span class="checkmark">✓</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  },

  createEnvironmentDropdown(environments, selectedEnvironment) {
    if (!environments || environments.length === 0) {
      return '<p class="text-gray-500 text-sm">Select an element first</p>';
    }
    return `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${environments.map(env => `
          <button 
            class="env-card ${selectedEnvironment === env ? 'selected' : ''}"
            data-env="${env}"
          >
            ${env}
          </button>
        `).join('')}
      </div>
    `;
  },

  createInputField(text, maxLength) {
    return `
      <div class="relative">
        <input 
          type="text" 
          id="text-input"
          class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          placeholder="Enter your text..."
          value="${text}"
          maxlength="${maxLength}"
        />
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm ${text.length >= maxLength * 0.9 ? 'text-orange-500' : 'text-gray-500'}">
          ${text.length}/${maxLength}
        </span>
      </div>
    `;
  },

  createGenerateButton(canGenerate, isLoading) {
    return `
      <button 
        id="generate-btn"
        class="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          canGenerate && !isLoading 
            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40' 
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }"
        ${!canGenerate || isLoading ? 'disabled' : ''}
      >
        ${isLoading ? `
          <span class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ` : '✨ Generate Prompt'}
      </button>
    `;
  },

  createOutputSection(prompt) {
    if (!prompt) return '';
    return `
      <div class="output-section animate-fade-in">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-white">Generated Prompt</h3>
          <button id="copy-btn" class="copy-btn">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy
          </button>
        </div>
        <div class="prompt-display">
          <p class="text-gray-300 leading-relaxed">${prompt}</p>
        </div>
        <div class="platform-buttons">
          <p class="text-sm text-gray-400 mb-3">Open in:</p>
          <div class="flex flex-wrap gap-2">
            <a href="https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}" target="_blank" class="platform-btn chatgpt">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7379l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4066-.6898z"/></svg>
              ChatGPT
            </a>
            <a href="https://gemini.google.com/app?prompt=${encodeURIComponent(prompt)}" target="_blank" class="platform-btn gemini">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Gemini
            </a>
            <a href="https://www.midjourney.com/explore?prompt=${encodeURIComponent(prompt)}" target="_blank" class="platform-btn midjourney">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              Midjourney
            </a>
            <a href="https://ideogram.ai/t/${encodeURIComponent(prompt)}" target="_blank" class="platform-btn ideogram">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
              Ideogram
            </a>
          </div>
        </div>
      </div>
    `;
  },

  createToast(message) {
    return `
      <div id="toast" class="toast animate-slide-up">
        <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${message}
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}