export interface EducationEntry {
  id: string;
  qualification: string;
  institution?: string;
  status?: string;
  focus: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: string;
  note: string;
}

export const EDUCATION_META = {
  eyebrow: 'EDUCATION & LEARNING',
  heading: 'My Education',
  languagesHeading: 'Languages',
};

export const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: 'bbit',
    qualification: 'Bachelor’s in Business & Information Technology',
    institution: 'Allama Iqbal Open University',
    status: 'Currently in Progress',
    focus:
      'Building a combined academic foundation across business operations, digital communication, and information technology.',
  },
  {
    id: 'ics',
    qualification: 'Intermediate (ICS)',
    focus:
      'Pre-university computer science track strengthening analytical thinking, computing fundamentals, and structured problem solving.',
  },
  {
    id: 'matric',
    qualification: 'Matriculation in Computer Science',
    focus:
      'Secondary education with a focus on foundational computing concepts and technical literacy.',
  },
];

export const LANGUAGE_ENTRIES: LanguageEntry[] = [
  {
    id: 'urdu',
    language: 'Urdu',
    proficiency: 'Native',
    note: 'Full native fluency in spoken and written communication.',
  },
  {
    id: 'english',
    language: 'English',
    proficiency: 'Basic (Currently Improving)',
    note: 'Actively improving written and workplace English through daily reading, product copy drafting, and continuous study.',
  },
];
