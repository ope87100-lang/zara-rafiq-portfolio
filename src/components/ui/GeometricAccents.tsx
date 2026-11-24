import {
  ShoppingCart,
  Search,
  FileText,
  PenTool,
  Layers,
  Megaphone,
} from 'lucide-react';
import type { SkillIconKey } from '../../data/skills';

/** 8-petal geometric yellow starburst matching the approved reference design */
export function StarburstAccent({
  className = 'w-12 h-12',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g fill="#F7D928">
        <rect x="27" y="4" width="10" height="56" rx="5" />
        <rect x="4" y="27" width="56" height="10" rx="5" />
        <rect
          x="27"
          y="4"
          width="10"
          height="56"
          rx="5"
          transform="rotate(45 32 32)"
        />
        <rect
          x="27"
          y="4"
          width="10"
          height="56"
          rx="5"
          transform="rotate(-45 32 32)"
        />
      </g>
    </svg>
  );
}

/** 4-point sparkle accent matching the reference divider & corner highlights */
export function SparkleAccent({
  className = 'w-5 h-5',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 1C17.4 10.2 21.8 14.6 31 16C21.8 17.4 17.4 21.8 16 31C14.6 21.8 10.2 17.4 1 16C10.2 14.6 14.6 10.2 16 1Z"
        fill="#F7D928"
      />
    </svg>
  );
}

export function SkillIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: SkillIconKey;
  className?: string;
}) {
  const props = { className, strokeWidth: 1.65, 'aria-hidden': true as const };
  switch (name) {
    case 'shopping-cart':
      return <ShoppingCart {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'file-text':
      return <FileText {...props} />;
    case 'pen-tool':
      return <PenTool {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'megaphone':
      return <Megaphone {...props} />;
  }
}
