import React from 'react';

const PlatformSpecTable: React.FC = () => {
  const platforms = [
    {
      name: 'Letterboxd',
      pixelSize: '1500 × 500',
      aspectRatio: '3:1',
      fileSize: '5MB',
      notes: 'Supports JPG, PNG, GIF'
    },
    {
      name: 'IMDb',
      pixelSize: '1800 × 600',
      aspectRatio: '3:1',
      fileSize: '10MB',
      notes: 'Supports JPG, PNG'
    },
    {
      name: 'Trakt',
      pixelSize: '1920 × 600',
      aspectRatio: '3.2:1',
      fileSize: '8MB',
      notes: 'Supports JPG, PNG, GIF'
    },
    {
      name: 'Twitter',
      pixelSize: '1500 × 500',
      aspectRatio: '3:1',
      fileSize: '5MB',
      notes: 'Supports JPG, PNG, GIF, MP4'
    }
  ];

  return (
    <section className="my-16 bg-white border border-slate-200 p-8 rounded-md">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-500"></div>
        Platform Banner Specifications
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="text-lg text-slate-600 mb-4">
            Optimal banner dimensions for popular movie platforms
          </caption>
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Platform</th>
              <th className="border border-slate-200 p-4 text-center font-bold text-slate-900">Recommended Size (px)</th>
              <th className="border border-slate-200 p-4 text-center font-bold text-slate-900">Aspect Ratio</th>
              <th className="border border-slate-200 p-4 text-center font-bold text-slate-900">File Size Limit</th>
              <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Notes</th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((platform, index) => (
              <tr key={platform.name} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="border border-slate-200 p-4 font-medium text-slate-900">{platform.name}</td>
                <td className="border border-slate-200 p-4 text-center text-slate-600">{platform.pixelSize}</td>
                <td className="border border-slate-200 p-4 text-center text-slate-600">{platform.aspectRatio}</td>
                <td className="border border-slate-200 p-4 text-center text-slate-600">{platform.fileSize}</td>
                <td className="border border-slate-200 p-4 text-slate-600">{platform.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-slate-100 p-6 border border-slate-200 rounded-md">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Why These Specifications Matter</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Using the correct banner dimensions for each platform ensures your profile looks professional and avoids cropping or distortion. Different platforms have different requirements, so it's important to optimize your banners accordingly.
        </p>
        <p className="text-slate-600 leading-relaxed">
          CineSkin automatically optimizes your banners for each platform, taking the guesswork out of creating the perfect profile aesthetic. Whether you're focusing on Letterboxd, IMDb, Trakt, or Twitter, we've got you covered.
        </p>
      </div>
    </section>
  );
};

export default PlatformSpecTable;
