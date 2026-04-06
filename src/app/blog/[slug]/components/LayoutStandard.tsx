import React from 'react';

interface LayoutStandardProps {
  keyword: {
    title: string;
    problem_description: string;
    how_to_solve: string;
    vibe_colors: string[];
    tmdb_search_term: string;
    user_persona: string;
  };
  moviePosters: string[];
  cssFilter: string;
}

export const LayoutStandard: React.FC<LayoutStandardProps> = ({ keyword, moviePosters, cssFilter }) => {
  const { title, problem_description, how_to_solve, vibe_colors, tmdb_search_term, user_persona } = keyword;

  return (
    <div style={{ backgroundColor: vibe_colors[0] }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{title}</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {problem_description.substring(0, 160)}...
          </p>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Text Content */}
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: vibe_colors[1] }}>
              The Problem
            </h2>
            <p className="mb-6 text-gray-700">{problem_description}</p>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: vibe_colors[1] }}>
              The Solution
            </h2>
            <p className="mb-6 text-gray-700">{how_to_solve}</p>
            
            <button 
              className="px-6 py-3 font-medium rounded-md transition-colors active:scale-95"
              style={{ backgroundColor: vibe_colors[1], color: 'white' }}
            >
              Try CineSkin
            </button>
          </div>

          {/* Image Content */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img 
              src={`https://source.unsplash.com/random/800x800/?${tmdb_search_term}`} 
              alt={tmdb_search_term} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="font-medium">Featured Film: {tmdb_search_term}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Posters */}
        <div className="bg-white p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: vibe_colors[1] }}>
            Featured Films
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moviePosters.length > 0 ? (
              moviePosters.map((poster, index) => (
                <div key={index} className="rounded-md overflow-hidden border border-gray-200">
                  <img 
                    src={poster} 
                    alt={`Movie poster ${index + 1}`} 
                    className="w-full h-48 object-cover transition-transform hover:scale-105"
                    style={{ filter: cssFilter }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No movie posters found for "{tmdb_search_term}"</p>
              </div>
            )}
          </div>
        </div>

        {/* User Review */}
        <div className="bg-white p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: vibe_colors[1] }}>
            User Review
          </h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: vibe_colors[2] }}>
              <span className="text-white font-bold">{user_persona.charAt(0)}</span>
            </div>
            <div>
              <p className="text-lg italic text-gray-700 mb-4">
                "I've been struggling with my profile aesthetic for months, but CineSkin completely changed the game. The solution was exactly what I needed. Now my profile truly reflects my cinematic taste and personality!"
              </p>
              <p className="font-medium text-gray-900">— {user_persona}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white/80">
          <p>© 2026 CineSkin. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
