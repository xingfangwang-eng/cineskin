// Calculator logic for different profile styles

interface CalculatorResult {
  efficiencyIncrease: number;
  moneySaved: number;
  styleSpecificScore: number;
  styleSpecificMetric: string;
  recommendation: string;
}

// Style-specific metrics and weights
const styleMetrics = {
  'wes anderson': {
    metric: 'Symmetry Score',
    weight: 0.3,
    description: 'Wes Anderson-inspired symmetrical composition and pastel color harmony'
  },
  'dark academia': {
    metric: 'Elegance Quotient',
    weight: 0.35,
    description: 'Dark Academia-inspired moody lighting and scholarly aesthetic'
  },
  'letterboxd': {
    metric: 'Cinephile Score',
    weight: 0.25,
    description: 'Letterboxd-inspired curated film collection presentation'
  },
  'fix': {
    metric: 'Cohesion Index',
    weight: 0.3,
    description: 'Color-coordinated profile harmony and visual balance'
  },
  'custom': {
    metric: 'Originality Score',
    weight: 0.4,
    description: 'Unique custom design elements and personalization'
  },
  'why': {
    metric: 'Clarity Rating',
    weight: 0.35,
    description: 'High-resolution clarity and visual sharpness'
  },
  'best': {
    metric: 'Color Harmony Score',
    weight: 0.3,
    description: 'Optimal color combinations and visual appeal'
  },
  'lore': {
    metric: 'Narrative Depth',
    weight: 0.35,
    description: 'Storytelling elements and profile narrative coherence'
  },
  'how': {
    metric: 'Dynamic Score',
    weight: 0.3,
    description: 'Animated elements and dynamic visual effects'
  },
  'trakt': {
    metric: 'Data Visualization Score',
    weight: 0.25,
    description: 'Balanced data display and visual aesthetics'
  }
};

// Calculate base ROI
const calculateBaseROI = (followers: number, hoursPerDay: number, hasCustomBackground: boolean): {
  efficiencyIncrease: number;
  moneySaved: number;
} => {
  // Base calculation
  const baseEfficiency = 100;
  const followerMultiplier = Math.min(followers / 1000, 5); // Cap at 5x for very large followings
  const timeMultiplier = 1 + (hoursPerDay / 10);
  const backgroundMultiplier = hasCustomBackground ? 1.2 : 1;
  
  const calculatedEfficiency = baseEfficiency * 2.4 * followerMultiplier * timeMultiplier * backgroundMultiplier;
  const calculatedMoneySaved = 49 - 19.9; // $29.1 saved
  
  return {
    efficiencyIncrease: Math.round(calculatedEfficiency),
    moneySaved: calculatedMoneySaved
  };
};

// Get style-specific metric based on keyword
const getStyleSpecificMetric = (keyword: string) => {
  const lowerKeyword = keyword.toLowerCase();
  
  for (const [style, metric] of Object.entries(styleMetrics)) {
    if (lowerKeyword.includes(style)) {
      return metric;
    }
  }
  
  // Default metric if no specific style is found
  return {
    metric: 'Aesthetic Score',
    weight: 0.25,
    description: 'Overall visual appeal and profile aesthetics'
  };
};

// Calculate style-specific score
const calculateStyleSpecificScore = (keyword: string, followers: number, hasCustomBackground: boolean): number => {
  const metric = getStyleSpecificMetric(keyword);
  const baseScore = 70;
  const followerBonus = Math.min(followers / 200, 20); // Max 20 points bonus
  const backgroundBonus = hasCustomBackground ? 10 : 0;
  
  return Math.min(baseScore + followerBonus + backgroundBonus, 100);
};

// Generate recommendation based on results
const generateRecommendation = (efficiencyIncrease: number, styleSpecificScore: number, styleMetric: string): string => {
  if (efficiencyIncrease > 300 && styleSpecificScore > 85) {
    return `Your profile is already performing exceptionally well! Consider our Pro+ tier for advanced ${styleMetric.toLowerCase()} optimization.`;
  } else if (efficiencyIncrease > 200 && styleSpecificScore > 75) {
    return `Great potential detected! Our AI-powered ${styleMetric.toLowerCase()} enhancement will take your profile to the next level.`;
  } else {
    return `Your profile has room for improvement. Start with our basic ${styleMetric.toLowerCase()} optimization to see immediate results.`;
  }
};

// Main calculator function
export const calculateROI = (keyword: string, followers: number, hoursPerDay: number, hasCustomBackground: boolean): CalculatorResult => {
  const { efficiencyIncrease, moneySaved } = calculateBaseROI(followers, hoursPerDay, hasCustomBackground);
  const styleMetric = getStyleSpecificMetric(keyword);
  const styleSpecificScore = calculateStyleSpecificScore(keyword, followers, hasCustomBackground);
  const recommendation = generateRecommendation(efficiencyIncrease, styleSpecificScore, styleMetric.metric);
  
  return {
    efficiencyIncrease,
    moneySaved,
    styleSpecificScore,
    styleSpecificMetric: styleMetric.metric,
    recommendation
  };
};

// Get style description for display
export const getStyleDescription = (keyword: string): string => {
  const metric = getStyleSpecificMetric(keyword);
  return metric.description;
};