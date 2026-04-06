// Content generation utility for creating unique content variations

// Title templates
const titleTemplates = [
  'How to {title}',
  'The Best {title}',
  'Upgrade your {title}',
  'Stop using {title}',
  'Guide for {title}'
];

// Pain point semantic fragments
const painPointFragments = [
  [
    "Many movie enthusiasts spend hours trying to perfect their profile aesthetics, only to be limited by platform restrictions or lack of design skills.",
    "The frustration of not being able to express your cinematic personality fully can be disheartening, especially when you've curated a collection of films that truly represent your taste.",
    "Platforms often charge premium prices for basic customization features, leaving users with limited options that don't reflect their unique style."
  ],
  [
    "Creating a visually appealing movie profile can be time-consuming and requires design expertise that many users don't have.",
    "The default options provided by most platforms fail to capture the individuality of users' cinematic preferences.",
    "Many users resort to generic solutions that don't stand out or accurately represent their movie tastes."
  ],
  [
    "Finding the perfect profile aesthetic that matches your cinematic identity is a challenge many movie lovers face.",
    "Limited customization options on popular platforms leave users feeling constrained and unable to fully express themselves.",
    "The process of creating a cohesive and visually striking profile often requires specialized tools and knowledge."
  ]
];

// FAQ library
const faqLibrary = [
  {
    question: "How long does it take to generate a banner?",
    answer: "Our AI-powered system generates banners in seconds, so you can have a professional-looking profile in no time."
  },
  {
    question: "Can I use my own images?",
    answer: "Yes, you can upload your own images to incorporate into your banner design for a more personalized touch."
  },
  {
    question: "Is there a limit to how many banners I can create?",
    answer: "With our free plan, you can create up to 5 banners. For unlimited access, consider upgrading to our Pro plan."
  },
  {
    question: "What platforms does CineSkin support?",
    answer: "CineSkin supports all major movie platforms including Letterboxd, IMDb, Trakt, and more."
  },
  {
    question: "Can I customize the size of my banner?",
    answer: "Absolutely! You can select from preset sizes for different platforms or specify custom dimensions."
  },
  {
    question: "Is my data secure?",
    answer: "We take data security seriously. Your images and preferences are stored securely and never shared with third parties."
  },
  {
    question: "Can I edit my banner after generating it?",
    answer: "Yes, you can make adjustments to your banner even after it's been generated to ensure it's perfect."
  },
  {
    question: "What file formats are supported?",
    answer: "We support all major image formats including JPG, PNG, and GIF for animated banners."
  },
  {
    question: "Do I need design experience to use CineSkin?",
    answer: "No design experience is needed! Our platform is designed to be user-friendly and intuitive for everyone."
  },
  {
    question: "Can I share my banners directly to social media?",
    answer: "Yes, you can easily share your generated banners to social media platforms with just a few clicks."
  },
  {
    question: "How often are new templates added?",
    answer: "We regularly update our template library with new designs and styles to keep your options fresh."
  },
  {
    question: "Can I use CineSkin for commercial purposes?",
    answer: "Yes, with our Pro plan, you can use your generated banners for commercial purposes without attribution."
  },
  {
    question: "Is there a mobile app available?",
    answer: "We're currently working on a mobile app, but for now, you can access CineSkin through any mobile browser."
  },
  {
    question: "How do I get support if I have issues?",
    answer: "Our support team is available 24/7 to help with any issues or questions you might have."
  },
  {
    question: "Can I save my designs for later?",
    answer: "Yes, with a free account, you can save up to 10 designs for future reference or editing."
  },
  {
    question: "What resolution are the generated banners?",
    answer: "All banners are generated in high resolution (at least 1920x1080) for crisp, clear results."
  },
  {
    question: "Can I use multiple movies in a single banner?",
    answer: "Absolutely! Our platform allows you to combine multiple movies into a single cohesive banner design."
  },
  {
    question: "Is there a way to see examples of what CineSkin can create?",
    answer: "Yes, visit our showcase page to see examples of banners created by our community."
  },
  {
    question: "How does the AI generate banners?",
    answer: "Our AI analyzes your movie choices and creates a visually cohesive design that captures the essence of your cinematic taste."
  },
  {
    question: "Can I use CineSkin offline?",
    answer: "CineSkin requires an internet connection to generate banners, but once created, you can download and use them offline."
  }
];

// Seed-based random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    // Hash the seed string to a number
    this.seed = seed.split('').reduce((acc, char) => {
      return acc * 31 + char.charCodeAt(0);
    }, 0);
  }

  // Generate a random number between 0 and 1
  random(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Generate a random integer between min (inclusive) and max (exclusive)
  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min) + min);
  }
}

// Helper function to shuffle an array with a seed
function shuffleArray<T>(array: T[], seed: string): T[] {
  const rng = new SeededRandom(seed);
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng.randomInt(0, i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to select random items from an array with a seed
function selectRandomItems<T>(array: T[], count: number, seed: string): T[] {
  const shuffled = shuffleArray(array, seed);
  return shuffled.slice(0, count);
}

// Main content generation function
interface KeywordData {
  keyword: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  vibe_colors: string[];
  tmdb_search_term: string;
  user_persona: string;
  layout_type: number;
}

interface GeneratedContent {
  title: string;
  painPoints: string[];
  faq: typeof faqLibrary;
}

export function generateContentVariation(data: KeywordData, seed: string): GeneratedContent {
  const rng = new SeededRandom(seed);
  
  // Generate title variation
  const randomTemplate = titleTemplates[rng.randomInt(0, titleTemplates.length)];
  const generatedTitle = randomTemplate.replace('{title}', data.title.replace(/^(How to|The Best|Upgrade your|Stop using|Guide for)\s+/, ''));

  // Shuffle pain point fragments
  const allFragments = painPointFragments.flat();
  const shuffledFragments = shuffleArray(allFragments, seed);

  // Select 3 random FAQs
  const selectedFaq = selectRandomItems(faqLibrary, 3, seed);

  return {
    title: generatedTitle,
    painPoints: shuffledFragments,
    faq: selectedFaq
  };
}
