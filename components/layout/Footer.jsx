import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      {/* Social + email row */}
      <div className="px-6 py-6 flex justify-between items-center">
        <div className="flex gap-3">
          <a href="#" aria-label="Facebook">
            <Image src="/images/icons/facebook.svg" alt="" width={19} height={19} />
          </a>
          <a href="#" aria-label="Instagram">
            <Image src="/images/icons/instagram.svg" alt="" width={19} height={19} />
          </a>
        </div>
        <div className="text-right leading-tight">
          <p className="font-hand text-[21px] text-crumb-primary">Email us at:</p>
          <p className="text-[12px] text-[#904D23]">thecrumbcafe.com</p>
        </div>
      </div>

      {/* Bottom blue bar */}
      <div className="bg-crumb-primary px-6 py-12 flex justify-between items-center">
        <span className="font-hand text-white text-lg leading-tight">
          The Crumb<br />Cafe
        </span>
        <div className="flex gap-4">
          <Image src="/images/illustrations/footer-cookie.svg" alt="" width={50} height={30} />
          <Image src="/images/illustrations/footer-bag.svg" alt="" width={62} height={62} />
          <Image src="/images/illustrations/footer-cup.svg" alt="" width={37.92} height={27.92} />
        </div>
      </div>
    </footer>
  );
}