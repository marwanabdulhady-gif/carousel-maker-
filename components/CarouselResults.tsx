import React, { useState } from 'react';
import { CarouselData, Language } from '../types';
import { Users, Layout, FileText, Copy, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface CarouselResultsProps {
  data: CarouselData;
  onReset: () => void;
  language: Language;
}

const CarouselResults: React.FC<CarouselResultsProps> = ({ data, onReset, language }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'storyboard' | 'characters'>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-slate-400 max-w-2xl">{data.overview}</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700 text-sm font-medium"
        >
          {t.newBtn}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-accent-500 text-accent-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <FileText size={18} /> {t.tabStrategy}
        </button>
        <button
          onClick={() => setActiveTab('characters')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'characters' ? 'border-accent-500 text-accent-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Users size={18} /> {t.tabCharacters}
        </button>
        <button
          onClick={() => setActiveTab('storyboard')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'storyboard' ? 'border-accent-500 text-accent-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Layout size={18} /> {t.tabStoryboard}
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-900/50 rounded-2xl min-h-[500px]">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent-500 rounded-full"></span>
                {t.audienceAnalysis}
              </h3>
              <p className="text-slate-300 leading-relaxed">{data.targetAudienceAnalysis}</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                {t.toneGuide}
              </h3>
              <p className="text-slate-300 leading-relaxed">{data.toneDialectNotes}</p>
            </div>
             <div className="md:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-800/20 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">{t.execSummary}</h3>
              <p className="text-slate-300 leading-relaxed text-lg">{data.overview}</p>
            </div>
          </div>
        )}

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {data.characters.length === 0 ? (
               <div className="col-span-2 text-center py-12 text-slate-500">
                 {t.noChars}
               </div>
            ) : (
              data.characters.map((char, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors group">
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{char.name}</h3>
                      <span className="bg-accent-500/10 text-accent-400 text-xs px-2 py-1 rounded-full font-medium border border-accent-500/20">
                        {char.role}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{char.personality}</p>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-slate-300 text-sm italic">"{char.visualDescription}"</p>
                    </div>
                  </div>
                  {/* Prompts are usually LTR regardless of UI language */}
                  <div className="p-4 bg-slate-950/30" dir="ltr">
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <ImageIcon size={12} /> {t.imgPrompt}
                       </label>
                       <button
                        onClick={() => handleCopy(char.imagePrompt, `char-${idx}`)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title={t.copyPrompt}
                      >
                        {copiedId === `char-${idx}` ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <code className="block text-xs text-accent-200 bg-slate-900 p-3 rounded border border-slate-800 font-mono break-words leading-relaxed select-all">
                      {char.imagePrompt}
                    </code>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Storyboard Tab */}
        {activeTab === 'storyboard' && (
          <div className="space-y-6 animate-fade-in">
            {data.slides.map((slide, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Slide Visuals Sidebar */}
                  <div className="w-full md:w-1/3 bg-slate-950/30 p-6 border-r border-slate-700/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-sm">
                          {slide.slideNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider border border-slate-700 px-2 py-0.5 rounded">
                          {slide.type}
                        </span>
                      </div>
                      
                      <div className="mb-6">
                         <label className="text-xs text-slate-500 block mb-2 font-medium">{t.visualDesc}</label>
                         <p className="text-slate-300 text-sm leading-relaxed">{slide.visualDescription}</p>
                      </div>
                    </div>

                    <div dir="ltr">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-accent-400 uppercase tracking-wider flex items-center gap-1">
                          <ImageIcon size={12} /> {t.imgPrompt}
                        </label>
                         <button
                          onClick={() => handleCopy(slide.imagePrompt, `slide-${idx}`)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedId === `slide-${idx}` ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <code className="text-[11px] text-slate-400 font-mono leading-tight block break-words">
                          {slide.imagePrompt}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Slide Content */}
                  <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
                    {/* Overlay Text Preview */}
                    <div className="bg-slate-100 rounded-lg p-6 relative group aspect-video flex flex-col justify-center items-center text-center shadow-inner">
                      <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">{t.previewMockup}</div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">{slide.headline}</h2>
                      <p className="text-lg text-slate-700 max-w-md">{slide.bodyText}</p>
                    </div>

                    {/* Script/Notes */}
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                       <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">{t.captionScript}</label>
                       <p className="text-slate-300 text-sm whitespace-pre-wrap font-medium">{slide.speakerNotes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CarouselResults;
