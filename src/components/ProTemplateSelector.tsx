import React from 'react';

interface ProTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  isPro: boolean;
}

const ProTemplateSelector: React.FC<ProTemplateSelectorProps> = ({ selectedTemplate, onTemplateChange, isPro }) => {
  const templates = [
    { id: 'default', name: 'Default', description: 'Clean and minimal' },
    { id: 'neon-noir', name: 'Neon Noir', description: 'Cyberpunk-inspired', isPro: true },
    { id: 'vintage-cinema', name: 'Vintage Cinema', description: 'Classic film aesthetic', isPro: true },
    { id: 'futuristic', name: 'Futuristic', description: 'Sci-fi inspired', isPro: true },
    { id: 'hollywood-glam', name: 'Hollywood Glam', description: 'Golden age of cinema', isPro: true },
    { id: 'indie-vibe', name: 'Indie Vibe', description: 'Independent film aesthetic', isPro: true },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Pro Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`p-4 border rounded-lg transition-all ${selectedTemplate === template.id ? 'border-accent bg-accent/10' : 'border-accent/30 hover:border-accent/50'} ${!isPro && template.isPro ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => (isPro || !template.isPro) ? onTemplateChange(template.id) : null}
            disabled={!isPro && template.isPro}
          >
            <h4 className="font-medium mb-1">{template.name}</h4>
            <p className="text-sm text-foreground/70 mb-2">{template.description}</p>
            {template.isPro && (
              <span className="text-xs text-accent font-medium">Pro Only</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProTemplateSelector;