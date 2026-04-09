module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const prompt = generatePrompt(data);
    
    return res.status(200).json({
      success: true,
      prompt: prompt
    });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate prompt' });
  }
};

function generatePrompt(data) {
  const {
    text,
    font,
    element,
    environment,
    lighting,
    camera,
    aspectRatio,
    boosters
  } = data;

  if (!text || !font || !element || !environment || !lighting || !camera) {
    return 'Please select all required options to generate a prompt.';
  }

  const fontDescriptions = {
    'cinematic-bold': 'bold cinematic typography with thick 3D letters, dramatic depth and strong visual impact',
    'silver-chrome': 'polished silver chrome material with reflective metallic surface, mirror-like finish and prismatic highlights',
    '8bit-pixel': '8-bit pixel art style, retro gaming aesthetic with blocky voxel geometry and nostalgic charm',
    'game-title': 'dynamic video game title style, bold action font with explosive energy and gaming DNA',
    'minecraft': 'Minecraft-style blocky 3D letters, voxel-based design with textured surfaces and cubic geometry',
    'neon-outline': 'glowing neon outline style with luminous edges, electric aura and vibrant light emission',
    'medieval-gothic': 'medieval gothic style with ornate vintage lettering, carved stone texture and ancient feel',
    'scifi-tech': 'futuristic sci-fi tech style with digital font, holographic elements and cutting-edge aesthetics'
  };

  const elementRules = {
    'fire': {
      adjectives: ['blazing', 'flaming', 'ember-filled', 'heat-distorted'],
      materials: ['molten', 'incandescent', 'glowing ember'],
      effects: ['dancing flames', 'floating embers', 'heat shimmer', 'smoke wisps'],
      background: 'fiery backdrop with燃烧火焰和飘动的余烬'
    },
    'ice': {
      adjectives: ['frozen', 'crystalline', 'frost-covered', 'glacial'],
      materials: ['ice', 'frost', 'crystal'],
      effects: ['ice crystals', 'frost particles', 'reflective frost', 'snowflakes'],
      background: 'frozen winter scene with冰晶和霜冻'
    },
    'ocean-wave': {
      adjectives: ['oceanic', 'sea-sprayed', 'tidal', 'aquatic'],
      materials: ['water', 'seafoam', 'salt water'],
      effects: ['water splashes', 'seafoam', 'reflections', 'underwater caustics'],
      background: 'vast ocean with波光粼粼的海面'
    },
    'cloud-sky': {
      adjectives: ['ethereal', 'fluffy', 'dreamy', 'wispy'],
      materials: ['cloud', 'vapor', 'mist'],
      effects: ['soft clouds', 'light rays', 'vapor trails', 'mist'],
      background: 'dreamy sky with飘逸的云朵'
    },
    'molten-lava': {
      adjectives: ['molten', 'scorching', 'volcanic', 'igneous'],
      materials: ['lava', 'magma', 'molten rock'],
      effects: ['lava flows', 'cracks', 'glowing veins', 'heat glow'],
      background: 'volcanic landscape with流动的熔岩'
    },
    'glacier-ice': {
      adjectives: ['arctic', 'pristine', 'glacial', 'frozen'],
      materials: ['ice', 'frozen water', 'glacier'],
      effects: ['ice shards', 'frozen crystals', 'fog', 'reflection'],
      background: 'arctic glacier scene with巨大的冰块'
    },
    'lightning': {
      adjectives: ['electric', 'crackling', 'thunderous', 'electrified'],
      materials: ['energy', 'plasma', 'electricity'],
      effects: ['lightning bolts', 'electric arcs', 'plasma', 'static'],
      background: 'stormy atmosphere with闪电撕裂天空'
    },
    'neon-glass': {
      adjectives: ['glowing', 'cyberpunk', 'neon-lit', 'luminous'],
      materials: ['glass', 'neon', 'light-emitting'],
      effects: ['neon glow', 'light streaks', 'reflections', 'color bloom'],
      background: 'neon-lit cyberpunk city with霓虹灯光'
    },
    'liquid-gold': {
      adjectives: ['golden', 'luxurious', 'metallic', 'wealthy'],
      materials: ['gold', 'liquid metal', 'bronze'],
      effects: ['golden reflections', 'liquid flow', 'shine', 'metallic sheen'],
      background: 'luxury setting with流淌的液态黄金'
    },
    'dark-smoke': {
      adjectives: ['mysterious', 'shadowy', 'enigmatic', 'dense'],
      materials: ['smoke', 'fog', 'dark vapor'],
      effects: ['smoke tendrils', 'dark mist', 'particles', 'shadow layers'],
      background: 'mysterious void with翻腾的黑暗烟雾'
    },
    'crystal': {
      adjectives: ['prismatic', 'faceted', 'brilliant', 'sparkling'],
      materials: ['crystal', 'gemstone', 'quartz'],
      effects: ['light refraction', 'rainbow sparkles', 'crystal facets', 'prismatic beams'],
      background: 'crystal cavern with折射的彩虹光芒'
    },
    'rusted-steel': {
      adjectives: ['weathered', 'aged', 'corroded', 'industrial'],
      materials: ['rusted metal', 'steel', 'oxidation'],
      effects: ['rust texture', 'patina', 'corrosion', 'metal scratches'],
      background: 'industrial ruin with锈蚀的金属'
    },
    'transformers': {
      adjectives: ['mechanical', 'robotic', 'metallic', 'futuristic'],
      materials: ['metal', 'chrome', 'machinery'],
      effects: ['mechanical details', 'metal shine', 'tech circuits', 'robotic elements'],
      background: 'sci-fi mech environment with机械细节'
    }
  };

  const lightingDescriptions = {
    'golden-hour': 'golden hour lighting with warm sunset tones, soft amber glow and long dramatic shadows',
    'stormy-dark': 'stormy dark atmosphere with dramatic clouds, electric ambience and intense mood',
    'dawn-light': 'soft dawn light with pastel colors, gentle warmth and ethereal atmosphere',
    'harsh-midday': 'harsh midday sun with strong white light, sharp defined shadows and high contrast',
    'moonlit-night': 'cool moonlit night with blue tones, soft silver light and mysterious shadows',
    'cinematic-key': 'dramatic cinematic key lighting with strong highlights, deep shadows and theatrical feel'
  };

  const cameraDescriptions = {
    'front-on': 'front-facing camera angle',
    'low-angle': 'low angle shot looking upward',
    '3/4-angle': 'three-quarter angle for dynamic composition',
    'aerial-tilt': 'aerial tilt overhead perspective',
    'extreme-close': 'extreme close-up for detailed view',
    'ultra-wide': 'ultra wide angle capturing expansive scene'
  };

  const aspectDescriptions = {
    '1:1': 'square format',
    '4:5': 'portrait format',
    '16:9': 'cinematic widescreen',
    '9:16': 'vertical social media format'
  };

  const boosterDescriptions = {
    '8k-render': '8K ultra high resolution, incredibly detailed and crisp',
    'photorealistic': 'photorealistic rendering with true-to-life textures and materials',
    'cinematic-dof': 'shallow depth of field with beautiful bokeh blur',
    'particle-fx': 'dynamic particle effects with floating debris and atmosphere',
    'subsurface-scattering': 'realistic subsurface scattering for organic light penetration',
    'volumetric-light': 'volumetric lighting creating god rays and atmospheric fog',
    'motion-blur': 'motion blur for dynamic movement and energy',
    'hdr-tone-mapping': 'high dynamic range with rich tonal detail',
    'film-grain': 'subtle film grain for cinematic texture and authenticity',
    'dramatic-shadows': 'deep dramatic shadows creating high contrast and mood'
  };

  const elementData = elementRules[element] || elementRules['fire'];
  const fontDesc = fontDescriptions[font] || 'bold 3D typography';
  const lightingDesc = lightingDescriptions[lighting] || lightingDescriptions['golden-hour'];
  const cameraDesc = cameraDescriptions[camera] || 'front-facing camera angle';
  const aspectDesc = aspectDescriptions[aspectRatio] || 'square format';

  let prompt = `A stunning 3D rendered text "${text.toUpperCase()}" featuring ${fontDesc},`;

  prompt += ` with ${elementData.adjectives.join(', ')} ${elementData.materials.join(', ')} material texture,`;

  prompt += ` surrounded by ${elementData.effects.join(', ')},`;

  prompt += ` set against ${elementData.background},`;

  prompt += ` illuminated by ${lightingDesc},`;

  prompt += ` captured from ${cameraDesc},`;

  prompt += ` rendered in ${aspectDesc}`;

  if (boosters && boosters.length > 0) {
    const boosterPhrases = boosters.map(b => boosterDescriptions[b]).filter(Boolean);
    if (boosterPhrases.length > 0) {
      prompt += `, ${boosterPhrases.join(', ')}`;
    }
  }

  prompt += ', no people in frame, text is the main subject, ultra detailed, cinematic composition, professional product photography, high quality masterpiece';

  return prompt;
}