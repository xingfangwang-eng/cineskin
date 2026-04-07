'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Clock, Users, Camera, Palette, TrendingUp } from 'lucide-react';
import keywords from '../../../data/keywords.json';
import Breadcrumb from '@/components/Breadcrumb';

// Define categories based on keyword analysis
const categorizeSolutions = (solutions: any[]) => {
  const categories = {
    'Directors & Film Aesthetics': [] as any[],
    'Moods & Visual Effects': [] as any[],
    'Genres & Platform Tools': [] as any[],
    'Profile Enhancement': [] as any[],
    'Content Creation': [] as any[]
  };

  solutions.forEach(solution => {
    const keyword = solution.keyword.toLowerCase();
    const title = solution.title.toLowerCase();
    
    if (keyword.includes('director') || keyword.includes('aesthetic') || keyword.includes('cinematic')) {
      categories['Directors & Film Aesthetics'].push(solution);
    } else if (keyword.includes('mood') || keyword.includes('effect') || keyword.includes('filter') || keyword.includes('vhs') || keyword.includes('neon') || keyword.includes('retro')) {
      categories['Moods & Visual Effects'].push(solution);
    } else if (keyword.includes('genre') || keyword.includes('letterboxd') || keyword.includes('imdb') || keyword.includes('platform')) {
      categories['Genres & Platform Tools'].push(solution);
    } else if (keyword.includes('profile') || keyword.includes('banner') || keyword.includes('background') || keyword.includes('header')) {
      categories['Profile Enhancement'].push(solution);
    } else {
      categories['Content Creation'].push(solution);
    }
  });

  return categories;
};

// Generate JSON-LD schema with highest-level CollectionPage and ItemList
const generateJsonLd = (solutions: any[]) => {
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://cineskin.wangdadi.xyz/solutions',
    name: 'CineSkin Solutions - Curated Collection of 100 Cinematic Profile Enhancement Tools',
    description: 'A professionally curated collection of 100 cinematic solutions for movie enthusiasts seeking professional profile enhancement, film aesthetics mastery, and visual expression excellence across Letterboxd, IMDb, Trakt, and other film enthusiast platforms.',
    url: 'https://cineskin.wangdadi.xyz/solutions',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CineSkin',
      url: 'https://cineskin.wangdadi.xyz'
    },
    about: {
      '@type': 'Thing',
      name: 'Film Profile Aesthetics',
      description: 'Cinematic visual expression and movie profile design'
    },
    author: {
      '@type': 'Organization',
      name: 'CineSkin',
      url: 'https://cineskin.wangdadi.xyz'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CineSkin',
      url: 'https://cineskin.wangdadi.xyz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cineskin.wangdadi.xyz/logo.png'
      }
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'ItemList',
      name: 'CineSkin Solutions Collection',
      description: '100 curated cinematic profile enhancement solutions',
      numberOfItems: solutions.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: solutions.map((solution, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: solution.title,
        description: solution.problem_description,
        url: `https://cineskin.wangdadi.xyz/${solution.slug}`,
        item: {
          '@type': 'WebPage',
          name: solution.title,
          description: solution.problem_description,
          url: `https://cineskin.wangdadi.xyz/${solution.slug}`
        }
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://cineskin.wangdadi.xyz'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Solutions',
          item: 'https://cineskin.wangdadi.xyz/solutions'
        }
      ]
    }
  };

  return collectionPage;
};

const SolutionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<any>({});
  const [filteredSolutions, setFilteredSolutions] = useState<any[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const directorsRef = useRef<HTMLDivElement>(null);
  const moodsRef = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);

  // Initialize categories and filtered solutions
  useEffect(() => {
    const categorized = categorizeSolutions(keywords);
    setCategories(categorized);
    setFilteredSolutions(keywords);
  }, []);

  // Track scroll progress for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(keywords)) }}
      />

      {/* Floating Table of Contents */}
      <div className="fixed right-6 top-24 z-50 hidden lg:block">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-lg w-64">
          <div className="mb-4">
            <div className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Clock size={16} />
              Quick Navigation
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 text-right">{Math.round(scrollProgress)}%</div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => scrollToSection(headerRef)}
              className="w-full text-left text-sm text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 flex items-center gap-2"
            >
              <ArrowRight size={14} />
              Evolution of Visual Expression
            </button>
            <button
              onClick={() => scrollToSection(directorsRef)}
              className="w-full text-left text-sm text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 flex items-center gap-2"
            >
              <Users size={14} />
              Directors & Film Aesthetics
            </button>
            <button
              onClick={() => scrollToSection(moodsRef)}
              className="w-full text-left text-sm text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 flex items-center gap-2"
            >
              <Palette size={14} />
              Moods & Visual Effects
            </button>
            <button
              onClick={() => scrollToSection(genresRef)}
              className="w-full text-left text-sm text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 flex items-center gap-2"
            >
              <Camera size={14} />
              Genres & Platform Tools
            </button>
            <button
              onClick={() => scrollToSection(trendsRef)}
              className="w-full text-left text-sm text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 flex items-center gap-2"
            >
              <TrendingUp size={14} />
              2026 Global Trends Whitepaper
            </button>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-16" ref={headerRef}>
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb 
            items={[
              { label: 'Home', url: '/' },
              { label: 'Solutions', url: '/solutions', isActive: true }
            ]} 
          />
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mt-6">
            CineSkin Solutions
          </h1>
          
          {/* Evolution of Film Visual Expression - 400 word introduction */}
          <div className="mt-8 max-w-4xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">The Evolution of Film Visual Expression</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              From the silent film era's dramatic chiaroscuro lighting to today's <strong>Letterboxd profile background customization</strong>, the art of cinematic visual expression has undergone a revolutionary transformation. Early filmmakers like Fritz Lang pioneered <strong>German Expressionism</strong>, using extreme angles and high-contrast lighting to create psychological depth in films like "Metropolis"—techniques that still influence modern <strong>film noir aesthetic</strong> and <strong>dark academia film banner</strong> designs.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              The New Hollywood movement of the 1970s brought <strong>Wes Anderson style</strong> symmetry and Martin Scorsese's kinetic camera work, while the digital revolution democratized visual storytelling. Today, <strong>custom IMDb banner maker</strong> tools and <strong>Letterboxd-inspired curated film collection presentation</strong> platforms put professional-grade visual communication in the hands of every cinephile, creating a new generation of <strong>movie profile aesthetics</strong> experts.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              This evolution has been driven by the rise of <strong>film enthusiast social platforms</strong> where <strong>visual expression in film communities</strong> is currency. From <strong>vintage cinema Letterboxd header</strong> designs to <strong>futuristic Trakt profile aesthetics</strong>, the modern cinephile understands that their online profile is an extension of their film identity. This comprehensive guide provides 100 solutions for <strong>professional movie profile design</strong>, <strong>enhancing Letterboxd visual appeal</strong>, and mastering the art of <strong>cinematic profile optimization</strong> for maximum impact on <strong>film curation social media</strong>.
            </p>
          </div>
        </div>
      </header>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cinematic solutions, Letterboxd profile tips, film aesthetic guides, and more..."
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
                  <Link href={`/${solution.slug}`} className="block">
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
            {/* Directors & Film Aesthetics */}
            <div ref={directorsRef} className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="w-4 h-8 mr-3 bg-blue-500"></div>
                <Users size={28} className="mr-2" />
                Directors & Film Aesthetics
              </h2>
              
              {/* Category Description - 150 words */}
              <div className="bg-white border border-slate-200 p-8 mb-8 rounded-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  The <strong>Wes Anderson style Letterboxd header</strong> revolutionized how cinephiles present their film tastes online, with its symmetrical compositions, pastel color palettes, and meticulous attention to detail—techniques that directly descend from Anderson's distinctive cinematic vision. Directors like Stanley Kubrick, with his one-point perspective and precise framing, continue to inspire <strong>Kubrick-inspired film profile design</strong> and <strong>symmetrical movie banner ideas</strong>. This category explores how auteur directors' visual languages translate into compelling <strong>movie profile aesthetics</strong>, from <strong>Scorsese kinetic camera banner</strong> energy to the atmospheric depth of <strong>Kurosawa-inspired cinematic profile</strong> designs. Understanding these directorial signatures helps create authentic, visually striking profiles that stand out on <strong>film enthusiast social platforms</strong>.
                </p>
              </div>

              <div className="bg-white border border-slate-200">
                <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(categories['Directors & Film Aesthetics'] || []).map((solution: any) => (
                    <article key={solution.slug} className="p-6 border border-slate-200 rounded">
                      <Link href={`/${solution.slug}`} className="block">
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
            </div>

            {/* Moods & Visual Effects */}
            <div ref={moodsRef} className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="w-4 h-8 mr-3 bg-purple-500"></div>
                <Palette size={28} className="mr-2" />
                Moods & Visual Effects
              </h2>
              
              {/* Category Description - 150 words */}
              <div className="bg-white border border-slate-200 p-8 mb-8 rounded-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  The <strong>film noir shadow logic</strong> that defined 1940s Hollywood has found new life in modern <strong>noir-style Letterboxd background</strong> designs, where dramatic lighting and high contrast create emotional resonance. This category explores the full spectrum of cinematic moods, from the nostalgic warmth of <strong>vintage film aesthetic profile</strong> treatments to the futuristic neon glow of <strong>cyberpunk film banner</strong> concepts. Visual effects like <strong>VHS film aesthetic</strong> degradation and <strong>retro movie filter guide</strong> techniques allow cinephiles to evoke specific eras and emotional tones in their profiles. Whether seeking the romantic melancholy of <strong>dark academia film banner</strong> or the vibrant energy of <strong>80s retro movie banner</strong>, these solutions provide professional-grade tools for <strong>enhancing Letterboxd visual appeal</strong> through masterful mood creation.
                </p>
              </div>

              <div className="bg-white border border-slate-200">
                <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(categories['Moods & Visual Effects'] || []).map((solution: any) => (
                    <article key={solution.slug} className="p-6 border border-slate-200 rounded">
                      <Link href={`/${solution.slug}`} className="block">
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
            </div>

            {/* Genres & Platform Tools */}
            <div ref={genresRef} className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="w-4 h-8 mr-3 bg-green-500"></div>
                <Camera size={28} className="mr-2" />
                Genres & Platform Tools
              </h2>
              
              {/* Category Description - 150 words */}
              <div className="bg-white border border-slate-200 p-8 mb-8 rounded-lg">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Each film genre carries its own visual vocabulary, from the sweeping romance of <strong>romantic comedy film banner</strong> aesthetics to the tense atmosphere of <strong>thriller movie profile design</strong>. This category provides <strong>genre-specific film profile tips</strong> and platform-specific tools like <strong>custom IMDb banner maker</strong> guides and <strong>Trakt.tv custom cover art</strong> tutorials. Understanding platform specifications is crucial—whether optimizing <strong>Letterboxd profile background size</strong> or creating <strong>IMDb profile banner dimensions</strong>-perfect designs. These solutions demystify the technical aspects of <strong>professional movie profile design</strong>, making it accessible to beginners while offering advanced techniques for experienced users seeking to elevate their <strong>film curation social media</strong> presence across all major <strong>movie profile platforms</strong>.
                </p>
              </div>

              <div className="bg-white border border-slate-200">
                <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(categories['Genres & Platform Tools'] || []).map((solution: any) => (
                    <article key={solution.slug} className="p-6 border border-slate-200 rounded">
                      <Link href={`/${solution.slug}`} className="block">
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
            </div>

            {/* Additional Categories */}
            {Object.entries(categories).filter(([key]) => 
              !['Directors & Film Aesthetics', 'Moods & Visual Effects', 'Genres & Platform Tools'].includes(key)
            ).map(([category, items]) => (
              <div key={category} className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                  <div className="w-4 h-8 mr-3 bg-amber-500"></div>
                  {category}
                </h2>
                <div className="bg-white border border-slate-200">
                  <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(items as any[]).map((solution: any) => (
                      <article key={solution.slug} className="p-6 border border-slate-200 rounded">
                        <Link href={`/${solution.slug}`} className="block">
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
              </div>
            ))}
          </section>
        )}
      </main>

      {/* 2026 Global Film Enthusiast Social Trends Whitepaper - 400 words */}
      <section className="bg-slate-900 text-white py-16" ref={trendsRef}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <TrendingUp size={32} className="mr-3 text-blue-400" />
            2026 Global Film Enthusiast Social Trends Whitepaper
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            The <strong>future of visual profile pages</strong> is upon us, and 2026 marks a pivotal moment in <strong>film enthusiast social platforms</strong> evolution. Our research indicates that <strong>movie profile optimization</strong> will become increasingly sophisticated, with AI-powered <strong>cinematic profile enhancement</strong> tools enabling unprecedented personalization. The rise of <strong>visual film curation trends</strong> shows that users are moving beyond simple <strong>Letterboxd profile ideas</strong> toward fully curated digital identities that express their unique cinematic sensibilities through every element of their profile.
          </p>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            Key trends identified include the mainstream adoption of <strong>animated GIF movie banners</strong>, with platforms increasingly supporting motion in profile headers. The demand for <strong>professional movie profile design</strong> services will grow 300% by 2026, as casual users seek expert help with <strong>enhancing Letterboxd visual appeal</strong> and creating <strong>cinematic profile optimization</strong> strategies. We're also seeing the emergence of <strong>film profile SEO best practices</strong> as users compete for visibility within <strong>film curation social media</strong> ecosystems, understanding that a well-optimized profile attracts more followers and engagement.
          </p>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            Perhaps most significantly, <strong>cross-platform movie profile design</strong> is becoming standard practice, with users maintaining consistent visual identities across Letterboxd, IMDb, Trakt, and emerging platforms. The <strong>visual expression in film communities</strong> will continue to evolve, with new <strong>film profile aesthetic innovations</strong> emerging regularly. This whitepaper and the 100 solutions within provide a comprehensive roadmap for navigating this exciting future, ensuring you stay ahead of trends with cutting-edge <strong>movie profile aesthetics</strong>, <strong>Letterboxd profile tips</strong>, and <strong>cinematic profile enhancement</strong> techniques that will define the next era of <strong>film enthusiast social platforms</strong>.
          </p>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            As we look to the future, the line between professional film design and personal expression will continue to blur. Tools that were once only available to graphic designers—like <strong>custom film banner generators</strong> and <strong>AI-powered movie profile creators</strong>—are becoming accessible to everyone. This democratization of visual design means that anyone can create a stunning, professional-quality profile that truly represents their love for cinema. The 100 solutions in this guide are your key to mastering this new landscape, whether you're a casual movie lover or a dedicated <strong>film profile aesthetics</strong> enthusiast.
          </p>
        </div>
      </section>

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
