const OPTIONS = {
  fonts: [
    { id: 'cinematic-bold', label: 'Cinematic Bold', icon: '🎬' },
    { id: 'silver-chrome', label: 'Silver Chrome', icon: '✨' },
    { id: '8bit-pixel', label: '8-Bit Pixel', icon: '👾' },
    { id: 'game-title', label: 'Game Title', icon: '🎮' },
    { id: 'minecraft', label: 'Minecraft', icon: '⛏️' },
    { id: 'neon-outline', label: 'Neon Outline', icon: '💫' },
    { id: 'medieval-gothic', label: 'Medieval Gothic', icon: '🏰' },
    { id: 'scifi-tech', label: 'Sci-Fi Tech', icon: '🤖' }
  ],

  elements: [
    { id: 'transformers', label: 'Transformers', icon: '🤖', environments: ['Industrial Wasteland', 'Cyber City', 'Battle Zone', 'Tech Lab'] },
    { id: 'fire', label: 'Fire', icon: '🔥', environments: ['Arid Desert', 'Volcanic Field', 'Burning Forest', 'Black Studio'] },
    { id: 'ocean-wave', label: 'Ocean Wave', icon: '🌊', environments: ['Deep Sea', 'Storm Ocean', 'Tropical Shore'] },
    { id: 'cloud-sky', label: 'Cloud Sky', icon: '☁️', environments: ['Sunset Horizon', 'Storm Clouds', 'Ethereal Mist', 'Clear Blue'] },
    { id: 'molten-lava', label: 'Molten Lava', icon: '🌋', environments: ['Volcanic Crater', 'Underground Cavern', 'Lava Stream', 'Dark Cavern'] },
    { id: 'glacier-ice', label: 'Glacier Ice', icon: '❄️', environments: ['Arctic Tundra', 'Frozen Lake', 'Ice Cave', 'Mountain Peak'] },
    { id: 'lightning', label: 'Lightning', icon: '⚡', environments: ['Stormy Sky', 'Dark City', 'Open Field', 'Neon Alley'] },
    { id: 'neon-glass', label: 'Neon Glass', icon: ' neon', environments: ['Cyberpunk Street', 'Neon Bar', 'Tech Showroom', 'Abstract Void'] },
    { id: 'liquid-gold', label: 'Liquid Gold', icon: '🥇', environments: ['Luxury Interior', 'Museum Display', 'Treasure Chamber', 'Abstract Space'] },
    { id: 'dark-smoke', label: 'Dark Smoke', icon: '💨', environments: ['Abandoned Factory', 'Underground Tunnel', 'Mystic Chamber', 'Dark Studio'] },
    { id: 'crystal', label: 'Crystal', icon: '💎', environments: ['Crystal Cave', 'Magic Realm', 'Scientific Lab', 'Abstract Void'] },
    { id: 'rusted-steel', label: 'Rusted Steel', icon: '🦀', environments: ['Scrap Yard', 'Abandoned Industrial', 'Desert Ruins', 'Old Warehouse'] }
  ],

  lighting: [
    { id: 'golden-hour', label: 'Golden Hour', icon: '🌅' },
    { id: 'stormy-dark', label: 'Stormy Dark', icon: '⛈️' },
    { id: 'dawn-light', label: 'Dawn Light', icon: '🌄' },
    { id: 'harsh-midday', label: 'Harsh Midday', icon: '☀️' },
    { id: 'moonlit-night', label: 'Moonlit Night', icon: '🌙' },
    { id: 'cinematic-key', label: 'Cinematic Key', icon: '🎥' }
  ],

  cameras: [
    { id: 'front-on', label: 'Front-On', icon: '📷' },
    { id: 'low-angle', label: 'Low Angle', icon: '⬆️' },
    { id: '3/4-angle', label: '3/4 Angle', icon: '📐' },
    { id: 'aerial-tilt', label: 'Aerial Tilt', icon: '🚁' },
    { id: 'extreme-close', label: 'Extreme Close', icon: '🔍' },
    { id: 'ultra-wide', label: 'Ultra Wide', icon: '🌐' }
  ],

  aspectRatios: [
    { id: '1:1', label: '1:1', icon: '⬜' },
    { id: '4:5', label: '4:5', icon: '📱' },
    { id: '16:9', label: '16:9', icon: '🎬' },
    { id: '9:16', label: '9:16', icon: '📱' }
  ],

  boosters: [
    { id: '8k-render', label: '8K Render', desc: 'Ultra high resolution' },
    { id: 'photorealistic', label: 'Photorealistic', desc: 'Realistic textures' },
    { id: 'cinematic-dof', label: 'Cinematic DOF', desc: 'Depth of field' },
    { id: 'particle-fx', label: 'Particle FX', desc: 'Particle effects' },
    { id: 'subsurface-scattering', label: 'Subsurface Scattering', desc: 'Light penetration' },
    { id: 'volumetric-light', label: 'Volumetric Light', desc: 'God rays' },
    { id: 'motion-blur', label: 'Motion Blur', desc: 'Dynamic blur' },
    { id: 'hdr-tone-mapping', label: 'HDR Tone Mapping', desc: 'High dynamic range' },
    { id: 'film-grain', label: 'Film Grain', desc: 'Cinematic texture' },
    { id: 'dramatic-shadows', label: 'Dramatic Shadows', desc: 'Deep shadows' }
  ],

  elementRules: {
    'fire': {
      adjectives: ['flaming', 'blazing', 'ember-filled', 'heat-distorted'],
      materials: ['molten', 'incandescent', 'glowing ember'],
      effects: ['flames', 'embers', 'heat shimmer', 'smoke wisps']
    },
    'ice': {
      adjectives: ['frozen', 'crystalline', 'frost-covered', 'glacial'],
      materials: ['ice', 'frost', 'crystal'],
      effects: ['ice crystals', 'frost particles', 'reflective frost', 'snowflakes']
    },
    'ocean-wave': {
      adjectives: ['oceanic', 'salty', 'sea-sprayed', 'tidal'],
      materials: ['water', 'seafoam', 'salt water'],
      effects: ['water splashes', 'seafoam', 'reflections', 'underwater caustics']
    },
    'cloud-sky': {
      adjectives: ['ethereal', 'fluffy', 'dreamy', 'wispy'],
      materials: ['cloud', 'vapor', 'mist'],
      effects: ['soft clouds', 'light rays', 'vapor trails', 'mist']
    },
    'molten-lava': {
      adjectives: ['molten', 'scorching', 'liquid-fire', ' volcanic'],
      materials: ['lava', 'magma', 'molten rock'],
      effects: ['lava flows', 'cracks', 'glowing veins', 'heat glow']
    },
    'glacier-ice': {
      adjectives: ['arctic', 'frozen', 'glacial', 'pristine'],
      materials: ['ice', 'frozen water', 'glacier'],
      effects: ['ice shards', 'frozen crystals', 'fog', 'reflection']
    },
    'lightning': {
      adjectives: ['electric', 'crackling', 'thunderous', 'electrified'],
      materials: ['energy', 'plasma', 'electricity'],
      effects: ['lightning bolts', 'electric arcs', 'plasma', 'static']
    },
    'neon-glass': {
      adjectives: ['glowing', 'cyberpunk', 'neon-lit', 'luminous'],
      materials: ['glass', 'neon', 'light-emitting'],
      effects: ['neon glow', 'light streaks', 'reflections', 'color bloom']
    },
    'liquid-gold': {
      adjectives: ['golden', 'luxurious', 'metallic', 'wealthy'],
      materials: ['gold', 'liquid metal', 'bronze'],
      effects: ['golden reflections', 'liquid flow', 'shine', 'metallic sheen']
    },
    'dark-smoke': {
      adjectives: ['mysterious', 'shadowy', 'enigmatic', 'dense'],
      materials: ['smoke', 'fog', 'dark vapor'],
      effects: ['smoke tendrils', 'dark mist', 'particles', 'shadow layers']
    },
    'crystal': {
      adjectives: ['prismatic', 'faceted', 'brilliant', 'sparkling'],
      materials: ['crystal', 'gemstone', 'quartz'],
      effects: ['light refraction', 'rainbow sparkles', 'crystal facets', 'prismatic beams']
    },
    'rusted-steel': {
      adjectives: ['weathered', 'aged', 'corroded', 'industrial'],
      materials: ['rusted metal', 'steel', 'oxidation'],
      effects: ['rust texture', 'patina', 'corrosion', 'metal scratches']
    },
    'transformers': {
      adjectives: ['mechanical', 'robotic', 'metallic', 'futuristic'],
      materials: ['metal', 'chrome', 'machinery'],
      effects: ['mechanical details', 'metal shine', 'tech circuits', 'robotic elements']
    }
  },

  boosterDescriptions: {
    '8k-render': '8K ultra high resolution, crisp detail',
    'photorealistic': 'photorealistic rendering, true-to-life textures',
    'cinematic-dof': 'shallow depth of field, beautiful bokeh',
    'particle-fx': 'dynamic particle effects, floating debris',
    'subsurface-scattering': 'subsurface scattering, realistic light penetration',
    'volumetric-light': 'volumetric lighting, god rays, atmospheric fog',
    'motion-blur': 'motion blur, dynamic movement',
    'hdr-tone-mapping': 'high dynamic range, HDR tone mapping',
    'film-grain': 'film grain, cinematic texture',
    'dramatic-shadows': 'dramatic shadows, high contrast lighting'
  },

  lightingDescriptions: {
    'golden-hour': 'golden hour lighting, warm sunset colors',
    'stormy-dark': 'stormy dark atmosphere, dramatic clouds',
    'dawn-light': 'soft dawn light, pastel colors',
    'harsh-midday': 'harsh midday sun, strong shadows',
    'moonlit-night': 'moonlit night, cool blue tones',
    'cinematic-key': 'cinematic key lighting, dramatic highlight'
  },

  cameraDescriptions: {
    'front-on': 'front-facing camera angle',
    'low-angle': 'low angle shot, upward perspective',
    'three-quarter-angle': 'three-quarter angle, dynamic composition',
    'aerial-tilt': 'aerial tilt angle, overhead perspective',
    'extreme-close': 'extreme close-up, detailed view',
    'ultra-wide': 'ultra wide angle, expansive scene'
  },

  fontDescriptions: {
    'cinematic-bold': 'bold cinematic typography, thick letters',
    'silver-chrome': 'silver chrome material, reflective metallic surface',
    '8bit-pixel': '8-bit pixel art style, retro gaming aesthetic',
    'game-title': 'video game title style, dynamic gaming font',
    'minecraft': 'Minecraft-style blocky 3D letters',
    'neon-outline': 'neon outline style, glowing edges',
    'medieval-gothic': 'medieval gothic style, ornate vintage lettering',
    'scifi-tech': 'sci-fi tech style, futuristic digital font'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OPTIONS;
}