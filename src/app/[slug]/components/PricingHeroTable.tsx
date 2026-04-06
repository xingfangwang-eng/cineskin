import React from 'react';

interface PricingHeroTableProps {
  keyword: string;
}

const PricingHeroTable: React.FC<PricingHeroTableProps> = ({ keyword }) => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-500"></div>
        Feature Comparison
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="text-lg text-slate-600 mb-4">
            Feature comparison for {keyword}: CineSkin Pro vs Letterboxd plans
          </caption>
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Feature</th>
              <th className="border border-slate-200 p-4 text-center font-bold text-slate-900">Letterboxd Free</th>
              <th className="border border-slate-200 p-4 text-center font-bold text-slate-900">Letterboxd Patron ($49/year)</th>
              <th className="border-2 border-green-400 p-4 text-center font-bold text-slate-900 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-3 py-1 text-sm font-bold animate-pulse">
                  Recommended
                </div>
                CineSkin Pro ($19.9/year)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="border border-slate-200 p-4 font-medium text-slate-900">Custom Background</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">✗</td>
              <td className="border border-slate-200 p-4 text-center text-green-500 font-bold">✓</td>
              <td className="border-2 border-green-400 p-4 text-center text-green-500 font-bold">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="border border-slate-200 p-4 font-medium text-slate-900">GIF Animation</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">✗</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">✗</td>
              <td className="border-2 border-green-400 p-4 text-center text-green-500 font-bold">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="border border-slate-200 p-4 font-medium text-slate-900">AI Layouts</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">✗</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">✗</td>
              <td className="border-2 border-green-400 p-4 text-center text-green-500 font-bold">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="border border-slate-200 p-4 font-medium text-slate-900">Resolution</td>
              <td className="border border-slate-200 p-4 text-center text-slate-600">720p</td>
              <td className="border border-slate-200 p-4 text-center text-slate-600">1080p</td>
              <td className="border-2 border-green-400 p-4 text-center text-green-500 font-bold">4K</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-4 font-medium text-slate-900">Annual Cost</td>
              <td className="border border-slate-200 p-4 text-center text-green-500 font-bold">$0</td>
              <td className="border border-slate-200 p-4 text-center text-red-500 font-bold">$49</td>
              <td className="border-2 border-green-400 p-4 text-center text-green-500 font-bold">$19.9</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-slate-100 p-6 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Why CineSkin Pro is the Better Choice</h3>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Save $29.1 annually compared to Letterboxd Patron</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Access to exclusive AI-powered layouts not available on Letterboxd</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Higher resolution support for crisper, more professional-looking profiles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>GIF animation support to make your profile stand out</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Specialized cinematic templates designed for movie enthusiasts</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PricingHeroTable;
