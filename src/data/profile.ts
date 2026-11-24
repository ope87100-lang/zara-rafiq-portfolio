export interface ProfileData {
  name: string;
  wordmark: string;
  rolesLine: string;
  eyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroIntro: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  attributes: string[];
  expertiseIndicators: { label: string; detail: string }[];
  location: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  cvPath: string;
  cvFileName: string;
  portraitSrc: string;
  portraitWebp: string;
  portraitAlt: string;
  contactBanner: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
  };
  footer: {
    summary: string;
    copyrightOwner: string;
  };
}

export const PROFILE: ProfileData = {
  name: 'Zara Rafiq',
  wordmark: 'Zara Rafiq.',
  rolesLine: 'Junior Digital Marketing Assistant | E-commerce Assistant | eBay Listing Assistant',
  eyebrow: 'DIGITAL MARKETING & E-COMMERCE',
  heroHeadlineLine1: 'Hello, I’m',
  heroHeadlineLine2: 'Zara Rafiq',
  heroIntro:
    'An entry-level digital marketing and e-commerce candidate with practical experience in eBay listings, product research, content planning and Canva design.',
  aboutHeading: 'A Little About Me',
  aboutParagraphs: [
    'I’m Zara Rafiq, an entry-level digital marketing and e-commerce candidate based in Lahore, Pakistan. I focus on eBay listing preparation, product research, creative content and digital business operations.',
    'Through self-directed practical projects, I have developed experience preparing product listings, researching product information, writing titles and descriptions, and planning digital content using Canva.',
  ],
  attributes: ['Detail-Oriented', 'Organized', 'Creative', 'Eager to Learn'],
  expertiseIndicators: [
    { label: 'E-commerce', detail: 'eBay Listing Practice' },
    { label: 'Product Research', detail: 'Item Specifics & Specs' },
    { label: 'Content Planning', detail: 'Facebook & Instagram' },
    { label: 'Canva Design', detail: 'Product-Content Visuals' },
  ],
  location: 'Lahore, Pakistan',
  email: 'zararafiq18@gmail.com',
  phoneDisplay: '0310 7143263',
  phoneHref: 'tel:+923107143263',
  cvPath: '/documents/Zara-Rafiq-CV.pdf',
  cvFileName: 'Zara-Rafiq-CV.pdf',
  portraitSrc: '/images/zara-rafiq-portrait.jpg',
  portraitWebp: '/images/zara-rafiq-portrait.webp',
  portraitAlt: 'Portrait photograph of Zara Rafiq, Digital Marketing and E-commerce portfolio owner',
  contactBanner: {
    eyebrow: 'GET IN TOUCH',
    heading: 'Let’s Connect',
    description:
      'I’m open to opportunities in digital marketing, e-commerce assistance and creative content. Feel free to get in touch to discuss a suitable opportunity.',
    ctaLabel: 'Contact Me',
  },
  footer: {
    summary:
      'Digital Marketing & E-commerce Assistant based in Lahore, Pakistan — focused on accurate eBay listing content, product research, Canva visuals, and organized digital work.',
    copyrightOwner: 'Zara Rafiq',
  },
};
