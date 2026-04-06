// Structured data generator for JSON-LD

interface KeywordData {
  keyword: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  tmdb_search_term: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  keyword: KeywordData;
  faq: FAQItem[];
}

export function generateStructuredData({ keyword, faq }: StructuredDataProps): string {
  const { keyword: keywordText, title, tmdb_search_term } = keyword;
  
  // Generate HowTo steps with keyword-specific wording
  const howToSteps = [
    {
      name: "Upload",
      text: `Upload your favorite movies, including ${tmdb_search_term}, to create a personalized banner that reflects your cinematic taste.`,
      url: "#upload"
    },
    {
      name: "Select",
      text: `Select the perfect style and layout that complements your ${keywordText} aesthetic.`,
      url: "#select"
    },
    {
      name: "Export",
      text: `Export your generated banner in the optimal size for your chosen platform.`,
      url: "#export"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "name": `CineSkin - ${keywordText} Generator`,
        "description": `A tool to generate custom movie profile banners for ${keywordText}`,
        "applicationCategory": "Productivity",
        "operatingSystem": "All",
        "url": `https://cineskin.com/${keywordText.replace(/\s+/g, '-').toLowerCase()}`,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "HowTo",
        "name": `How to create a ${keywordText} banner`,
        "description": `Step-by-step guide to creating a custom banner for ${keywordText}`,
        "step": howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          "name": step.name,
          "text": step.text,
          "url": step.url,
          "position": index + 1
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": faq.map((item, index) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return JSON.stringify(structuredData);
}
