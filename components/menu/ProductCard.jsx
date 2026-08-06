import Image from 'next/image';

export default function ProductCard({ name, image }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-crumb-primary mx-auto mb-6 w-[220px] h-[273px]">
          <span className="absolute top-4 left-0 right-0 text-center font-hand text-[25px] text-white/50 z-10">
            {name}
          </span>
          <Image
            src={image}
            alt={name}
            width={900}
            height={800}
            className="mt-10  w-[260px]"
          />
    </div>
  );
}