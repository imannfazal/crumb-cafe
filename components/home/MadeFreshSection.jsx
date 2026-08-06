import Image from 'next/image';

export default function MadeFreshSection() {
  return (
    <section className=" px-6 pt-10 pb-6 text-center">
      <Image
        src="/images/illustrations/utensils.svg"
        alt=""
        width={68}
        height={68}
        className="mx-auto mb-4 mt-5"
      />

      <h2 className="font-hand text-[30px] text-crumb-primary mb-3">
        Made fresh, just for you
      </h2>

      <p className="text-[18px] text-[#904D23] w-[332px] mx-auto leading-tight">
        Good things take a little time. Your order is baked fresh, just for you, and sent to your door still warm from the oven.
      </p>

      <Image
        src="/images/illustrations/bakery-house.svg"
        alt=""
        width={220}
        height={220}
        className="mx-auto mt-8"
      />
    </section>
  );
}