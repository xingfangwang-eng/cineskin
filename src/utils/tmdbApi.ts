// TMDB API utility for fetching movie posters

const TMDB_API_KEY = process.env.TMDB_API_KEY || 'YOUR_TMDB_API_KEY'; // Use environment variable or placeholder
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Fallback placeholder posters
const fallbackPosters = [
  'https://picsum.photos/500/750?random=1',
  'https://picsum.photos/500/750?random=2',
  'https://picsum.photos/500/750?random=3',
  'https://picsum.photos/500/750?random=4'
];

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface TMDBResponse {
  results: Movie[];
}

// Function to search for movies by term
export async function searchMovies(term: string): Promise<Movie[]> {
  try {
    // Skip TMDB API calls during production builds to avoid timeouts
    if (process.env.NODE_ENV === 'production') {
      return [];
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(term)}&page=1`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

// Function to get movie posters
export async function getMoviePosters(searchTerm: string, limit: number = 4): Promise<string[]> {
  try {
    const movies = await searchMovies(searchTerm);
    
    const posters = movies
      .filter(movie => movie.poster_path)
      .slice(0, limit)
      .map(movie => `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`);
    
    // Return fallback posters if no posters found
    if (posters.length === 0) {
      return fallbackPosters.slice(0, limit);
    }
    
    return posters;
  } catch (error) {
    console.error('Error getting movie posters:', error);
    // Return fallback posters on error
    return fallbackPosters.slice(0, limit);
  }
}

// Function to get CSS filter based on keyword
export function getCssFilter(keyword: string): string {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes('vhs')) {
    return 'blur(0.5px) contrast(1.2) saturate(1.5)';
  }
  if (lowerKeyword.includes('film noir') || lowerKeyword.includes('noir')) {
    return 'grayscale(100%) contrast(1.2)';
  }
  if (lowerKeyword.includes('wes anderson')) {
    return 'saturate(1.5) contrast(1.1)';
  }
  if (lowerKeyword.includes('horror')) {
    return 'brightness(0.8) contrast(1.3)';
  }
  if (lowerKeyword.includes('cyberpunk')) {
    return 'hue-rotate(15deg) saturate(1.5)';
  }
  if (lowerKeyword.includes('retro') || lowerKeyword.includes('90s')) {
    return 'sepia(0.5) contrast(1.2)';
  }
  if (lowerKeyword.includes('neon')) {
    return 'saturate(2) contrast(1.2)';
  }
  if (lowerKeyword.includes('minimalist')) {
    return 'brightness(1.1) contrast(0.9)';
  }
  if (lowerKeyword.includes('dark academia')) {
    return 'sepia(0.3) contrast(1.1) brightness(0.9)';
  }
  
  // Default filter
  return 'none';
}

// Get movie credits to find director
async function getMovieCredits(movieId: number): Promise<string> {
  try {
    // Skip TMDB API calls during production builds to avoid timeouts
    if (process.env.NODE_ENV === 'production') {
      return 'Unknown';
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    const director = data.crew.find((person: any) => person.job === 'Director');
    return director ? director.name : 'Unknown';
  } catch (error) {
    console.error('Error getting movie credits:', error);
    return 'Unknown';
  }
}

// Get style representative works with detailed information
export async function getStyleRepresentativeWorks(searchTerm: string, limit: number = 5): Promise<Array<{
  title: string;
  releaseYear: string;
  director: string;
  synopsis: string;
  posterUrl: string;
}>> {
  try {
    const movies = await searchMovies(searchTerm);
    
    const works = await Promise.all(
      movies.slice(0, limit).map(async (movie: Movie) => {
        const director = await getMovieCredits(movie.id);
        return {
          title: movie.title,
          releaseYear: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
          director,
          synopsis: movie.overview || 'No synopsis available',
          posterUrl: movie.poster_path 
            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` 
            : `https://picsum.photos/500/750?random=${movie.id}`
        };
      })
    );
    
    return works;
  } catch (error) {
    console.error('Error getting style representative works:', error);
    return [];
  }
}
