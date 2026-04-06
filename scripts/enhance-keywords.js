const fs = require('fs');
const path = require('path');

// Define color palettes for different aesthetics
const colorPalettes = {
  wesAnderson: ['#FFD700', '#FF6B6B', '#4ECDC4'],
  darkAcademia: ['#3E2723', '#5D4037', '#8D6E63'],
  cyberpunk: ['#00FFFF', '#FF00FF', '#000000'],
  ghibli: ['#87CEEB', '#98FB98', '#FFB6C1'],
  filmNoir: ['#000000', '#333333', '#FFFFFF'],
  horror: ['#FF0000', '#000000', '#333333'],
  minimalist: ['#FFFFFF', '#000000', '#CCCCCC'],
  neonNoir: ['#FF00FF', '#00FFFF', '#000000'],
  y2k: ['#FF00FF', '#00FFFF', '#FFFF00'],
  scorsese: ['#FF0000', '#000000', '#FFD700'],
  coppola: ['#8B4513', '#000000', '#FFD700'],
  lynch: ['#000000', '#333333', '#FF00FF'],
  villeneuve: ['#FFA500', '#000080', '#000000'],
  gerwig: ['#FFC0CB', '#FFFF00', '#FF69B4'],
  nolan: ['#4682B4', '#000000', '#FFFFFF'],
  aster: ['#FFFF00', '#000000', '#FF0000'],
  fincher: ['#228B22', '#000000', '#FFFFFF'],
  wongKarWai: ['#FF0000', '#00FF00', '#0000FF'],
  sofiaCoppola: ['#FFB6C1', '#DDA0DD', '#FF69B4'],
  frenchNewWave: ['#000000', '#FFFFFF', '#808080'],
  anime: ['#FF69B4', '#4169E1', '#32CD32'],
  retro: ['#FF4500', '#FFD700', '#008000'],
  western: ['#CD853F', '#8B4513', '#000000'],
  sciFi: ['#00FFFF', '#0000FF', '#000000'],
  comingOfAge: ['#FFA07A', '#87CEFA', '#98FB98'],
  indie: ['#FF6347', '#4682B4', '#32CD32'],
  musical: ['#FF69B4', '#4169E1', '#FFD700'],
  documentary: ['#808080', '#000000', '#FFFFFF']
};

// Define TMDB search terms for different aesthetics
const tmdbSearchTerms = {
  wesAnderson: 'Moonrise Kingdom',
  darkAcademia: 'Dead Poets Society',
  cyberpunk: 'Blade Runner 2049',
  ghibli: 'Spirited Away',
  filmNoir: 'Double Indemnity',
  horror: 'The Shining',
  minimalist: 'Her',
  neonNoir: 'Drive',
  y2k: 'The Matrix',
  scorsese: 'Goodfellas',
  coppola: 'The Godfather',
  lynch: 'Mulholland Drive',
  villeneuve: 'Dune',
  gerwig: 'Barbie',
  nolan: 'Interstellar',
  aster: 'Midsommar',
  fincher: 'Se7en',
  wongKarWai: 'In the Mood for Love',
  sofiaCoppola: 'Lost in Translation',
  frenchNewWave: 'Breathless',
  anime: 'Akira',
  retro: 'Pulp Fiction',
  western: 'No Country for Old Men',
  sciFi: '2001: A Space Odyssey',
  comingOfAge: 'Lady Bird',
  indie: 'Little Miss Sunshine',
  musical: 'La La Land',
  documentary: 'Planet Earth'
};

// Define user personas
const userPersonas = [
  'London-based Cinematographer',
  'New York Film Student',
  'Tokyo-based Anime Enthusiast',
  'Los Angeles Film Critic',
  'Parisian Cinephile',
  'Berlin Film Festival Programmer',
  'Sydney-based Film Director',
  'Toronto Film Festival Volunteer',
  'Vienna-based Film Historian',
  'Seoul K-Drama Fan',
  'Mexico City Film Blogger',
  'Cairo-based Film Journalist',
  'Mumbai Bollywood Fan',
  'Rio de Janeiro Film Buff',
  'Stockholm Arthouse Aficionado',
  'Bangkok Independent Film Lover',
  'Buenos Aires Film Society Member',
  'Istanbul Film Festival Goer',
  'Johannesburg Cinema Studies Student',
  'Singaporean Film Producer'
];

