const fs = require('fs');
const path = require('path');

// Read the keywords.json file
const keywordsPath = path.join(__dirname, 'data', 'keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

// Function to generate cinematic_context
function generateCinematicContext(keyword, tmdbSearchTerm) {
  const contexts = [
    `The ${keyword.split(' ')[0]} aesthetic emerged from the early 2000s digital revolution, where film enthusiasts began to experiment with profile customization as a form of self-expression. Influenced by ${tmdbSearchTerm}'s visual language, this style combines nostalgic elements with modern digital manipulation techniques. Its rise coincided with the proliferation of social media platforms like Letterboxd, where users sought to distinguish their profiles in an increasingly crowded space. Today, it represents a fusion of cinematic history and contemporary design sensibilities.`,
    `Originating from the underground film communities of the late 90s, the ${keyword.split(' ')[0]} aesthetic draws inspiration from ${tmdbSearchTerm}'s iconic visual motifs. Its development paralleled the rise of digital cinematography, as filmmakers began to experiment with color grading and visual effects that were previously inaccessible. This style found its perfect home on platforms like Letterboxd, where users could showcase their cinematic tastes through carefully curated profile visuals. It has since evolved into a recognized visual language within film enthusiast circles.`,
    `The ${keyword.split(' ')[0]} style traces its roots to the golden age of ${tmdbSearchTerm}-inspired filmmaking, where directors like Wes Anderson and Sofia Coppola popularized distinct visual signatures. As social media platforms became central to film discourse, users began adopting these cinematic aesthetics for their profiles. The style gained momentum in 2020-2021, as lockdowns prompted increased online film community engagement. Today, it represents a sophisticated form of digital self-presentation for cinephiles.`
  ];
  return contexts[Math.floor(Math.random() * contexts.length)];
}

// Function to generate design_theory
function generateDesignTheory(keyword, vibeColors) {
  const theories = [
    `The ${keyword.split(' ')[0]} aesthetic relies on a carefully calibrated color theory that balances emotional resonance with visual harmony. The chosen palette of ${vibeColors.join(', ')} creates a psychological impact that aligns with the thematic elements of ${keyword}. Warm tones evoke nostalgia and intimacy, while cooler hues suggest distance and contemplation. This color strategy is particularly effective in film profile headers, where the visual context must communicate the user's cinematic sensibilities at a glance. The contrast between these colors creates depth and visual interest, drawing the viewer's eye across the composition.`,
    `Design theory plays a crucial role in the ${keyword.split(' ')[0]} aesthetic, where color psychology is used to create specific emotional responses. The ${vibeColors.join(', ')} palette is selected to evoke the mood of classic films like ${keyword.split(' ')[0]} cinema, creating a sense of continuity between the user's profile and their cinematic tastes. Color temperature is carefully controlled to either warm up cold compositions or cool down overly vibrant ones, ensuring the header maintains visual balance. This approach transforms a simple collection of movie posters into a cohesive artistic statement that reflects the user's personality.`,
    `At the core of the ${keyword.split(' ')[0]} aesthetic is a sophisticated understanding of color theory. The ${vibeColors.join(', ')} palette is chosen for its ability to create visual hierarchy and emotional resonance. Complementary colors create dynamic tension, while analogous colors foster harmony. This strategic use of color ensures that the profile header remains visually engaging even when displaying multiple movie posters with conflicting visual styles. The result is a balanced composition that feels curated rather than chaotic, effectively communicating the user's cinematic identity.`
  ];
  return theories[Math.floor(Math.random() * theories.length)];
}

// Function to generate platform_limitations
function generatePlatformLimitations(keyword) {
  const limitations = [
    `Mainstream platforms like Letterboxd and IMDb impose significant technical limitations that frustrate cinephiles seeking to express their unique aesthetic sensibilities. Letterboxd's Patron tier, while offering background customization, forces users to rely on its Top 4 algorithm, which often creates clashing color palettes. IMDb's profile system remains stuck in a 2005-era design with zero customization options for standard users. These platforms prioritize functionality over visual expression, leaving users with generic, unpersonalized profiles that fail to reflect their cinematic identity. The lack of support for high-resolution images and custom layouts further limits creative expression.`,
    `The technical constraints of platforms like Letterboxd and IMDb create significant barriers for users seeking to create visually distinctive profiles. Letterboxd's background system, even for Patron members, restricts users to automatically generated collages from their Top 4 films, eliminating creative control. IMDb's profile headers remain static and uncustomizable, forcing users to display generic default images. Both platforms compress uploaded images heavily, reducing visual quality and detail. Additionally, the responsive design limitations mean that carefully composed headers often get cropped or distorted across different devices, further frustrating users' attempts to create cohesive visual identities.`,
    `Film social platforms like Letterboxd and IMDb present numerous technical limitations that hinder creative profile customization. Letterboxd's Patron-exclusive background feature still fails to address the core issue: users have no control over the visual composition, relying instead on an algorithm that often produces aesthetically inconsistent results. IMDb's profile system is essentially frozen in time, offering no meaningful customization options for standard users. Both platforms lack support for modern web features like animated headers, custom fonts, and advanced layout options. These limitations force users to seek external solutions to create profiles that truly reflect their cinematic tastes and personalities.`
  ];
  return limitations[Math.floor(Math.random() * limitations.length)];
}

// Function to generate step_by_step_long
function generateStepByStepLong(keyword) {
  const steps = [
    `Creating the perfect ${keyword.split(' ')[0]} aesthetic profile header requires a methodical approach. First, select 3-5 films that best represent your cinematic identity, focusing on those with strong visual coherence. Next, gather high-resolution horizontal stills or posters from these films, ensuring they match your desired aspect ratio (typically 16:9 for profile headers). Then, use a design tool to arrange these images in a composition that creates visual flow—consider using the rule of thirds to guide placement. Apply color grading to unify the palette, adjusting saturation and contrast to create a cohesive look. Add subtle text overlays or decorative elements if desired, but keep them minimal to avoid overwhelming the visual impact. Finally, optimize the image for web use, ensuring it maintains quality while meeting platform size requirements. Test the header across different devices to ensure it displays correctly before finalizing your profile.`,
    `To create a compelling ${keyword.split(' ')[0]} style profile header, start by curating a selection of films that embody your aesthetic vision. Choose movies with distinct visual styles that complement each other—consider factors like color palette, lighting, and composition. Next, source high-quality horizontal images from these films, preferring backdrops or wide shots that work well in header format. Then, arrange these images in a grid or collage format, paying attention to visual balance and flow. Use color correction to harmonize the different film stills, creating a unified palette. Add subtle visual effects like film grain or light leaks to enhance the cinematic quality. Finally, optimize the image for the specific platform's requirements, ensuring it loads quickly while maintaining visual impact. Test the header on both desktop and mobile devices to ensure it displays correctly across all viewports.`,
    `The process of creating an effective ${keyword.split(' ')[0]} aesthetic profile header begins with careful film selection. Choose 4-6 movies that not only represent your taste but also share visual similarities—consistent color schemes or lighting styles work best. Next, collect high-resolution horizontal stills from these films, focusing on frames that capture the essence of each movie. Then, arrange these images in a balanced composition, using techniques like the golden ratio to create visual harmony. Apply a unified color grade to tie the different elements together, adjusting tones to create a cohesive aesthetic. Add minimal text or decorative elements if they enhance the overall design, but avoid clutter. Finally, optimize the image for web use, compressing it appropriately while maintaining quality. Test the header on multiple devices to ensure it displays correctly and makes the desired visual impact.`
  ];
  return steps[Math.floor(Math.random() * steps.length)];
}

// Function to generate expert_tips
function generateExpertTips(keyword) {
  const tips = [
    `For creating an exceptional ${keyword.split(' ')[0]} aesthetic profile, consider these expert tips: 1) Focus on negative space—don't overcrowd your header with too many images. Negative space creates breathing room and draws attention to your selected films. 2) Experiment with layer blending modes to create unique visual effects that tie different movie stills together. Soft light or overlay modes can create subtle color interactions that enhance cohesion. 3) Pay attention to typography if adding text—choose fonts that complement your aesthetic, and ensure text contrast is sufficient for readability. Consider using cinema-inspired fonts that reflect the mood of your selected films.`,
    `To elevate your ${keyword.split(' ')[0]} style profile header, follow these expert techniques: 1) Use color theory to your advantage—select a dominant color from your favorite film and build your palette around it. This creates a unified look even with diverse movie stills. 2) Incorporate subtle visual motifs that tie your header together, such as film grain, light leaks, or consistent framing devices. These elements add cinematic texture and coherence. 3) Consider the platform's UI elements when designing—ensure your header complements rather than clashes with the site's navigation and profile information. Adjust your composition to account for where avatars and usernames will appear.`,
    `Take your ${keyword.split(' ')[0]} aesthetic to the next level with these advanced tips: 1) Create a visual narrative by arranging film stills in a sequence that tells a story about your cinematic tastes. This adds depth and interest to your profile. 2) Use selective focus techniques to draw attention to key elements within your header, creating visual hierarchy. This can be done through blur effects or strategic placement of brighter elements. 3) Experiment with aspect ratios—while most platforms have standard header sizes, creative cropping or intentional asymmetry can make your profile stand out. Just ensure important visual elements remain within the platform's safe zones.`
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

// Process each keyword
keywords.forEach((keywordObj, index) => {
  console.log(`Processing keyword ${index + 1}/100: ${keywordObj.keyword}`);
  
  // Generate long text anchors
  keywordObj.cinematic_context = generateCinematicContext(keywordObj.keyword, keywordObj.tmdb_search_term);
  keywordObj.design_theory = generateDesignTheory(keywordObj.keyword, keywordObj.vibe_colors);
  keywordObj.platform_limitations = generatePlatformLimitations(keywordObj.keyword);
  keywordObj.step_by_step_long = generateStepByStepLong(keywordObj.keyword);
  keywordObj.expert_tips = generateExpertTips(keywordObj.keyword);
});

// Write the updated data back to keywords.json
fs.writeFileSync(keywordsPath, JSON.stringify(keywords, null, 2));
console.log('✅ SEO data generation complete!');
console.log('📁 Updated keywords.json with long text anchors.');
