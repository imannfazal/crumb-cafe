const DOODLES = {
  crumb: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="8" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="14" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="18" cy="14" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  sparkle: (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L11.5 8L18 10L11.5 12L10 18L8.5 12L2 10L8.5 8L10 2Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  ),
  swirl: (
    <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 4C8 4 4 8 4 14C4 19 8 22 12 22C15 22 17 20 17 17C17 15 15.5 13.5 13.5 13.5C12 13.5 11 14.5 11 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
    </svg>
  ),
};

export default function Doodle({ type = 'crumb', className = '', colorClass = 'text-crumb-primary' }) {
  return <div className={`${colorClass} ${className}`}>{DOODLES[type]}</div>;
}