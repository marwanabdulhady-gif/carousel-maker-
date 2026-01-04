import { Language } from "./types";

export const TONE_OPTIONS = [
  "Professional & Authoritative",
  "Witty & Humorous",
  "Inspirational & Uplifting",
  "Educational & Academic",
  "Casual & Relatable",
  "Dark & Edgy",
  "Minimalist & Clean"
];

export const STYLE_OPTIONS = [
  "Photorealistic 4k",
  "Minimalist Vector Art",
  "3D Pixar/Disney Style",
  "Cyberpunk/Neon",
  "Hand-drawn Sketch",
  "Corporate Memphis",
  "Abstract Geometric",
  "Retro/Vintage 90s",
  "Islamic Geometric Patterns",
  "Calligraphic Art Style"
];

export const PLATFORM_OPTIONS = [
  "LinkedIn (Professional)",
  "Instagram (Visual/Casual)",
  "Twitter/X (Concise)",
  "Facebook (Community)"
];

export const GOAL_OPTIONS = [
  "Brand Awareness",
  "Lead Generation",
  "Educational/How-to",
  "Engagement/Viral",
  "Product Sales",
  "Storytelling"
];

export const DEFAULT_INPUTS = {
  language: 'ar' as Language, // Default to Arabic as requested
  concept: "",
  targetAudience: "",
  tone: "Professional & Authoritative",
  platform: "Instagram (Visual/Casual)",
  goal: "Engagement/Viral",
  cta: "",
  slideCount: 8,
  artStyle: "Minimalist Vector Art",
  additionalContext: ""
};

export const TRANSLATIONS = {
  en: {
    appTitle: "CarouselArchitect",
    appSubtitle: "AI-Powered Creative Suite",
    heroTitle: "Turn Ideas into",
    heroHighlight: "Viral Carousels",
    heroDesc: "Generate character-driven stories, educational guides, and perfect image prompts in seconds. Optimized for Arabic and English content.",
    formTitle: "Define Your Carousel",
    formDesc: "Tell us what you want to create, and we'll engineer the perfect structure, script, and prompts.",
    conceptLabel: "Carousel Concept / Topic",
    conceptPlaceholder: "e.g., A step-by-step guide to...",
    audienceLabel: "Target Audience",
    audiencePlaceholder: "e.g., Small Business Owners",
    platformLabel: "Platform",
    goalLabel: "Primary Goal",
    slideCountLabel: "Number of Slides:",
    toneLabel: "Tone & Voice",
    styleLabel: "Visual Style",
    ctaLabel: "Call to Action (CTA)",
    ctaPlaceholder: "e.g., Save this post for later",
    contextLabel: "Additional Context (Optional)",
    contextPlaceholder: "Specific colors, cultural references...",
    submitButton: "Generate Blueprint",
    generating: "Architecting Carousel...",
    newBtn: "Create New",
    tabStrategy: "Strategy & Overview",
    tabCharacters: "Characters & Style",
    tabStoryboard: "Storyboard & Prompts",
    audienceAnalysis: "Target Audience Analysis",
    toneGuide: "Tone & Dialect Guide",
    execSummary: "Executive Summary",
    noChars: "No specific characters defined for this concept.",
    visualDesc: "Visual Description",
    imgPrompt: "Image Prompt",
    previewMockup: "SLIDE PREVIEW MOCKUP",
    captionScript: "Caption / Script",
    copyPrompt: "Copy Prompt",
    tryAgain: "Try Again",
    errorHeader: "Generation Failed"
  },
  ar: {
    appTitle: "معماري الكاروسيل",
    appSubtitle: "مجموعة أدوات إبداعية بالذكاء الاصطناعي",
    heroTitle: "حول أفكارك إلى",
    heroHighlight: "كاروسيل سريع الانتشار",
    heroDesc: "قم بإنشاء قصص تعتمد على الشخصيات، وأدلة تعليمية، ومطالبات صور مثالية في ثوانٍ. محسن للمحتوى العربي والإنجليزي.",
    formTitle: "حدد تفاصيل الكاروسيل",
    formDesc: "أخبرنا بما تريد إنشاءه، وسنقوم بهندسة الهيكل والسيناريو والمطالبات المثالية.",
    conceptLabel: "مفهوم / موضوع الكاروسيل",
    conceptPlaceholder: "مثال: دليل خطوة بخطوة لـ...",
    audienceLabel: "الجمهور المستهدف",
    audiencePlaceholder: "مثال: أصحاب المشاريع الصغيرة",
    platformLabel: "المنصة",
    goalLabel: "الهدف الأساسي",
    slideCountLabel: "عدد الشرائح:",
    toneLabel: "النبرة والصوت",
    styleLabel: "النمط البصري",
    ctaLabel: "دعوة لاتخاذ إجراء (CTA)",
    ctaPlaceholder: "مثال: احفظ هذا المنشور لوقت لاحق",
    contextLabel: "سياق إضافي (اختياري)",
    contextPlaceholder: "ألوان محددة، مراجع ثقافية...",
    submitButton: "إنشاء المخطط",
    generating: "جاري هندسة الكاروسيل...",
    newBtn: "إنشاء جديد",
    tabStrategy: "الاستراتيجية والنظرة العامة",
    tabCharacters: "الشخصيات والنمط",
    tabStoryboard: "اللوحة القصصية والمطالبات",
    audienceAnalysis: "تحليل الجمهور المستهدف",
    toneGuide: "دليل النبرة واللهجة",
    execSummary: "الملخص التنفيذي",
    noChars: "لم يتم تحديد شخصيات محددة لهذا المفهوم.",
    visualDesc: "الوصف البصري",
    imgPrompt: "مطالبة الصورة (Image Prompt)",
    previewMockup: "معاينة الشريحة",
    captionScript: "التعليق / السيناريو",
    copyPrompt: "نسخ المطالبة",
    tryAgain: "حاول مرة أخرى",
    errorHeader: "فشل الإنشاء"
  }
};
