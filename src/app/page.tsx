'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import PlatformSwitcher from '../components/PlatformSwitcher';
import PreviewBox from '../components/PreviewBox';
import LayoutModeSelector from '../components/LayoutModeSelector';
import GradientSelector from '../components/GradientSelector';
import GifUploader from '../components/GifUploader';
import ProTemplateSelector from '../components/ProTemplateSelector';
import ExportButton from '../components/ExportButton';
import Auth from '../components/Auth';
import ProUpgradeModal from '../components/ProUpgradeModal';
import ShareButton from '../components/ShareButton';
import { User } from '@supabase/supabase-js';

const Home: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('letterboxd');
  const [layoutMode, setLayoutMode] = useState('classic');
  const [gradient, setGradient] = useState('default');
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [isPro, setIsPro] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [featureToUpgrade, setFeatureToUpgrade] = useState('');
  const [removeWatermark, setRemoveWatermark] = useState(false);
  const [exportedImageUrl, setExportedImageUrl] = useState<string>('');
  const [showShareButton, setShowShareButton] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleUserChange = (user: User | null, isPro: boolean) => {
    setUser(user);
    setIsPro(isPro);
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleLayoutModeChange = (mode: string) => {
    setLayoutMode(mode);
  };

  const handleGradientChange = (gradient: string) => {
    setGradient(gradient);
  };

  const handleGifUpload = (file: File) => {
    if (!isPro) {
      setFeatureToUpgrade('GIF support');
      setShowUpgradeModal(true);
      return;
    }
    setGifFile(file);
  };

  const handleTemplateChange = (template: string) => {
    const proTemplates = ['neon-noir', 'vintage-cinema', 'futuristic', 'hollywood-glam', 'indie-vibe'];
    if (proTemplates.includes(template) && !isPro) {
      setFeatureToUpgrade('Pro templates');
      setShowUpgradeModal(true);
      return;
    }
    setSelectedTemplate(template);
  };

  const handleProUpgrade = () => {
    // Refresh user data after upgrade
    setShowUpgradeModal(false);
  };

  const handleRemoveWatermarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPro && e.target.checked) {
      setFeatureToUpgrade('Remove watermark');
      setShowUpgradeModal(true);
      return;
    }
    setRemoveWatermark(e.target.checked);
  };

  const handleExportSuccess = (imageUrl: string) => {
    setExportedImageUrl(imageUrl);
    setShowShareButton(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>CineSkin - Custom Movie Profile Backgrounds</title>
        <meta name="description" content="Create custom 4K backgrounds for your Letterboxd, IMDb, and Trakt profiles. Unlock your movie aesthetic with CineSkin." />
        <meta name="keywords" content="Letterboxd profile background size, custom IMDb banner, Trakt profile art, movie profile background, cinephile, film aesthetic" />
        <meta property="og:title" content="CineSkin - Custom Movie Profile Backgrounds" />
        <meta property="og:description" content="Create custom 4K backgrounds for your Letterboxd, IMDb, and Trakt profiles. Unlock your movie aesthetic with CineSkin." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CineSkin - Custom Movie Profile Backgrounds" />
        <meta name="twitter:description" content="Create custom 4K backgrounds for your Letterboxd, IMDb, and Trakt profiles. Unlock your movie aesthetic with CineSkin." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`} />
      </Head>
      <Navbar user={user} isPro={isPro} />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Hero Section */}
        <section className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Stop using default backgrounds.<br />
            <span className="text-accent">Reclaim your movie aesthetic</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl">
            One-click 4K art canvas for your profile page
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Auth onUserChange={handleUserChange} />
            <Link href="/solutions" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Browse All Alternatives
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Controls */}
          <div className="space-y-8">
            <PlatformSwitcher onPlatformChange={handlePlatformChange} />
            
            <LayoutModeSelector 
              selectedMode={layoutMode} 
              onModeChange={handleLayoutModeChange} 
              isPro={isPro} 
            />
            
            <GradientSelector 
              selectedGradient={gradient} 
              onGradientChange={handleGradientChange} 
              isPro={isPro} 
            />
            
            <ProTemplateSelector 
              selectedTemplate={selectedTemplate} 
              onTemplateChange={handleTemplateChange} 
              isPro={isPro} 
            />
            
            <GifUploader 
              isPro={isPro} 
              onGifUpload={handleGifUpload} 
            />
            
            {isPro && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remove-watermark"
                  checked={removeWatermark}
                  onChange={handleRemoveWatermarkChange}
                  className="rounded border-accent/30 text-accent focus:ring-accent"
                />
                <label htmlFor="remove-watermark" className="text-foreground/80">
                  Remove watermark
                </label>
              </div>
            )}
            
            <div className="border border-accent/30 rounded-lg p-6 bg-black/50">
              <h3 className="text-xl font-semibold mb-4">Pro Features</h3>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span>
                  Advanced gradient presets
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span>
                  GIF support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span>
                  Pro-exclusive templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span>
                  Remove watermarks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">•</span>
                  High-resolution exports
                </li>
              </ul>
              {!isPro && user && (
                <div className="mt-4">
                  <ProUpgradeModal 
                    isOpen={showUpgradeModal} 
                    onClose={() => setShowUpgradeModal(false)} 
                    onProUpgrade={handleProUpgrade} 
                    feature={featureToUpgrade} 
                  />
                </div>
              )}
            </div>
            
            <ExportButton 
              previewRef={previewRef} 
              isPro={isPro} 
              removeWatermark={removeWatermark} 
              onExportSuccess={handleExportSuccess}
            />
            
            {showShareButton && (
              <div className="mt-4">
                <ShareButton platform={selectedPlatform} imageUrl={exportedImageUrl} />
              </div>
            )}
          </div>

          {/* Right Side - Preview */}
          <div className="sticky top-24" ref={previewRef}>
            <PreviewBox 
              platform={selectedPlatform} 
              layoutMode={layoutMode} 
              gradient={gradient} 
              gifFile={gifFile} 
              isPro={isPro} 
              template={selectedTemplate} 
            />
          </div>
        </div>
      </main>
      
      {/* Quick Access Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Link href="/letterboxd-background-no-patron-hack" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Letterboxd Background Without Patron
            </Link>
            <Link href="/fix-letterboxd-top-4-aesthetic" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Fix Letterboxd Top 4 Aesthetic
            </Link>
            <Link href="/custom-imdb-banner-maker" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Custom IMDb Profile Banner
            </Link>
            <Link href="/wes-anderson-style-letterboxd-header" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Wes Anderson Style Header
            </Link>
            <Link href="/fix-blurry-letterboxd-background" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Fix Blurry Letterboxd Background
            </Link>
            <Link href="/best-letterboxd-color-combinations" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Best Letterboxd Color Combos
            </Link>
            <Link href="/letterboxd-profile-lore-art" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Letterboxd Profile Lore Builder
            </Link>
            <Link href="/dark-academia-film-banner" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Dark Academia Film Header
            </Link>
            <Link href="/add-gif-letterboxd-banner" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Add GIF to Letterboxd Banner
            </Link>
            <Link href="/trakt-custom-cover-art" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Trakt.tv Custom Cover Art
            </Link>
            <Link href="/anime-letterboxd-banner-maker" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Anime Aesthetic Banner Maker
            </Link>
            <Link href="/letterboxd-wrap-visuals" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Letterboxd Wrap Visual Generator
            </Link>
            <Link href="/solutions" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Browse All Solutions
            </Link>
            <Link href="/solutions" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Profile Enhancement
            </Link>
            <Link href="/solutions" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Visual Effects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">CineSkin</h2>
              <p className="text-slate-400 mt-2">Custom movie profile backgrounds</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400">Support: 457239850@qq.com</p>
              <p className="text-slate-500 mt-2">© 2026 CineSkin. All rights reserved.</p>
              <p className="text-slate-500 mt-2">
                <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;