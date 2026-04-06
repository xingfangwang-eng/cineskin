import React from 'react';
import Script from 'next/script';
import { LayoutStandard } from './components/LayoutStandard';
import { LayoutEditorial } from './components/LayoutEditorial';
import { LayoutBrutalist } from './components/LayoutBrutalist';
import { generateContentVariation } from '@/utils/contentGenerator';
import { getMoviePosters, getCssFilter, getStyleRepresentativeWorks } from '@/utils/tmdbApi';
import { generateStructuredData } from '@/utils/structuredData';

interface Keyword {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  vibe_colors: string[];
  tmdb_search_term: string;
  user_persona: string;
  layout_type: number;
  cinematic_context: string;
  design_theory: string;
  platform_limitations: string;
  step_by_step_long: string;
  expert_tips: string;
}

const keywords: Keyword[] = require('../../../../data/keywords.json');

export async function generateStaticParams() {
  return keywords.map((keyword) => ({
    slug: keyword.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const keyword = keywords.find((k) => k.slug === slug);

  if (!keyword) {
    return <div>Not found</div>;
  }

  // Generate content variation with slug as seed
  const generatedContent = generateContentVariation(keyword, slug);

  // Fetch movie posters from TMDB
  const moviePosters = await getMoviePosters(keyword.tmdb_search_term, 4);
  
  // Get CSS filter based on keyword
  const cssFilter = getCssFilter(keyword.keyword);
  
  // Get style representative works from TMDB
  const styleRepresentativeWorks = await getStyleRepresentativeWorks(keyword.tmdb_search_term, 5);

  const { layout_type } = keyword;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData({ keyword, faq: generatedContent.faq }) }}
      />
      
      {layout_type === 1 && <LayoutStandard keyword={{ ...keyword, title: generatedContent.title }} moviePosters={moviePosters} cssFilter={cssFilter} />}
      {layout_type === 2 && <LayoutEditorial 
        keyword={{ ...keyword, title: generatedContent.title }} 
        moviePosters={moviePosters} 
        cssFilter={cssFilter} 
        styleRepresentativeWorks={styleRepresentativeWorks}
        generatedContent={generatedContent}
      />}
      {layout_type === 3 && <LayoutBrutalist keyword={{ ...keyword, title: generatedContent.title }} moviePosters={moviePosters} cssFilter={cssFilter} />}
    </>
  );
}
