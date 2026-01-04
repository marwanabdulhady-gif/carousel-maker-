import React, { useState } from 'react';
import { UserInput, CarouselData, GenerationStatus, Language } from './types';
import { generateCarouselContent } from './services/geminiService';
import InputForm from './components/InputForm';
import CarouselResults from './components/CarouselResults';
import { Layers } from 'lucide-react';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [data, setData] = useState<CarouselData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ar');

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const handleGenerate = async (inputs: UserInput) => {
    setStatus(GenerationStatus.GENERATING);
    setError(null);
    try {
      // Pass the current language to the service
      const result = await generateCarouselContent({ ...inputs, language });
      setData(result);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while generating the carousel.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(GenerationStatus.IDLE);
    setData(null);
    setError(null);
  };

  return (
    <div 
      className={`min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-200 ${isRtl ? 'font-cairo' : 'font-sans'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-accent-600 to-indigo-500 p-2 rounded-lg">
              <Layers size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">{t.appTitle}</span>
          </div>
          <div className="text-sm text-slate-500 hidden md:block">
             {t.appSubtitle}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {status === GenerationStatus.IDLE || status === GenerationStatus.GENERATING ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="w-full max-w-3xl mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {t.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">{t.heroHighlight}</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {t.heroDesc}
              </p>
            </div>
            
            <InputForm 
              onSubmit={handleGenerate} 
              isGenerating={status === GenerationStatus.GENERATING} 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
            
            {status === GenerationStatus.ERROR && (
               <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl max-w-xl text-center">
                 <p className="font-medium">{t.errorHeader}</p>
                 <p className="text-sm mt-1 opacity-80">{error}</p>
                 <button onClick={() => setStatus(GenerationStatus.IDLE)} className="text-xs underline mt-2 hover:text-white">{t.tryAgain}</button>
               </div>
            )}
          </div>
        ) : (
          data && <CarouselResults data={data} onReset={handleReset} language={language} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 mt-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} CarouselArchitect. Powered by Gemini Pro & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
