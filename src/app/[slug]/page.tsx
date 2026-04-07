import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';
import { ArrowRight, Code, Terminal, CheckCircle2, Zap, Layers, Image as ImageIcon } from 'lucide-react';

// Read the keywords data
import keywords from '../../../data/keywords.json';
import { generateContentVariation } from '@/utils/contentGenerator';
import { getMoviePosters, getCssFilter, getStyleRepresentativeWorks } from '@/utils/tmdbApi';
import { generateStructuredData } from '@/utils/structuredData';
import { assembleLongFormContent } from '@/utils/content-engine';
import { generateComments, generateRatings, generateRelatedKeywords } from '@/utils/ugcGenerator';
import PricingHeroTable from './components/PricingHeroTable';
import ClientCalculatorWrapper from './components/ClientCalculatorWrapper';
import PlatformSpecTable from './components/PlatformSpecTable';
import BannerGeneratorButton from './components/BannerGeneratorButton';
import Breadcrumb from '@/components/Breadcrumb';

interface Props {
  params: {
    slug: string;
  };
}

// Generate random code snippets for different pages
const codeSnippets = {
  default: `// Basic usage example
const generateBanner = async (movieTitles) => {
  const response = await fetch('https://api.cineskin.com/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movies: movieTitles }),
  });
  
  const data = await response.json();
  return data.bannerUrl;
};

// Usage
generateBanner(['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'])
  .then(url => console.log('Banner generated:', url));`,
  css: `/* CineSkin Custom Styling */
.profile-header {
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('your-banner-url.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
  position: relative;
}

.profile-avatar {
  position: absolute;
  bottom: -50px;
  left: 20px;
  width: 100px;
  height: 100px;
  border: 4px solid #000;
  border-radius: 50%;
  background: #fff;
}`,
  javascript: `// CineSkin API Integration
class CineSkin {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.cineskin.com';
  }
  
  async createBanner(options) {
    const response = await fetch(this.baseUrl + '/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    
    return response.json();
  }
}

// Usage
const cineSkin = new CineSkin('your-api-key');
cineSkin.createBanner({ theme: 'dark-academia' });`,
  python: `# CineSkin Python SDK
import requests

class CineSkin:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.cineskin.com'
    
    def create_banner(self, options):
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        response = requests.post(
            f'{self.base_url}/create',
            headers=headers,
            json=options
        )
        return response.json()

# Usage
cs = CineSkin('your-api-key')
result = cs.create_banner({'theme': 'wes-anderson'})`
};

// Get random code snippet
const getRandomCodeSnippet = () => {
  const snippets = Object.values(codeSnippets);
  return snippets[Math.floor(Math.random() * snippets.length)];
};

