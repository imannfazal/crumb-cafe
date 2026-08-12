export default function WaveDivider({ flip = false, color = '#FFF8ED' }) {
  return (
    <div className={flip ? 'rotate-180' : ''}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[50px] md:h-[80px] block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z"
          fill={color}
        />
      </svg>
    </div>
  );
}