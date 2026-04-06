import React from 'react';

interface LayoutBrutalistProps {
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

export const LayoutBrutalist: React.FC<LayoutBrutalistProps> = ({ keyword, moviePosters, cssFilter }) => {
  const { title, problem_description, how_to_solve, vibe_colors, tmdb_search_term, user_persona } = keyword;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-8 border-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            {title}
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xl font-bold">{tmdb_search_term}</p>
            <div className="flex gap-4">
              <div className="w-8 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
              <div className="w-8 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
              <div className="w-8 h-8" style={{ backgroundColor: vibe_colors[2] }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Problem Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-black mb-8 uppercase">01. THE PROBLEM</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-xl leading-relaxed">
              {problem_description}
            </div>
            <div className="h-64 md:h-auto">
              <img 
                src={`https://source.unsplash.com/random/600x600/?${tmdb_search_term},blackandwhite`} 
                alt={tmdb_search_term} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-black mb-8 uppercase">02. THE SOLUTION</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 md:h-auto order-2 md:order-1">
              <img 
                src={`https://source.unsplash.com/random/600x600/?cinema,blackandwhite`} 
                alt="Cinema" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl leading-relaxed order-1 md:order-2">
              {how_to_solve}
            </div>
          </div>
        </section>

        {/* User Review */}
        <section className="mb-24 border-t-4 border-black pt-12">
          <h2 className="text-4xl font-black mb-8 uppercase">03. EXPERT OPINION</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 bg-black text-white flex items-center justify-center text-3xl font-black">
              {user_persona.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-2xl italic mb-4">
                "CineSkin has completely transformed my approach to profile aesthetics. It's raw, it's bold, and it works."
              </p>
              <p className="text-xl font-bold">— {user_persona}</p>
            </div>
          </div>
        </section>

        {/* Movie Posters */}
        <section className="mb-24 border-t-4 border-black pt-12">
          <h2 className="text-4xl font-black mb-8 uppercase">04. FEATURED FILMS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moviePosters.length > 0 ? (
              moviePosters.map((poster, index) => (
                <div key={index} className="border-4 border-black">
                  <img 
                    src={poster} 
                    alt={`Movie poster ${index + 1}`} 
                    className="w-full h-48 object-cover"
                    style={{ filter: cssFilter }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl">No movie posters found for "{tmdb_search_term}"</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white p-12 mb-24">
          <h2 className="text-4xl font-black mb-8 uppercase">GET STARTED</h2>
          <button className="px-12 py-4 text-2xl font-bold border-4 border-white hover:bg-white hover:text-black transition-colors active:scale-95">
            TRY CINESKIN
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-8 border-black py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl font-bold">© 2026 CINESKIN</p>
        </div>
      </footer>
    </div>
  );
};
