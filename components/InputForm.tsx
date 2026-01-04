import React, { useState } from 'react';
import { UserInput, Language } from '../types';
import { TONE_OPTIONS, STYLE_OPTIONS, PLATFORM_OPTIONS, GOAL_OPTIONS, DEFAULT_INPUTS, TRANSLATIONS } from '../constants';
import { Sparkles, ArrowRight, ArrowLeft, Globe } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isGenerating: boolean;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isGenerating, currentLanguage, onLanguageChange }) => {
  const [formData, setFormData] = useState<UserInput>(DEFAULT_INPUTS);
  const t = TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure the form submits the currently selected language
    onSubmit({ ...formData, language: currentLanguage });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl relative">
      
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 flex items-center bg-slate-900 rounded-lg p-1 border border-slate-700">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currentLanguage === 'en' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('ar')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currentLanguage === 'ar' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          عربي
        </button>
      </div>

      <div className="mb-8 text-center pt-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-500/20 text-accent-500 mb-4">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t.formTitle}</h2>
        <p className="text-slate-400">{t.formDesc}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Concept */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.conceptLabel}</label>
          <textarea
            name="concept"
            required
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none"
            placeholder={t.conceptPlaceholder}
            value={formData.concept}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.audienceLabel}</label>
            <input
              type="text"
              name="targetAudience"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder={t.audiencePlaceholder}
              value={formData.targetAudience}
              onChange={handleChange}
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.goalLabel}</label>
            <select
              name="goal"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all appearance-none"
              value={formData.goal}
              onChange={handleChange}
            >
              {GOAL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Platform */}
           <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.platformLabel}</label>
            <select
              name="platform"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all appearance-none"
              value={formData.platform}
              onChange={handleChange}
            >
              {PLATFORM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Slide Count */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              {t.slideCountLabel} <span className="text-accent-400 font-bold">{formData.slideCount}</span>
            </label>
            <input
              type="range"
              name="slideCount"
              min="3"
              max="15"
              step="1"
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
              value={formData.slideCount}
              onChange={(e) => setFormData(prev => ({ ...prev, slideCount: parseInt(e.target.value) }))}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3</span>
              <span>15</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.toneLabel}</label>
            <select
              name="tone"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all appearance-none"
              value={formData.tone}
              onChange={handleChange}
            >
              {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.styleLabel}</label>
            <select
              name="artStyle"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all appearance-none"
              value={formData.artStyle}
              onChange={handleChange}
            >
              {STYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* CTA */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.ctaLabel}</label>
            <input
              type="text"
              name="cta"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder={t.ctaPlaceholder}
              value={formData.cta}
              onChange={handleChange}
            />
          </div>

           {/* Additional Context */}
           <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.contextLabel}</label>
            <input
              type="text"
              name="additionalContext"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder={t.contextPlaceholder}
              value={formData.additionalContext}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-indigo-600 hover:from-accent-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generating}
            </>
          ) : (
            <>
              {t.submitButton} {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
