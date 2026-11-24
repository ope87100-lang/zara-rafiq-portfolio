export type SkillIconKey =
  | 'shopping-cart'
  | 'search'
  | 'file-text'
  | 'pen-tool'
  | 'layers'
  | 'megaphone';

export interface CoreSkill {
  id: string;
  number: string;
  title: string;
  icon: SkillIconKey;
  summary: string;
  practicalFocus: string[];
  relatedPageLabel: string;
}

export interface AdditionalSkill {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const SKILLS_SECTION_META = {
  eyebrow: 'MY SKILLS',
  headingPrefix: 'Skills &',
  headingHighlight: 'Capabilities',
  description:
    'A combination of e-commerce, product research, content creation and digital marketing skills developed through practical learning.',
};

export const CORE_SKILLS: CoreSkill[] = [
  {
    id: 'ebay-listing-preparation',
    number: '01',
    title: 'eBay Listing Preparation',
    icon: 'shopping-cart',
    summary:
      'Structuring draft online marketplace listings using verified product details, specifications, and clear buyer-facing organization.',
    practicalFocus: [
      'Preparing structured draft product listings from product specifications',
      'Organizing product titles, item specifics, and clear descriptions',
      'Checking listing completeness prior to publishing',
    ],
    relatedPageLabel: 'View eBay Practice Project',
  },
  {
    id: 'product-research',
    number: '02',
    title: 'Product Research',
    icon: 'search',
    summary:
      'Gathering and verifying product details, key features, and marketplace item specifics to support clear and accurate listings.',
    practicalFocus: [
      'Researching product features and technical specifications',
      'Collecting accurate item specifics for marketplace attributes',
      'Organizing product notes into clean reference sheets',
    ],
    relatedPageLabel: 'See Research Process',
  },
  {
    id: 'title-description-writing',
    number: '03',
    title: 'Title & Description Writing',
    icon: 'file-text',
    summary:
      'Drafting concise product titles and readable descriptions that communicate features clearly without clutter or exaggeration.',
    practicalFocus: [
      'Writing clear, descriptive titles for online marketplace listings',
      'Summarizing features into scannable specification bullets',
      'Proofreading product text for accuracy and clarity',
    ],
    relatedPageLabel: 'Explore Listing Copy',
  },
  {
    id: 'canva-design',
    number: '04',
    title: 'Canva Design',
    icon: 'pen-tool',
    summary:
      'Planning and creating clean marketing visuals, social graphics, and simple product feature infographics in Canva.',
    practicalFocus: [
      'Creating basic marketing and product-content visuals in Canva',
      'Planning simple infographics to highlight product features',
      'Maintaining clean alignment, readable text, and balanced spacing',
    ],
    relatedPageLabel: 'View Canva Practice Project',
  },
  {
    id: 'social-media-content-planning',
    number: '05',
    title: 'Social Media Content Planning',
    icon: 'layers',
    summary:
      'Organizing structured social media post concepts and visual themes tailored for Facebook and Instagram.',
    practicalFocus: [
      'Planning Facebook and Instagram content topics systematically',
      'Coordinating visual concepts with clear written captions',
      'Organizing post formats for consistent communication',
    ],
    relatedPageLabel: 'Explore Content Planning',
  },
  {
    id: 'basic-digital-marketing',
    number: '06',
    title: 'Basic Digital Marketing',
    icon: 'megaphone',
    summary:
      'Applying foundational digital marketing principles to support online product presentation and structured brand communication.',
    practicalFocus: [
      'Aligning product presentation with audience clarity',
      'Combining marketplace listing hygiene with social content',
      'Supporting online business tasks with organized documentation',
    ],
    relatedPageLabel: 'Explore All Skills',
  },
];

export const ADDITIONAL_SKILLS: AdditionalSkill[] = [
  {
    id: 'item-specifics-research',
    title: 'Item specifics research',
    category: 'E-commerce & Research',
    description:
      'Identifying accurate attributes such as model details, dimensions, materials, and compatibility fields for eBay drafts.',
  },
  {
    id: 'product-image-planning',
    title: 'Product image planning',
    category: 'Visual Preparation',
    description:
      'Planning which product angles and feature highlights need clear visual presentation in an online listing.',
  },
  {
    id: 'basic-infographic-planning',
    title: 'Basic infographic planning',
    category: 'Canva Design',
    description:
      'Structuring concise callout points and readable visual layouts that explain key product features quickly.',
  },
  {
    id: 'facebook-content-planning',
    title: 'Facebook content planning',
    category: 'Social Media',
    description:
      'Organizing practical post outlines and clear product-focused updates suited for Facebook audiences.',
  },
  {
    id: 'instagram-content-planning',
    title: 'Instagram content planning',
    category: 'Social Media',
    description:
      'Planning square visual grids, feature cards, and cohesive Canva graphics for Instagram feeds.',
  },
  {
    id: 'written-communication',
    title: 'Written communication',
    category: 'Professional Strengths',
    description:
      'Writing clear, polite, and structured descriptions, notes, and product copy with consistent formatting.',
  },
  {
    id: 'attention-to-detail',
    title: 'Attention to detail',
    category: 'Professional Strengths',
    description:
      'Reviewing specifications, spelling, and visual alignment carefully so drafts remain accurate and organized.',
  },
];