// Function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to get color palette based on keyword
function getColorPalette(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes('wes anderson')) return colorPalettes.wesAnderson;
  if (lowerKeyword.includes('dark academia')) return colorPalettes.darkAcademia;
  if (lowerKeyword.includes('cyberpunk') || lowerKeyword.includes('cyber')) return colorPalettes.cyberpunk;
  if (lowerKeyword.includes('ghibli') || lowerKeyword.includes('studio ghibli')) return colorPalettes.ghibli;
  if (lowerKeyword.includes('film noir') || lowerKeyword.includes('noir')) return colorPalettes.filmNoir;
  if (lowerKeyword.includes('horror')) return colorPalettes.horror;
  if (lowerKeyword.includes('minimalist')) return colorPalettes.minimalist;
  if (lowerKeyword.includes('neon')) return colorPalettes.neonNoir;
  if (lowerKeyword.includes('y2k')) return colorPalettes.y2k;
  if (lowerKeyword.includes('scorsese')) return colorPalettes.scorsese;
  if (lowerKeyword.includes('coppola')) return colorPalettes.coppola;
  if (lowerKeyword.includes('lynch') || lowerKeyword.includes('david lynch')) return colorPalettes.lynch;
  if (lowerKeyword.includes('villeneuve') || lowerKeyword.includes('denis villeneuve')) return colorPalettes.villeneuve;
  if (lowerKeyword.includes('gerwig') || lowerKeyword.includes('greta gerwig')) return colorPalettes.gerwig;
  if (lowerKeyword.includes('nolan') || lowerKeyword.includes('christopher nolan')) return colorPalettes.nolan;
  if (lowerKeyword.includes('aster') || lowerKeyword.includes('ari aster')) return colorPalettes.aster;
  if (lowerKeyword.includes('fincher') || lowerKeyword.includes('david fincher')) return colorPalettes.fincher;
  if (lowerKeyword.includes('wong kar wai')) return colorPalettes.wongKarWai;
  if (lowerKeyword.includes('sofia coppola')) return colorPalettes.sofiaCoppola;
  if (lowerKeyword.includes('french new wave') || lowerKeyword.includes('nouvelle vague')) return colorPalettes.frenchNewWave;
  if (lowerKeyword.includes('anime')) return colorPalettes.anime;
  if (lowerKeyword.includes('retro') || lowerKeyword.includes('90s')) return colorPalettes.retro;
  if (lowerKeyword.includes('western') || lowerKeyword.includes('neo western')) return colorPalettes.western;
  if (lowerKeyword.includes('sci-fi') || lowerKeyword.includes('science fiction')) return colorPalettes.sciFi;
  if (lowerKeyword.includes('coming of age')) return colorPalettes.comingOfAge;
  if (lowerKeyword.includes('indie')) return colorPalettes.indie;
  if (lowerKeyword.includes('musical')) return colorPalettes.musical;
  if (lowerKeyword.includes('documentary')) return colorPalettes.documentary;
  
  // Default palette if no match found
  return getRandomItem(Object.values(colorPalettes));
}

// Function to get TMDB search term based on keyword
function getTmdbSearchTerm(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes('wes anderson')) return tmdbSearchTerms.wesAnderson;
  if (lowerKeyword.includes('dark academia')) return tmdbSearchTerms.darkAcademia;
  if (lowerKeyword.includes('cyberpunk') || lowerKeyword.includes('cyber')) return tmdbSearchTerms.cyberpunk;
  if (lowerKeyword.includes('ghibli') || lowerKeyword.includes('studio ghibli')) return tmdbSearchTerms.ghibli;
  if (lowerKeyword.includes('film noir') || lowerKeyword.includes('noir')) return tmdbSearchTerms.filmNoir;
  if (lowerKeyword.includes('horror')) return tmdbSearchTerms.horror;
  if (lowerKeyword.includes('minimalist')) return tmdbSearchTerms.minimalist;
  if (lowerKeyword.includes('neon')) return tmdbSearchTerms.neonNoir;
  if (lowerKeyword.includes('y2k')) return tmdbSearchTerms.y2k;
  if (lowerKeyword.includes('scorsese')) return tmdbSearchTerms.scorsese;
  if (lowerKeyword.includes('coppola')) return tmdbSearchTerms.coppola;
  if (lowerKeyword.includes('lynch') || lowerKeyword.includes('david lynch')) return tmdbSearchTerms.lynch;
  if (lowerKeyword.includes('villeneuve') || lowerKeyword.includes('denis villeneuve')) return tmdbSearchTerms.villeneuve;
  if (lowerKeyword.includes('gerwig') || lowerKeyword.includes('greta gerwig')) return tmdbSearchTerms.gerwig;
  if (lowerKeyword.includes('nolan') || lowerKeyword.includes('christopher nolan')) return tmdbSearchTerms.nolan;
  if (lowerKeyword.includes('aster') || lowerKeyword.includes('ari aster')) return tmdbSearchTerms.aster;
  if (lowerKeyword.includes('fincher') || lowerKeyword.includes('david fincher')) return tmdbSearchTerms.fincher;
  if (lowerKeyword.includes('wong kar wai')) return tmdbSearchTerms.wongKarWai;
  if (lowerKeyword.includes('sofia coppola')) return tmdbSearchTerms.sofiaCoppola;
  if (lowerKeyword.includes('french new wave') || lowerKeyword.includes('nouvelle vague')) return tmdbSearchTerms.frenchNewWave;
  if (lowerKeyword.includes('anime')) return tmdbSearchTerms.anime;
  if (lowerKeyword.includes('retro') || lowerKeyword.includes('90s')) return tmdbSearchTerms.retro;
  if (lowerKeyword.includes('western') || lowerKeyword.includes('neo western')) return tmdbSearchTerms.western;
  if (lowerKeyword.includes('sci-fi') || lowerKeyword.includes('science fiction')) return tmdbSearchTerms.sciFi;
  if (lowerKeyword.includes('coming of age')) return tmdbSearchTerms.comingOfAge;
  if (lowerKeyword.includes('indie')) return tmdbSearchTerms.indie;
  if (lowerKeyword.includes('musical')) return tmdbSearchTerms.musical;
  if (lowerKeyword.includes('documentary')) return tmdbSearchTerms.documentary;
  
  // Default search term if no match found
  return getRandomItem(Object.values(tmdbSearchTerms));
}

// Read the existing keywords.json file
const keywordsPath = path.join(__dirname, '..', 'data', 'keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

// Enhance each keyword with new fields
const enhancedKeywords = keywords.map(keyword => {
  return {
    ...keyword,
    vibe_colors: getColorPalette(keyword.keyword),
    tmdb_search_term: getTmdbSearchTerm(keyword.keyword),
    user_persona: getRandomItem(userPersonas),
    layout_type: Math.floor(Math.random() * 3) + 1 // Random integer between 1-3
  };
});

// Write the enhanced keywords back to the file
fs.writeFileSync(keywordsPath, JSON.stringify(enhancedKeywords, null, 2));

console.log('Enhanced keywords.json with new fields!');
console.log(`Total keywords enhanced: ${enhancedKeywords.length}`);
