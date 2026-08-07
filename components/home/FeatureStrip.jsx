import Image from 'next/image';

const features = [
    { icon: '/images/icons/leaf.svg', label: 'Fresh ingredients' },
    { icon: '/images/icons/heart.svg', label: 'Made with love' },
    { icon: '/images/icons/cupcake.svg', label: 'Small batches, big flavors' },
    { icon: '/images/icons/coffee-cup.svg', label: 'A cozy space for everyone' },
];

export default function FeatureStrip() {
    return (
        <div className="overflow-hidden">
            <section className="bg-crumb-bgLight/50 rounded-2xl mx-6 md:mx-32 px-4 py-5 flex justify-between items-start mt-5 md:my-24">
                {features.map((feature) => (
                    <div key={feature.label} className="flex flex-col items-center text-center w-1/4 md:w-1/4 px-1">
                        <Image
                            src={feature.icon}
                            alt=""
                            width={20}
                            height={20}
                            className="mb-2 md:w-[40px]"
                        />
                        <span className="text-[9px] md:text-[12px] md:pt-4 leading-[10px] md:leading-tight md:w-[80px] text-crumb-text font-body">
                            {feature.label}
                        </span>
                    </div>
                ))}
            </section>
        </div>
    );
}