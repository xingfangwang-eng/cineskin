

// Adjectives and connectives library
const modifiers = [
  "In the realm of cinematic aesthetics,",
  "Furthermore,",
  "Interestingly,",
  "From a design perspective,",
  "Notably,",
  "In today's digital landscape,",
  "Importantly,",
  "From a technical standpoint,",
  "Curiously,",
  "In the context of film culture,",
  "Moreover,",
  "Significantly,",
  "From an artistic viewpoint,",
  "Fascinatingly,",
  "In the world of movie enthusiasts,"
];

// Generic movie aesthetics library for content filling
const genericAestheticsLibrary = [
  "Color grading plays a crucial role in cinematic storytelling, allowing filmmakers to establish mood and tone through subtle shifts in hue and saturation. The right color palette can transport viewers to different emotional states, from the warm nostalgia of golden hour lighting to the cold detachment of blue-tinted scenes. This same principle applies to profile aesthetics, where a carefully chosen color scheme can communicate a user's cinematic preferences at a glance.",
  "Composition is another fundamental aspect of visual storytelling, with the rule of thirds and golden ratio guiding filmmakers to create balanced, visually pleasing frames. These same principles can be applied to profile headers, where the arrangement of movie posters and other visual elements can create a sense of harmony and intentionality. A well-composed header draws the eye across the image, highlighting the user's favorite films in a cohesive manner.",
  "Typography is often overlooked in visual design, but it plays a significant role in establishing brand identity and mood. In film, title sequences use typography to set the tone for the entire movie, from the bold, iconic fonts of blockbusters to the subtle, elegant scripts of period dramas. Similarly, profile headers can benefit from thoughtful typography choices that complement the overall aesthetic and enhance readability.",
  "Texture and grain add depth and character to film, with many directors intentionally using film grain or digital noise to create a specific atmosphere. This same principle applies to profile aesthetics, where subtle textures can add warmth and personality to an otherwise clean digital space. Whether it's the nostalgic grain of vintage films or the sleek smoothness of modern digital cinematography, texture can significantly impact the overall feel of a profile.",
  "Lighting is perhaps the most fundamental element of cinematography, with different lighting techniques creating vastly different emotional responses. From the harsh shadows of film noir to the soft, diffused light of romantic dramas, lighting sets the mood and guides the viewer's attention. Profile headers that incorporate these lighting principles can create a more immersive and emotionally resonant visual experience for visitors.",
  "Visual hierarchy is essential in both filmmaking and design, guiding the viewer's attention to the most important elements. In film, this is achieved through framing, lighting, and composition. In profile design, visual hierarchy ensures that the most important information—such as the user's favorite films or personal brand—stands out. A well-designed header establishes a clear visual hierarchy that makes the profile easy to navigate and visually engaging.",
  "Consistency is key to creating a cohesive visual identity, both in film and in profile design. Filmmakers maintain consistency through color palettes, lighting schemes, and visual motifs. Similarly, profile headers that maintain visual consistency across elements create a more polished and professional appearance. This consistency helps communicate the user's cinematic identity more effectively and makes the profile more memorable.",
  "Contrast is a powerful tool in visual design, creating visual interest and drawing attention to key elements. In film, contrast is used to highlight important moments or create dramatic tension. In profile headers, contrast can be used to make certain films stand out or to create a dynamic visual experience. Whether it's through color contrast, size contrast, or tonal contrast, this principle can significantly enhance the visual impact of a profile.",
  "Narrative is at the heart of filmmaking, and even non-narrative elements like profile headers can tell a story. A well-curated header can communicate the user's cinematic journey, from favorite genres to evolving tastes. By thoughtfully selecting and arranging visual elements, users can create a narrative that reflects their unique relationship with film and invites others to engage with their cinematic identity.",
  "Authenticity is increasingly valued in digital spaces, and profile aesthetics are no exception. While trends come and go, profiles that reflect genuine cinematic tastes and personal style tend to resonate more with viewers. Authenticity in profile design means selecting films and visual elements that truly represent the user's cinematic identity, rather than simply following current trends or aesthetics.",
  "The evolution of digital technology has transformed how we engage with film and express our cinematic identities. From high-resolution digital cameras to advanced editing software, filmmakers now have more tools than ever to create visually stunning works. Similarly, profile creators now have access to sophisticated design tools that allow them to craft headers that accurately reflect their cinematic tastes and personalities.",
  "Community is a vital aspect of film culture, and profile aesthetics play a role in fostering these connections. A well-designed profile can serve as a conversation starter, inviting others with similar cinematic tastes to engage and connect. By creating a visually distinctive profile, users can signal their membership in specific film communities and attract like-minded cinephiles.",
  "Accessibility is an important consideration in both filmmaking and profile design. Filmmakers strive to create works that are accessible to diverse audiences, while profile creators should ensure their headers are visually clear and easy to navigate. This includes considerations like text legibility, color contrast for visually impaired users, and overall visual clarity that doesn't overwhelm or confuse visitors.",
  "Innovation in visual design is constantly pushing boundaries, both in film and in digital spaces. Filmmakers experiment with new techniques and technologies to create fresh visual experiences, while profile creators can draw inspiration from these innovations to craft unique and distinctive headers. Staying informed about emerging visual trends and techniques can help users create profiles that feel current and visually exciting.",
  "Sustainability in digital design is becoming increasingly important, as the environmental impact of digital technologies becomes more apparent. While profile design may seem trivial in this context, making conscious choices about image optimization, file sizes, and overall digital footprint can contribute to more sustainable digital practices. This includes using appropriately sized images, reducing unnecessary animations, and being mindful of the resources required to load and display profile elements."
];

