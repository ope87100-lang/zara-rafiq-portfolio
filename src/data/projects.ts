export type ProjectCategory =
  | 'E-commerce'
  | 'Product Research'
  | 'Canva Design'
  | 'Social Media'
  | 'Content Planning';

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
  badge: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  classification: string;
  shortDescription: string;
  categories: ProjectCategory[];
  filterTags: ProjectCategory[];
  coverImage: ProjectGalleryItem;
  overview: string;
  objective: string;
  researchProcess: string[];
  workPerformed: string[];
  skillsDemonstrated: string[];
  gallery: ProjectGalleryItem[];
}

export const PORTFOLIO_META = {
  eyebrow: 'MY PORTFOLIO',
  headingPrefix: 'Selected',
  headingHighlight: 'Projects',
  description:
    'A collection of practical projects showcasing my skills in e-commerce, product research and digital content creation.',
  filterOptions: [
    'All Projects',
    'E-commerce',
    'Product Research',
    'Canva Design',
    'Social Media',
  ] as const,
};

export const PROJECTS: PortfolioProject[] = [
  {
    slug: 'ebay-listing-practice',
    title: 'eBay Listing Practice & Product Research',
    classification: 'Practical Self-Directed Project',
    shortDescription:
      'Prepared draft product listings, researched product features and item specifics, and developed clear product titles and descriptions.',
    categories: ['E-commerce', 'Product Research'],
    filterTags: ['E-commerce', 'Product Research'],
    coverImage: {
      src: '/images/ebay-listing-preview.webp',
      alt: 'Illustrative preview of structured eBay listing draft workflow including title, item specifics, and visual asset plan',
      caption: 'Illustrative Workflow Preview — Structured eBay listing draft sheet',
      badge: 'Illustrative Preview',
      width: 960,
      height: 640,
    },
    overview:
      'A self-directed practical project focused on preparing accurate, well-organized draft eBay product listings from scratch. The work emphasized clarity, specification accuracy, and structured visual planning.',
    objective:
      'To practice the end-to-end preparation steps required before publishing an online marketplace listing — from collecting product facts and item specifics to drafting readable titles, descriptions, and visual callouts.',
    researchProcess: [
      'Reviewed available product information and technical specifications to establish verified facts.',
      'Identified relevant marketplace item specifics (brand, material, dimensions, type, and key attributes) to avoid incomplete draft fields.',
      'Compared how product features are prioritized so essential details appear clearly near the top of the listing.',
    ],
    workPerformed: [
      'Prepared draft product listings using available product details and specifications.',
      'Researched product features and item specifics to support clear, accurate listings.',
      'Wrote and refined product titles and descriptions for online marketplace listings.',
      'Planned product images and simple infographics to communicate product features.',
    ],
    skillsDemonstrated: [
      'eBay Listing Preparation',
      'Product Research',
      'Item Specifics Research',
      'Title & Description Writing',
      'Product Image Planning',
      'Basic Infographic Planning',
      'Attention to Detail',
    ],
    gallery: [
      {
        src: '/images/ebay-listing-preview.webp',
        alt: 'Illustrative preview of eBay listing structure draft',
        caption: 'Illustrative Preview — Draft listing title, item specifics table & feature summary layout',
        badge: 'Illustrative Preview',
        width: 960,
        height: 640,
      },
      {
        src: '/images/ebay-research-preview.webp',
        alt: 'Illustrative preview of product research and item specifics verification checklist',
        caption: 'Illustrative Preview — Self-directed product information & item specifics checklist',
        badge: 'Illustrative Preview',
        width: 960,
        height: 640,
      },
    ],
  },
  {
    slug: 'digital-marketing-canva',
    title: 'Digital Marketing & Canva Practice',
    classification: 'Practical Self-Directed Project',
    shortDescription:
      'Planned social media content for Facebook and Instagram and created basic marketing and product-content visuals using Canva.',
    categories: ['Content Planning', 'Canva Design'],
    filterTags: ['Canva Design', 'Social Media'],
    coverImage: {
      src: '/images/canva-social-preview.webp',
      alt: 'Illustrative preview of Facebook and Instagram social media content calendar and Canva layout grid',
      caption: 'Illustrative Content Preview — Social media planning & Canva visual draft',
      badge: 'Illustrative Preview',
      width: 960,
      height: 640,
    },
    overview:
      'A self-directed practical project built to strengthen social media content organization and visual communication skills using Canva across Facebook and Instagram formats.',
    objective:
      'To practice planning cohesive social media topics alongside clean, readable marketing and product-content graphics suited for entry-level digital marketing support.',
    researchProcess: [
      'Outlined content themes suited to Facebook and Instagram audiences, balancing product highlights with informative visuals.',
      'Structured post concepts around clear visual hierarchy so headlines and key product points stay readable at small screen sizes.',
      'Reviewed spacing, contrast, and typography layout choices for clean presentation.',
    ],
    workPerformed: [
      'Practised planning social media content for Facebook and Instagram.',
      'Used Canva to plan and create basic marketing and product-content visuals.',
      'Organized post ideas with paired caption drafts and visual feature callouts.',
    ],
    skillsDemonstrated: [
      'Canva Design',
      'Social Media Content Planning',
      'Facebook Content Planning',
      'Instagram Content Planning',
      'Basic Digital Marketing',
      'Written Communication',
    ],
    gallery: [
      {
        src: '/images/canva-social-preview.webp',
        alt: 'Illustrative preview of Facebook and Instagram content grid in Canva',
        caption: 'Illustrative Preview — Facebook & Instagram content format planning grid',
        badge: 'Illustrative Preview',
        width: 960,
        height: 640,
      },
      {
        src: '/images/canva-infographic-preview.webp',
        alt: 'Illustrative preview of Canva product-content visual and feature callouts',
        caption: 'Illustrative Preview — Product-content visual layout & feature callout structure',
        badge: 'Illustrative Preview',
        width: 960,
        height: 640,
      },
    ],
  },
];
