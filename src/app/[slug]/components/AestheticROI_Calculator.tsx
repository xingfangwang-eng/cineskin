'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Users, Clock, Image, ArrowRight } from 'lucide-react';
import { calculateROI, getStyleDescription } from '@/utils/CalculatorLogic';

interface AestheticROI_CalculatorProps {
  keyword: string;
}

const AestheticROI_Calculator: React.FC<AestheticROI_CalculatorProps> = ({ keyword }) => {
  // State for form inputs
  const [followers, setFollowers] = useState<number>(100);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [wantsCustomBackground, setWantsCustomBackground] = useState<boolean>(true);
  
  // State for calculation results
  const [showResult, setShowResult] = useState<boolean>(false);
  const [efficiencyIncrease, setEfficiencyIncrease] = useState<number>(240);
  const [moneySaved, setMoneySaved] = useState<number>(29.1);
  const [styleSpecificScore, setStyleSpecificScore] = useState<number>(85);
  const [styleSpecificMetric, setStyleSpecificMetric] = useState<string>('Aesthetic Score');
  const [recommendation, setRecommendation] = useState<string>('');

  // Calculate ROI
  const handleCalculateROI = () => {
    const result = calculateROI(keyword, followers, hoursPerDay, wantsCustomBackground);
    
    // Update state
    setEfficiencyIncrease(result.efficiencyIncrease);
    setMoneySaved(result.moneySaved);
    setStyleSpecificScore(result.styleSpecificScore);
    setStyleSpecificMetric(result.styleSpecificMetric);
    setRecommendation(result.recommendation);
    setShowResult(true);
  };

  return (
    <section className="my-16 bg-white border border-slate-200 p-8 rounded-md">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-500"></div>
        <div className="flex items-center gap-2">
          <Calculator size={24} />
          Aesthetic ROI Calculator
        </div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <Users size={18} />
                Current Letterboxd Followers
              </div>
            </label>
            <input
              type="number"
              min="0"
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                Hours of Movie Watching Per Day
              </div>
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <Image size={18} />
                Want Custom Background?
              </div>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="customBackground"
                  value="yes"
                  checked={wantsCustomBackground}
                  onChange={() => setWantsCustomBackground(true)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="customBackground"
                  value="no"
                  checked={!wantsCustomBackground}
                  onChange={() => setWantsCustomBackground(false)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                No
              </label>
            </div>
          </div>
          
          <button
            onClick={handleCalculateROI}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors active:scale-95"
          >
            Calculate My Vibe
          </button>
        </div>
        
        {/* Results */}
        <div className="flex flex-col justify-center">
          {showResult ? (
            <div className="bg-slate-100 p-8 rounded-md border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Aesthetic ROI</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                After upgrading to CineSkin Pro, your profile will attract followers at <span className="font-bold text-blue-600">{efficiencyIncrease}%</span> higher rate, and you'll save <span className="font-bold text-blue-600">${moneySaved.toFixed(1)}</span> annually compared to Letterboxd Patron.
              </p>
              <div className="bg-white p-4 rounded-md mb-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Style-Specific Analysis</h4>
                <p className="text-slate-600 mb-2">
                  <span className="font-medium">{styleSpecificMetric}:</span> <span className="font-bold text-blue-600">{styleSpecificScore}/100</span>
                </p>
                <p className="text-slate-600">{recommendation}</p>
              </div>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors active:scale-95 flex items-center justify-center gap-2">
                Export Now as Pro
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="bg-slate-100 p-8 rounded-md border border-slate-200 text-center">
              <Calculator size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Calculate Your Aesthetic ROI</h3>
              <p className="text-slate-600 mb-4">
                Enter your current stats to see how CineSkin Pro can boost your profile's appeal and save you money.
              </p>
              <p className="text-sm text-slate-500">
                {getStyleDescription(keyword)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AestheticROI_Calculator;
