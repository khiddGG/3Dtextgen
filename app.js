(function() {
  'use strict';

  const state = {
    text: '',
    font: null,
    element: null,
    environment: null,
    lighting: null,
    camera: null,
    aspectRatio: '1:1',
    boosters: [],
    generatedPrompt: '',
    isLoading: false
  };

  const fonts = [
    { id: 'cinematic-bold', label: 'Cinematic', icon: '🎬' },
    { id: 'silver-chrome', label: 'Chrome', icon: '✨' },
    { id: '8bit-pixel', label: 'Pixel', icon: '👾' },
    { id: 'game-title', label: 'Game', icon: '🎮' },
    { id: 'minecraft', label: 'Minecraft', icon: '⛏️' },
    { id: 'neon-outline', label: 'Neon', icon: '💫' },
    { id: 'medieval-gothic', label: 'Gothic', icon: '🏰' },
    { id: 'scifi-tech', label: 'Sci-Fi', icon: '🤖' }
  ];

  const elements = [
    { id: 'transformers', label: 'Transformers', icon: '🤖', environments: ['Industrial Wasteland', 'Cyber City', 'Battle Zone', 'Tech Lab'] },
    { id: 'fire', label: 'Fire', icon: '🔥', environments: ['Arid Desert', 'Volcanic Field', 'Burning Forest', 'Black Studio'] },
    { id: 'ocean-wave', label: 'Ocean', icon: '🌊', environments: ['Deep Sea', 'Storm Ocean', 'Tropical Shore'] },
    { id: 'cloud-sky', label: 'Cloud', icon: '☁️', environments: ['Sunset Horizon', 'Storm Clouds', 'Ethereal Mist', 'Clear Blue'] },
    { id: 'molten-lava', label: 'Lava', icon: '🌋', environments: ['Volcanic Crater', 'Underground Cavern', 'Lava Stream', 'Dark Cavern'] },
    { id: 'glacier-ice', label: 'Ice', icon: '❄️', environments: ['Arctic Tundra', 'Frozen Lake', 'Ice Cave', 'Mountain Peak'] },
    { id: 'lightning', label: 'Lightning', icon: '⚡', environments: ['Stormy Sky', 'Dark City', 'Open Field', 'Neon Alley'] },
    { id: 'neon-glass', label: 'Neon Glass', icon: '💜', environments: ['Cyberpunk Street', 'Neon Bar', 'Tech Showroom', 'Abstract Void'] },
    { id: 'liquid-gold', label: 'Gold', icon: '🥇', environments: ['Luxury Interior', 'Museum Display', 'Treasure Chamber', 'Abstract Space'] },
    { id: 'dark-smoke', label: 'Smoke', icon: '💨', environments: ['Abandoned Factory', 'Underground Tunnel', 'Mystic Chamber', 'Dark Studio'] },
    { id: 'crystal', label: 'Crystal', icon: '💎', environments: ['Crystal Cave', 'Magic Realm', 'Scientific Lab', 'Abstract Void'] },
    { id: 'rusted-steel', label: 'Rusted', icon: '🦀', environments: ['Scrap Yard', 'Abandoned Industrial', 'Desert Ruins', 'Old Warehouse'] }
  ];

  const lighting = [
    { id: 'golden-hour', label: 'Golden Hour', icon: '🌅' },
    { id: 'stormy-dark', label: 'Stormy', icon: '⛈️' },
    { id: 'dawn-light', label: 'Dawn', icon: '🌄' },
    { id: 'harsh-midday', label: 'Midday', icon: '☀️' },
    { id: 'moonlit-night', label: 'Moonlit', icon: '🌙' },
    { id: 'cinematic-key', label: 'Cinematic', icon: '🎥' }
  ];

  const cameras = [
    { id: 'front-on', label: 'Front', icon: '📷' },
    { id: 'low-angle', label: 'Low Angle', icon: '⬆️' },
    { id: '3/4-angle', label: '3/4', icon: '📐' },
    { id: 'aerial-tilt', label: 'Aerial', icon: '🚁' },
    { id: 'extreme-close', label: 'Close', icon: '🔍' },
    { id: 'ultra-wide', label: 'Wide', icon: '🌐' }
  ];

  const aspectRatios = [
    { id: '1:1', label: '1:1' },
    { id: '4:5', label: '4:5' },
    { id: '16:9', label: '16:9' },
    { id: '9:16', label: '9:16' }
  ];

  const boosters = [
    { id: '8k-render', label: '8K Render', desc: 'Ultra HD' },
    { id: 'photorealistic', label: 'Photorealistic', desc: 'Realistic' },
    { id: 'cinematic-dof', label: 'Cinematic DOF', desc: 'Bokeh' },
    { id: 'particle-fx', label: 'Particle FX', desc: 'Effects' },
    { id: 'subsurface-scattering', label: 'Subsurface', desc: 'Light' },
    { id: 'volumetric-light', label: 'Volumetric', desc: 'God rays' },
    { id: 'motion-blur', label: 'Motion Blur', desc: 'Dynamic' },
    { id: 'hdr-tone-mapping', label: 'HDR', desc: 'Tone map' },
    { id: 'film-grain', label: 'Film Grain', desc: 'Texture' },
    { id: 'dramatic-shadows', label: 'Dramatic', desc: 'Shadows' }
  ];

  function getEnvironments(elementId) {
    const el = elements.find(e => e.id === elementId);
    return el ? el.environments : [];
  }

  function canGenerate() {
    return state.text.trim().length > 0 && 
           state.font && 
           state.element && 
           state.environment && 
           state.lighting && 
           state.camera;
  }

  function updateCharCounter() {
    const counter = document.getElementById('char-counter');
    if (counter) {
      counter.textContent = `${state.text.length}/20`;
    }
  }

  function updateGenerateButton() {
    const btn = document.getElementById('generate-btn');
    if (btn) {
      btn.disabled = !canGenerate() || state.isLoading;
    }
  }

  function renderOptions() {
    const fontsContainer = document.getElementById('fonts-container');
    const elementsContainer = document.getElementById('elements-container');
    const lightingContainer = document.getElementById('lighting-container');
    const cameraContainer = document.getElementById('camera-container');
    const aspectContainer = document.getElementById('aspect-container');
    const boostersContainer = document.getElementById('boosters-container');

    if (fontsContainer) {
      fontsContainer.innerHTML = fonts.map(f => `
        <div class="option ${state.font === f.id ? 'active' : ''}" data-type="font" data-id="${f.id}">
          <span class="option-icon">${f.icon}</span>
          <span class="option-label">${f.label}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    if (elementsContainer) {
      elementsContainer.innerHTML = elements.map(e => `
        <div class="option ${state.element === e.id ? 'active' : ''}" data-type="element" data-id="${e.id}">
          <span class="option-icon">${e.icon}</span>
          <span class="option-label">${e.label}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    if (lightingContainer) {
      lightingContainer.innerHTML = lighting.map(l => `
        <div class="option ${state.lighting === l.id ? 'active' : ''}" data-type="lighting" data-id="${l.id}">
          <span class="option-icon">${l.icon}</span>
          <span class="option-label">${l.label}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    if (cameraContainer) {
      cameraContainer.innerHTML = cameras.map(c => `
        <div class="option ${state.camera === c.id ? 'active' : ''}" data-type="camera" data-id="${c.id}">
          <span class="option-icon">${c.icon}</span>
          <span class="option-label">${c.label}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    if (aspectContainer) {
      aspectContainer.innerHTML = aspectRatios.map(a => `
        <div class="option ${state.aspectRatio === a.id ? 'active' : ''}" data-type="aspect" data-id="${a.id}">
          <span class="option-icon">📐</span>
          <span class="option-label">${a.label}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    if (boostersContainer) {
      boostersContainer.innerHTML = boosters.map(b => `
        <div class="booster ${state.boosters.includes(b.id) ? 'active' : ''}" data-type="booster" data-id="${b.id}">
          <span class="booster-label">${b.label}</span>
          <span class="booster-desc">${b.desc}</span>
          <span class="check-icon">✓</span>
        </div>
      `).join('');
    }

    renderEnvironment();
    updateGenerateButton();
  }

  function renderEnvironment() {
    const container = document.getElementById('environment-container');
    if (!container) return;

    const envs = getEnvironments(state.element);
    
    if (envs.length === 0) {
      container.innerHTML = '<p class="env-placeholder">Select an elemental style first</p>';
      return;
    }

    if (!state.environment || !envs.includes(state.environment)) {
      state.environment = null;
    }

    container.innerHTML = envs.map(env => `
      <div class="env-option ${state.environment === env ? 'active' : ''}" data-type="environment" data-id="${env}">
        ${env}
      </div>
    `).join('');
  }

  async function generatePrompt() {
    if (!canGenerate() || state.isLoading) return;

    state.isLoading = true;
    updateGenerateButton();

    const btn = document.getElementById('generate-btn');
    btn.innerHTML = '<span class="spinner">⏳</span> Generating...';

    try {
      // Try API first (works on Vercel)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          state.generatedPrompt = data.prompt;
          renderOutput();
          return;
        }
      }
    } catch (error) {
      console.log('API not available, using local generation');
    }

    // Fallback: generate locally
    state.generatedPrompt = generatePromptLocal(state);
    renderOutput();
    
    state.isLoading = false;
    btn.innerHTML = '<span>✨</span> Generate Prompt';
    updateGenerateButton();
  }

  function generatePromptLocal(data) {
    const { text, font, element, environment, lighting, camera, aspectRatio, boosters } = data;
    
    const fontDesc = {
      'cinematic-bold': 'bold cinematic typography with thick 3D letters, dramatic depth and strong visual impact',
      'silver-chrome': 'polished silver chrome material with reflective metallic surface',
      '8bit-pixel': '8-bit pixel art style, retro gaming aesthetic with blocky voxel geometry',
      'game-title': 'dynamic video game title style with explosive energy',
      'minecraft': 'Minecraft-style blocky 3D letters, voxel-based design',
      'neon-outline': 'glowing neon outline style with luminous edges',
      'medieval-gothic': 'medieval gothic style with ornate vintage lettering',
      'scifi-tech': 'futuristic sci-fi tech style with digital font'
    }[font] || 'bold 3D typography';

    const elementData = {
      'fire': { effects: ['dancing flames', 'floating embers', 'heat shimmer'], background: 'fiery backdrop with flames' },
      'ice': { effects: ['ice crystals', 'frost particles', 'reflective frost'], background: 'frozen winter scene' },
      'ocean-wave': { effects: ['water splashes', 'seafoam', 'reflections'], background: 'vast ocean scene' },
      'cloud-sky': { effects: ['soft clouds', 'light rays', 'vapor trails'], background: 'dreamy sky' },
      'molten-lava': { effects: ['lava flows', 'cracks', 'glowing veins'], background: 'volcanic landscape' },
      'glacier-ice': { effects: ['ice shards', 'frozen crystals', 'fog'], background: 'arctic glacier scene' },
      'lightning': { effects: ['lightning bolts', 'electric arcs', 'plasma'], background: 'stormy atmosphere' },
      'neon-glass': { effects: ['neon glow', 'light streaks', 'reflections'], background: 'neon-lit cyberpunk city' },
      'liquid-gold': { effects: ['golden reflections', 'liquid flow', 'shine'], background: 'luxury setting' },
      'dark-smoke': { effects: ['smoke tendrils', 'dark mist', 'particles'], background: 'mysterious void' },
      'crystal': { effects: ['light refraction', 'rainbow sparkles', 'crystal facets'], background: 'crystal cavern' },
      'rusted-steel': { effects: ['rust texture', 'patina', 'corrosion'], background: 'industrial ruin' },
      'transformers': { effects: ['mechanical details', 'metal shine', 'tech circuits'], background: 'sci-fi mech environment' }
    }[element] || { effects: ['dynamic effects'], background: 'creative backdrop' };

    const lightingDesc = {
      'golden-hour': 'golden hour lighting with warm sunset tones',
      'stormy-dark': 'stormy dark atmosphere with dramatic clouds',
      'dawn-light': 'soft dawn light with pastel colors',
      'harsh-midday': 'harsh midday sun with strong shadows',
      'moonlit-night': 'cool moonlit night with blue tones',
      'cinematic-key': 'dramatic cinematic key lighting'
    }[lighting] || 'golden hour lighting';

    const cameraDesc = {
      'front-on': 'front-facing camera angle',
      'low-angle': 'low angle shot looking upward',
      '3/4-angle': 'three-quarter angle for dynamic composition',
      'aerial-tilt': 'aerial tilt overhead perspective',
      'extreme-close': 'extreme close-up for detailed view',
      'ultra-wide': 'ultra wide angle capturing expansive scene'
    }[camera] || 'front-facing camera angle';

    const aspectDesc = {
      '1:1': 'square format',
      '4:5': 'portrait format',
      '16:9': 'cinematic widescreen',
      '9:16': 'vertical social media format'
    }[aspectRatio] || 'square format';

    const boosterDesc = {
      '8k-render': '8K ultra high resolution',
      'photorealistic': 'photorealistic rendering',
      'cinematic-dof': 'shallow depth of field with bokeh',
      'particle-fx': 'dynamic particle effects',
      'subsurface-scattering': 'realistic subsurface scattering',
      'volumetric-light': 'volumetric lighting with god rays',
      'motion-blur': 'motion blur for dynamic movement',
      'hdr-tone-mapping': 'high dynamic range',
      'film-grain': 'subtle film grain',
      'dramatic-shadows': 'deep dramatic shadows'
    };

    let prompt = `A stunning 3D rendered text "${text.toUpperCase()}" featuring ${fontDesc}, with ${elementData.effects.join(', ')}, set against ${elementData.background}, illuminated by ${lightingDesc}, captured from ${cameraDesc}, rendered in ${aspectDesc}`;

    if (boosters && boosters.length > 0) {
      const selectedBoosters = boosters.map(b => boosterDesc[b]).filter(Boolean);
      if (selectedBoosters.length > 0) {
        prompt += `, ${selectedBoosters.join(', ')}`;
      }
    }

    prompt += ', no people in frame, text is the main subject, ultra detailed, cinematic composition, professional product photography, high quality masterpiece';

    return prompt;
  }

  function renderOutput() {
    const card = document.getElementById('output-card');
    const text = document.getElementById('prompt-text');
    const chatgptBtn = document.getElementById('btn-chatgpt');
    const geminiBtn = document.getElementById('btn-gemini');
    const midjourneyBtn = document.getElementById('btn-midjourney');
    const ideogramBtn = document.getElementById('btn-ideogram');

    if (card && text) {
      card.classList.add('visible');
      text.textContent = state.generatedPrompt;

      const encoded = encodeURIComponent(state.generatedPrompt);
      if (chatgptBtn) chatgptBtn.href = `https://chat.openai.com/?prompt=${encoded}`;
      if (geminiBtn) geminiBtn.href = `https://gemini.google.com/app?prompt=${encoded}`;
      if (midjourneyBtn) midjourneyBtn.href = `https://www.midjourney.com/explore?prompt=${encoded}`;
      if (ideogramBtn) ideogramBtn.href = `https://ideogram.ai/t/${encoded}`;
    }
  }

  async function copyToClipboard() {
    if (!state.generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(state.generatedPrompt);
      showToast('Copied to clipboard!');
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = state.generatedPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Copied to clipboard!');
    }
  }

  function showToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  function handleClick(e) {
    const option = e.target.closest('.option');
    const booster = e.target.closest('.booster');
    const envOption = e.target.closest('.env-option');

    if (option) {
      const type = option.dataset.type;
      const id = option.dataset.id;

      if (type === 'font') state.font = id;
      else if (type === 'element') {
        state.element = id;
        state.environment = null;
      }
      else if (type === 'lighting') state.lighting = id;
      else if (type === 'camera') state.camera = id;
      else if (type === 'aspect') state.aspectRatio = id;

      renderOptions();
    }

    if (booster) {
      const id = booster.dataset.id;
      const idx = state.boosters.indexOf(id);
      if (idx > -1) state.boosters.splice(idx, 1);
      else state.boosters.push(id);
      renderOptions();
    }

    if (envOption) {
      state.environment = envOption.dataset.id;
      renderEnvironment();
      updateGenerateButton();
    }

    if (e.target.closest('#generate-btn')) {
      generatePrompt();
    }

    if (e.target.closest('#copy-btn')) {
      copyToClipboard();
    }
  }

  function handleInput(e) {
    if (e.target.id === 'text-input') {
      state.text = e.target.value.slice(0, 20);
      updateCharCounter();
      updateGenerateButton();
    }
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    renderOptions();
    updateCharCounter();
    updateGenerateButton();
  }

  document.addEventListener('DOMContentLoaded', init);
})();