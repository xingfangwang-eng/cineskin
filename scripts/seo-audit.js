const fs = require('fs');
const path = require('path');

// Function to extract text from HTML
function extractTextFromHtml(html) {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

// Function to calculate word count
function getWordCount(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Function to calculate Jaccard similarity between two texts
function calculateSimilarity(text1, text2) {
  // Split texts into words and create sets
  const set1 = new Set(text1.split(/\s+/).filter(word => word.length > 0));
  const set2 = new Set(text2.split(/\s+/).filter(word => word.length > 0));
  
  // Calculate intersection
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  // Calculate union
  const union = new Set([...set1, ...set2]);
  
  // Return Jaccard similarity
  return union.size > 0 ? intersection.size / union.size : 0;
}

// Main audit function
async function runSeoAudit() {
  console.log('🔍 Running SEO audit...');
  
  // Path to the generated HTML files
  const buildPath = path.join(__dirname, '..', '.next', 'server', 'app', '[slug]');
  
  try {
    // Check if build directory exists
    if (!fs.existsSync(buildPath)) {
      console.error('❌ Build directory not found. Please run `next build` first.');
      process.exit(1);
    }
    
    // Get all HTML files
    const files = fs.readdirSync(buildPath).filter(file => file.endsWith('.html'));
    
    if (files.length === 0) {
      console.error('❌ No HTML files found in the build directory.');
      process.exit(1);
    }
    
    console.log(`📁 Found ${files.length} HTML files to audit.`);
    
    // Read and process each file
    const pageData = [];
    
    for (const file of files) {
      const filePath = path.join(buildPath, file);
      const html = fs.readFileSync(filePath, 'utf8');
      const text = extractTextFromHtml(html);
      const wordCount = getWordCount(text);
      
      pageData.push({
        slug: file.replace('.html', ''),
        wordCount,
        text
      });
    }
    
    // Check word counts
    console.log('📊 Checking word counts...');
    const lowWordCountPages = pageData.filter(page => page.wordCount < 800);
    
    if (lowWordCountPages.length > 0) {
      console.error('❌ Pages with word count < 800:');
      lowWordCountPages.forEach(page => {
        console.error(`  - ${page.slug}: ${page.wordCount} words`);
      });
    } else {
      console.log('✅ All pages have word count > 800.');
    }
    
    // Check content similarity
    console.log('📊 Checking content similarity...');
    const highSimilarityPairs = [];
    
    for (let i = 0; i < pageData.length; i++) {
      for (let j = i + 1; j < pageData.length; j++) {
        const similarity = calculateSimilarity(pageData[i].text, pageData[j].text);
        
        if (similarity > 0.4) {
          highSimilarityPairs.push({
            page1: pageData[i].slug,
            page2: pageData[j].slug,
            similarity: (similarity * 100).toFixed(2) + '%'
          });
        }
      }
    }
    
    if (highSimilarityPairs.length > 0) {
      console.error('❌ Pages with similarity > 40%:');
      highSimilarityPairs.forEach(pair => {
        console.error(`  - ${pair.page1} ↔ ${pair.page2}: ${pair.similarity}`);
      });
    } else {
      console.log('✅ All pages have similarity < 40%.');
    }
    
    // Determine overall status
    if (lowWordCountPages.length > 0 || highSimilarityPairs.length > 0) {
      console.error('\n❌ SEO audit failed. Please regenerate content variations.');
      process.exit(1);
    } else {
      console.log('\n✅ SEO audit passed! All pages meet the requirements.');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Error running SEO audit:', error);
    process.exit(1);
  }
}

// Run the audit
runSeoAudit();
