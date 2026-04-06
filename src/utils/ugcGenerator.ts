import keywords from '../../data/keywords.json';

// Comment templates for different styles
const commentTemplates = [
  "I've been trying to achieve the {style} aesthetic for months, and CineSkin finally made it possible! My profile looks exactly like I envisioned.",
  "The {style} template is a game-changer. I've received so many compliments on my profile since I started using it.",
  "As a huge fan of {style} cinema, I was thrilled to find a tool that helps me capture that vibe in my profile.",
  "CineSkin's {style} option is perfect for anyone who loves the look of {tmdb_search_term} films. Highly recommend!",
  "I've tried other profile customization tools, but none come close to the {style} results I get with CineSkin.",
  "The {style} aesthetic is exactly what I needed to make my profile stand out. Thank you, CineSkin!",
  "I've been a CineSkin user for a while, but the {style} update has taken my profile to the next level.",
  "If you're a fan of {style} movies, you need to try CineSkin. It's like having a professional designer for your profile.",
  "The {style} template perfectly captures the mood of my favorite films. I couldn't be happier with the results.",
  "CineSkin made it so easy to create a {style} themed profile. I love how it turned out!"
];

// Rating dimensions
const ratingDimensions = [
  { name: 'Aesthetic Score', min: 8.5, max: 10, format: 'number' },
  { name: 'Customizability', options: ['Low', 'Medium', 'High'], format: 'text' },
  { name: 'Ease of Use', min: 7.5, max: 10, format: 'number' },
  { name: 'Visual Impact', min: 8.0, max: 10, format: 'number' },
  { name: 'Compatibility', options: ['Limited', 'Good', 'Excellent'], format: 'text' },
  { name: 'Overall Rating', min: 8.0, max: 10, format: 'number' }
];

// Generate random comments based on keyword
export function generateComments(keyword: string, tmdbSearchTerm: string): string[] {
  const comments: string[] = [];
  const usedIndices = new Set<number>();
  
  // Generate 3 unique comments
  while (comments.length < 3) {
    const randomIndex = Math.floor(Math.random() * commentTemplates.length);
    
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      let comment = commentTemplates[randomIndex];
      
      // Replace placeholders
      comment = comment.replace(/\{style\}/g, keyword.split(' ')[0]);
      comment = comment.replace(/\{tmdb_search_term\}/g, tmdbSearchTerm);
      
      comments.push(comment);
    }
  }
  
  return comments;
}

// Generate dynamic ratings
export function generateRatings(): { name: string; value: string | number }[] {
  const selectedDimensions = [];
  const usedIndices = new Set<number>();
  
  // Select 3-4 random dimensions
  const numDimensions = Math.floor(Math.random() * 2) + 3;
  
  while (selectedDimensions.length < numDimensions) {
    const randomIndex = Math.floor(Math.random() * ratingDimensions.length);
    
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      const dimension = ratingDimensions[randomIndex];
      
      let value;
      if (dimension.format === 'number' && dimension.max !== undefined && dimension.min !== undefined) {
        value = (Math.random() * (dimension.max - dimension.min) + dimension.min).toFixed(1);
      } else {
        value = dimension.options ? dimension.options[Math.floor(Math.random() * dimension.options.length)] : 'N/A';
      }
      
      selectedDimensions.push({ name: dimension.name, value });
    }
  }
  
  return selectedDimensions;
}

// Generate related keyword recommendations
export function generateRelatedKeywords(currentSlug: string, limit: number = 3): { keyword: string; slug: string }[] {
  // Filter out the current keyword and get random related ones
  const relatedKeywords = keywords
    .filter(k => k.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
  
  return relatedKeywords.map(k => ({ keyword: k.keyword, slug: k.slug }));
}