// Different paragraph order structures
const paragraphOrders = [
  ['cinematic_context', 'design_theory', 'platform_limitations', 'step_by_step_long', 'expert_tips'],
  ['design_theory', 'platform_limitations', 'cinematic_context', 'expert_tips', 'step_by_step_long'],
  ['platform_limitations', 'cinematic_context', 'step_by_step_long', 'design_theory', 'expert_tips'],
  ['step_by_step_long', 'expert_tips', 'design_theory', 'cinematic_context', 'platform_limitations'],
  ['expert_tips', 'step_by_step_long', 'platform_limitations', 'design_theory', 'cinematic_context']
];

// Hash function to generate consistent randomness based on keyword
type KeyData = {
  keyword: string;
  cinematic_context: string;
  design_theory: string;
  platform_limitations: string;
  step_by_step_long: string;
  expert_tips: string;
};

export function assembleLongFormContent(keywordData: KeyData): string {
  // Generate hash from keyword to select paragraph order
  const keywordHash = keywordData.keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const orderIndex = keywordHash % paragraphOrders.length;
  const selectedOrder = paragraphOrders[orderIndex];
  
  // Assemble content with dynamic modifiers
  let content = '';
  selectedOrder.forEach((section) => {
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    content += `${modifier} ${keywordData[section as keyof KeyData]}\n\n`;
  });
  
  // Replace placeholders
  content = content
    .replace(/\[Current_Year\]/g, new Date().getFullYear().toString())
    .replace(/\[Platform_Name\]/g, ['Letterboxd', 'IMDb', 'Trakt'][Math.floor(Math.random() * 3)])
    .replace(/\[Director_Name\]/g, ['Wes Anderson', 'Denis Villeneuve', 'Greta Gerwig', 'Christopher Nolan', 'Quentin Tarantino'][Math.floor(Math.random() * 5)]);
  
  // Check word count and add content if needed
  const wordCount = content.split(/\s+/).length;
  const targetWordCount = 800;
  
  if (wordCount < targetWordCount) {
    const wordsNeeded = targetWordCount - wordCount;
    let additionalContent = '';
    
    // Add generic content until we reach target word count
    while (additionalContent.split(/\s+/).length < wordsNeeded) {
      const randomContent = genericAestheticsLibrary[Math.floor(Math.random() * genericAestheticsLibrary.length)];
      additionalContent += `${modifiers[Math.floor(Math.random() * modifiers.length)]} ${randomContent}\n\n`;
    }
    
    // Insert additional content in the middle of the existing content
    const contentSections = content.split('\n\n');
    const insertIndex = Math.floor(contentSections.length / 2);
    contentSections.splice(insertIndex, 0, additionalContent.trim());
    content = contentSections.join('\n\n');
  }
  
  return content;
}
