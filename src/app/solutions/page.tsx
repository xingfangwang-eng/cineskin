'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import keywords from '../../../data/keywords.json';
import Breadcrumb from '@/components/Breadcrumb';

// Define categories based on keyword analysis
const categorizeSolutions = (solutions: any[]) => {
  const categories = {
    'Film Aesthetics': [] as any[],
    'Platform Tools': [] as any[],
    'Visual Effects': [] as any[],
    'Profile Enhancement': [] as any[],
    'Content Creation': [] as any[]
  };

  solutions.forEach(solution => {
    const keyword = solution.keyword.toLowerCase();
    const title = solution.title.toLowerCase();
    
    if (keyword.includes('cinematic') || keyword.includes('film') || keyword.includes('movie') || keyword.includes('director') || keyword.includes('aesthetic')) {
      categories['Film Aesthetics'].push(solution);
    } else if (keyword.includes('letterboxd') || keyword.includes('imdb') || keyword.includes('platform') || keyword.includes('app')) {
      categories['Platform Tools'].push(solution);
    } else if (keyword.includes('effect') || keyword.includes('filter') || keyword.includes('vhs') || keyword.includes('neon') || keyword.includes('retro')) {
      categories['Visual Effects'].push(solution);
    } else if (keyword.includes('profile') || keyword.includes('banner') || keyword.includes('background') || keyword.includes('header')) {
      categories['Profile Enhancement'].push(solution);
    } else {
      categories['Content Creation'].push(solution);
    }
  });

  return categories;
};

// Generate JSON-LD schema
const generateJsonLd = (solutions: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CineSkin Solutions',
    description: 'A collection of 100 cinematic solutions for movie enthusiasts',
    itemListElement: solutions.map((solution, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: solution.title,
      description: solution.problem_description,
      url: `https://cineskin.com/solutions/${solution.slug}`
    }))
  };
};

const SolutionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<any>({});
  const [filteredSolutions, setFilteredSolutions] = useState<any[]>([]);

  // Initialize categories and filtered solutions
  useEffect(() => {
    const categorized = categorizeSolutions(keywords);
    setCategories(categorized);
    setFilteredSolutions(keywords);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSolutions(keywords);
    } else {
      const filtered = keywords.filter(solution => 
        solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solution.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solution.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSolutions(filtered);
    }
  }, [searchTerm]);



  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(keywords)) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
            CineSkin Solutions
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl">
            Explore 100 cinematic solutions to enhance your movie-watching experience and profile aesthetics.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Breadcrumb 
          items={[
            { label: 'Home', url: '/' },
            { label: 'Solutions', url: '/solutions', isActive: true }
          ]} 
        />
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Results */}
        {searchTerm.trim() !== '' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-4 h-8 mr-3 bg-blue-500"></div>
              Search Results ({filteredSolutions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((solution) => (
                <article key={solution.slug} className="bg-white border border-slate-200 p-8">
                  <Link href={`/solutions/${solution.slug}`} className="block">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {solution.problem_description.substring(0, 150)}...
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      View Solution
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        {searchTerm.trim() === '' && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
              <div className="w-4 h-8 mr-3 bg-blue-500"></div>
              Solution Categories
            </h2>
            <nav className="space-y-8">
              {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="bg-white border border-slate-200 mb-8">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900">{category}</h3>
                  </div>
                  <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(items as any[]).map((solution: any) => (
                      <article key={solution.slug} className="p-6 border border-slate-200">
                        <Link href={`/solutions/${solution.slug}`} className="block">
                          <h4 className="text-lg font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                            {solution.title}
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {solution.problem_description.substring(0, 120)}...
                          </p>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 mb-2">Support: 457239850@qq.com</p>
          <p className="text-slate-600">© 2026 CineSkin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SolutionsPage;
