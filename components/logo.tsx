import Image from 'next/image';
import { getSettings } from '@/actions/settings';

export async function Logo({ className = '' }: { className?: string }) {
  const settings = await getSettings();
  const logoSrc = settings.logoType === 'new' ? '/img/LIT.png' : '/img/LITold.png';
  const logoWidth = settings.logoType === 'new' ? 60 : 45;
  const logoHeight = 40;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={logoSrc}
        alt="ЛІТ Олександрія"
        width={logoWidth}
        height={logoHeight}
        className="object-contain"
        priority
      />
    </div>
  );
}