// Get code language
const getCodeLanguage = (code: string) => {
  if (code.includes('import requests')) return 'python';
  if (code.includes('class CineSkin')) return 'javascript';
  if (code.includes('/* CineSkin')) return 'css';
  return 'javascript';
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const keyword = keywords.find(k => k.slug === slug);
  
  if (!keyword) {
    return {
      title: 'Page not found',
      description: 'The requested page could not be found.',
    };
  }
  
  return {
    title: keyword.title,
    description: keyword.how_to_solve.substring(0, 160),
    keywords: [keyword.keyword, 'CineSkin', 'movie profile', 'banner maker'],
    openGraph: {
      title: keyword.title,
      description: keyword.how_to_solve.substring(0, 160),
      type: 'website',
      url: `https://cineskin.com/${slug}`,
      images: [
        {
          url: `https://cineskin.com/api/og?title=${encodeURIComponent(keyword.title)}`,
          width: 1200,
          height: 630,
          alt: keyword.title,
        },
      ],
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const keyword = keywords.find(k => k.slug === slug);
  
  if (!keyword) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 my-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Page Not Found</h1>
          <p className="text-lg text-slate-600">The requested page could not be found.</p>
        </div>
      </div>
    );
  }
  
  const codeSnippet = getRandomCodeSnippet();
  const codeLanguage = getCodeLanguage(codeSnippet);
  
  // Generate content variation with slug as seed
  const generatedContent = generateContentVariation(keyword, slug);
  
  // Extract new fields
  const { vibe_colors, tmdb_search_term, user_persona, layout_type } = keyword;
  
  // Fetch movie posters from TMDB
  const moviePosters = await getMoviePosters(tmdb_search_term, 4);
  
  // Get style representative works from TMDB
  const styleRepresentativeWorks = await getStyleRepresentativeWorks(tmdb_search_term, 5);
  
  // Get CSS filter based on keyword
  const cssFilter = getCssFilter(keyword.keyword);
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData({ keyword, faq: generatedContent.faq }) }}
      />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">CineSkin</span>
            </div>

          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 my-12">
        <Breadcrumb 
          items={[
            { label: 'Home', url: '/' },
            { label: 'Solutions', url: '/solutions' },
            { label: generatedContent.title, url: `/${keyword.slug}`, isActive: true }
          ]} 
        />
        <div className={`grid gap-8 ${layout_type === 1 ? 'md:grid-cols-3' : layout_type === 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'}`}>
          {/* Left Column - Main Content */}
          <div className={`space-y-8 ${layout_type === 1 ? 'md:col-span-2' : layout_type === 2 ? 'md:col-span-3' : 'md:col-span-1'}`}>
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
              {generatedContent.title}
            </h1>
            
            {/* Preview Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
                <div className="flex items-center gap-2">
                  <ImageIcon size={24} />
                  Preview
                </div>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moviePosters.length > 0 ? (
                  moviePosters.map((poster, index) => (
                    <div key={index} className="rounded-md overflow-hidden border border-slate-200">
                      <img 
                        src={poster} 
                        alt={`Movie poster ${index + 1}`} 
                        className="w-full h-64 object-cover transition-transform hover:scale-105"
                        style={{ filter: cssFilter }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-slate-600">No movie posters found for "{tmdb_search_term}"</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-4">
                Posters for: <span className="font-medium">{tmdb_search_term}</span>
              </p>
            </section>
            
            {/* Problem Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
                The Problem
              </h2>
              <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                <p>{keyword.problem_description}</p>
                {generatedContent.painPoints.map((fragment, index) => (
                  <p key={index}>{fragment}</p>
                ))}
              </div>
            </section>
            
            {/* Deep Dive Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
                Deep Dive
              </h2>
              <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                {assembleLongFormContent(keyword).split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
            
            {/* Style Representative Works Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Style Representative Works
              </h2>
              <div className="space-y-6">
                {styleRepresentativeWorks.length > 0 ? (
                  styleRepresentativeWorks.map((work, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border border-slate-100 rounded-md">
                      <div className="md:w-1/4">
                        <img 
                          src={work.posterUrl} 
                          alt={work.title} 
                          className="w-full h-64 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{work.title}</h3>
                          <span className="text-slate-500">({work.releaseYear})</span>
                        </div>
                        <p className="text-slate-600 mb-3">Directed by: <span className="font-medium">{work.director}</span></p>
                        <p className="text-slate-700 leading-relaxed">{work.synopsis}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600">No representative works found for "{tmdb_search_term}"</p>
                  </div>
                )}
              </div>
            </section>
            
            {/* The Tool Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                The Tool
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our OneClickAPI makes it easy to generate custom movie profile banners in seconds. Simply enter your favorite movies (like {tmdb_search_term}) below and let our AI create a stunning, cohesive banner that perfectly represents your cinematic taste.
                </p>
                
                {/* OneClickAPI Input */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      className="w-full border border-slate-300 rounded-md p-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-transparent"
                      rows={4}
                      placeholder="Enter your favorite movies (one per line)\n\nExample:\n{tmdb_search_term}\nInception\nThe Matrix\nInterstellar"
                      defaultValue={`${tmdb_search_term}\nInception\nThe Matrix\nInterstellar`}
                    />
                  </div>
                  <BannerGeneratorButton backgroundColor={vibe_colors[1]} />
                </div>
              </div>
            </section>
            
            {/* The Guide Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[2] }}></div>
                The Guide
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {keyword.how_to_solve}
                  {' '}
                  Our platform is designed to be intuitive and user-friendly, even for those with no design experience. Here's how our process works:
                </p>
                
                {/* Steps */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center font-bold" style={{ backgroundColor: vibe_colors[2] }}>
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">Select Your Movies</h3>
                      <p className="text-slate-600">Choose the films that best represent your taste, like {tmdb_search_term}, or the aesthetic you're going for.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center font-bold" style={{ backgroundColor: vibe_colors[2] }}>
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">Choose Your Style</h3>
                      <p className="text-slate-600">Select from our curated templates or let our AI suggest the perfect style based on your movie choices.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center font-bold" style={{ backgroundColor: vibe_colors[2] }}>
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">Generate & Export</h3>
                      <p className="text-slate-600">Let our AI create your banner and download it in the perfect size for your chosen platform.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* User Review Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
                User Review
              </h2>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={`https://picsum.photos/200/200?random=${user_persona.length}`} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    "I've been struggling with my profile aesthetic for months, but CineSkin completely changed the game. The {keyword.keyword} solution was exactly what I needed. Now my profile truly reflects my cinematic taste and personality, and I've gotten so many compliments from fellow movie lovers!"
                  </p>
                  <p className="text-sm font-medium text-slate-500 mt-2">
                    — {user_persona}
                  </p>
                </div>
              </div>
            </section>
            
            {/* Explanatory Text Before Calculator and Table */}
            <section className="my-16 bg-slate-50 border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Why These Metrics Matter for Your Cinematic Brand
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                In today's digital landscape, your film profile is more than just a collection of movie ratings—it's your cinematic identity. The right aesthetic not only reflects your unique taste but also attracts like-minded cinephiles and industry professionals. Technical specifications like resolution and aspect ratio ensure your profile looks polished and professional across all devices, while aesthetic metrics like symmetry and color harmony create a cohesive visual narrative that resonates with your personal brand. By optimizing these elements, you transform your profile from a static list into a dynamic expression of your cinematic personality, opening doors to new connections and opportunities in the film community.
              </p>
            </section>
            
            {/* Pricing Comparison Table */}
            <PricingHeroTable keyword={keyword.keyword} />
            
            {/* Aesthetic ROI Calculator */}
            <ClientCalculatorWrapper keyword={keyword.keyword} />
            
            {/* Explanatory Text After Calculator and Table */}
            <section className="my-16 bg-slate-50 border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Analyzing Your Results & Next Steps
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                The metrics you've calculated provide valuable insights into your profile's potential. A high efficiency increase indicates how much more engaging your profile will become, while the style-specific score highlights areas where you can refine your aesthetic. Our AI-powered analysis takes into account not just technical specifications but also the emotional resonance of your profile's visual elements. To truly unlock your profile's potential, consider exploring our AI filters, which can automatically adjust your header's color palette, composition, and overall vibe to match your chosen cinematic style. These intelligent filters learn from your preferences and the latest design trends, ensuring your profile remains fresh and visually compelling.
              </p>
            </section>
            
            {/* FAQ Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {generatedContent.faq.map((item, index) => (
                  <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.question}</h3>
                    <p className="text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Comments Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[0] }}></div>
                Community Comments
              </h2>
              <div className="space-y-6">
                {generateComments(keyword.keyword, keyword.tmdb_search_term).map((comment, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={`https://picsum.photos/200/200?random=${index + 10}`} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-slate-600 leading-relaxed">{comment}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        — CineSkin User {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Style Ratings Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Style Ratings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generateRatings().map((rating, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-slate-100 rounded-md">
                    <span className="text-slate-600">{rating.name}</span>
                    <span className="font-semibold text-slate-900">
                      {typeof rating.value === 'string' ? rating.value : `${rating.value}/10`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Related Recommendations Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[2] }}></div>
                People also created
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generateRelatedKeywords(keyword.slug).map((related, index) => (
                  <a key={index} href={`/${related.slug}`} className="p-4 border border-slate-100 rounded-md hover:border-slate-300 transition-colors">
                    <h3 className="font-semibold text-slate-900 mb-2">{related.keyword}</h3>
                    <p className="text-sm text-slate-600">Create a similar style for your profile</p>
                  </a>
                ))}
              </div>
            </section>
            
            {/* Code Section */}
            <section className="bg-white border border-slate-200 p-8 rounded-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8" style={{ backgroundColor: vibe_colors[1] }}></div>
                Implementation Example
              </h2>
              <div className="relative">
                <div className="flex items-center justify-between" style={{ backgroundColor: vibe_colors[1], padding: '8px 16px', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}>
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-white" />
                    <span className="text-sm font-medium text-white">{codeLanguage}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <pre className="bg-slate-950 text-slate-300 p-4 rounded-b-md overflow-x-auto text-sm">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </section>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className={`space-y-8 ${layout_type === 1 ? 'md:col-span-1' : layout_type === 2 ? 'md:col-span-1' : 'md:col-span-1'}`}>
            {/* Sticky Sidebar */}
            <div className="sticky top-8 space-y-6">
              {/* Tool Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Try CineSkin Pro</h3>
                <p className="text-slate-600 mb-4">
                  Unlock all features and create unlimited banners for just $19.9/year.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Unlimited banner generation',
                    'Advanced customization options',
                    'GIF support',
                    'Watermark removal',
                    'High-resolution exports'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/" className="w-full bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors active:scale-95 flex items-center justify-center">
                  Get Pro Now
                </a>
              </div>
              

              
              {/* Related Articles */}
              <div className="bg-white border border-slate-200 p-6 rounded-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {keywords.slice(0, 3).map((related) => (
                    <a 
                      key={related.slug}
                      href={`/${related.slug}`}
                      className="block p-3 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="font-semibold text-slate-900 mb-1 line-clamp-2">{related.title}</h4>
                      <p className="text-sm text-slate-500 line-clamp-2">{related.how_to_solve.substring(0, 100)}...</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platform Specifications Table */}
        <PlatformSpecTable />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-slate-600 text-sm mb-2">Support: 457239850@qq.com</p>
              <p className="text-slate-600 text-sm">
                © {new Date().getFullYear()} CineSkin. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export async function generateStaticParams() {
  return keywords.map((keyword) => ({
    slug: keyword.slug,
  }));
}

export default Page;
