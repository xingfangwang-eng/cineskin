'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { assembleLongFormContent } from '@/utils/content-engine';
import { generateStructuredData } from '@/utils/structuredData';
import { getStyleRepresentativeWorks } from '@/utils/tmdbApi';

interface LayoutEditorialProps {
  keyword: {
    title: string;
    problem_description: string;
    how_to_solve: string;
    vibe_colors: string[];
    tmdb_search_term: string;
    user_persona: string;
    cinematic_context: string;
    design_theory: string;
    platform_limitations: string;
    step_by_step_long: string;
    expert_tips: string;
    slug: string;
  };
  moviePosters: string[];
  cssFilter: string;
  styleRepresentativeWorks: Array<{
    title: string;
    releaseYear: string;
    director: string;
    synopsis: string;
    posterUrl: string;
  }>;
  generatedContent: {
    title: string;
    painPoints: string[];
    faq: Array<{ question: string; answer: string }>;
  };
}

export const LayoutEditorial: React.FC<LayoutEditorialProps> = ({ 
  keyword, 
  moviePosters, 
  cssFilter, 
  styleRepresentativeWorks, 
  generatedContent 
}) => {
  const { 
    title, 
    problem_description, 
    how_to_solve, 
    vibe_colors, 
    tmdb_search_term, 
    user_persona,
    cinematic_context,
    design_theory,
    platform_limitations,
    step_by_step_long,
    expert_tips
  } = keyword;
  
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    problem: useRef<HTMLDivElement>(null),
    deepDive: useRef<HTMLDivElement>(null),
    works: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null)
  };
  
  // Generate long-form content
  const longFormContent = assembleLongFormContent({
    ...keyword,
    keyword: keyword.title
  });
  const contentParagraphs = longFormContent.split('\n\n');
  
  // Handle scroll events for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current && ref.current.offsetTop <= scrollPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Smooth scroll to section
  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div ref={sectionRefs.hero} className="relative h-screen">
        <img 
          src={`https://source.unsplash.com/random/1600x900/?${tmdb_search_term}`} 
          alt={tmdb_search_term} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 flex flex-col justify-center items-center text-center p-4">
          <div className="inline-block mb-6 px-4 py-1 border-2 border-white">
            <p className="text-white text-sm font-medium tracking-wider">CINESTYLE</p>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            {problem_description.substring(0, 160)}...
          </p>
          <button 
            className="px-8 py-3 font-medium rounded-none transition-colors active:scale-95"
            style={{ backgroundColor: vibe_colors[1], color: 'white' }}
            onClick={() => scrollToSection('problem')}
          >
            Discover More
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Sidebar with TOC */}
          <div className="md:col-span-3">
            <div className="sticky top-8">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-500">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {Object.entries(sectionRefs).map(([key, _]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`w-full text-left px-3 py-2 transition-colors ${activeSection === key 
                      ? `bg-gray-100 text-gray-900 font-medium` 
                      : `text-gray-600 hover:text-gray-900`}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </nav>
              
              {/* Color Palette */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-500">
                  Color Palette
                </h3>
                <div className="flex gap-2">
                  {vibe_colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            {/* Problem Section */}
            <section ref={sectionRefs.problem} className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: vibe_colors[1] }}>
                The Problem
              </h2>
              <p className="text-lg mb-6 text-gray-800 leading-relaxed">
                {problem_description}
              </p>
              {generatedContent.painPoints.map((point, index) => (
                <p key={index} className="text-lg mb-6 text-gray-800 leading-relaxed">
                  {point}
                </p>
              ))}
            </section>

            {/* Deep Dive Section */}
            <section ref={sectionRefs.deepDive} className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: vibe_colors[1] }}>
                Deep Dive
              </h2>
              
              {/* Design Theory Blockquote */}
              <blockquote className="mb-12 border-l-4 pl-6 py-4" style={{ borderColor: vibe_colors[0] }}>
                <p className="text-2xl italic text-gray-700 mb-4">
                  {design_theory}
                </p>
                <p className="text-sm text-gray-500">— Design Theory</p>
              </blockquote>
              
              {/* Long Form Content with Multimedia */}
              <div className="space-y-8">
                {contentParagraphs.map((paragraph, index) => {
                  const showMedia = (index + 1) % 3 === 0; // Show media every 3 paragraphs
                  
                  return (
                    <div key={index} className="space-y-4">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {paragraph}
                      </p>
                      
                      {showMedia && (
                        <div className="my-8">
                          {index % 2 === 0 ? (
                            // Movie Posters Wall
                            <div>
                              <h3 className="text-xl font-semibold mb-4 text-gray-900">Featured Films</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {moviePosters.length > 0 ? (
                                  moviePosters.map((poster, posterIndex) => (
                                    <div key={posterIndex} className="rounded-md overflow-hidden shadow-md">
                                      <img 
                                        src={poster} 
                                        alt={`Movie poster ${posterIndex + 1}`} 
                                        className="w-full h-48 object-cover transition-transform hover:scale-105"
                                        style={{ filter: cssFilter }}
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-full text-center py-8">
                                    <p className="text-gray-600">No movie posters found</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            // Color Scheme Display
                            <div>
                              <h3 className="text-xl font-semibold mb-4 text-gray-900">Color Scheme</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {vibe_colors.map((color, colorIndex) => (
                                  <div key={colorIndex} className="p-6 rounded-md" style={{ backgroundColor: color }}>
                                    <div className="text-white font-medium">{color}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Style Representative Works */}
            <section ref={sectionRefs.works} className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: vibe_colors[1] }}>
                Style Representative Works
              </h2>
              <div className="space-y-8">
                {styleRepresentativeWorks.length > 0 ? (
                  styleRepresentativeWorks.map((work, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-md">
                      <div className="md:w-1/4">
                        <img 
                          src={work.posterUrl} 
                          alt={work.title} 
                          className="w-full h-64 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{work.title}</h3>
                          <span className="text-gray-500">({work.releaseYear})</span>
                        </div>
                        <p className="text-gray-600 mb-3">Directed by: <span className="font-medium">{work.director}</span></p>
                        <p className="text-gray-700 leading-relaxed">{work.synopsis}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No representative works found for "{tmdb_search_term}"</p>
                  </div>
                )}
              </div>
            </section>

            {/* Solution Section */}
            <section ref={sectionRefs.solution} className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: vibe_colors[1] }}>
                The Solution
              </h2>
              <p className="text-lg mb-8 text-gray-800 leading-relaxed">
                {how_to_solve}
              </p>
              
              <div className="bg-gray-50 p-8 rounded-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Expert Tips</h3>
                <p className="text-gray-700 leading-relaxed">{expert_tips}</p>
              </div>
            </section>

            {/* FAQ Section */}
            <section ref={sectionRefs.faq} className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: vibe_colors[1] }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {generatedContent.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2026 CineSkin. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <button
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};
