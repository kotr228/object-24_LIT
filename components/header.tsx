'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

const navigation = [
  { name: 'Головна', href: '/' },
  { name: 'Профілі', href: '/profiles' },
  { name: 'Вчителі', href: '/teachers' },
  { name: 'Відгуки', href: '/testimonials' },
  { name: 'Новини', href: '/news' },
  { name: 'Про нас', href: '/about' },
  { name: 'Реєстрація', href: '/register' },
];

interface HeaderProps {
  logoType?: 'new' | 'old';
}

export function Header({ logoType = 'new' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoSrc = logoType === 'new' ? '/img/LIT.png' : '/img/LITold.png';
  const logoWidth = logoType === 'new' ? 60 : 45;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <nav
          className="container flex items-center justify-between p-4"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="ЛІТ Олександрія"
                width={logoWidth}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Відкрити меню</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Адмін панель
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu - outside header to ensure full screen overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-[9999] w-[85vw] max-w-sm overflow-y-auto bg-background/95 backdrop-blur-md px-6 py-6 shadow-2xl lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image
                  src={logoSrc}
                  alt="ЛІТ Олександрія"
                  width={logoWidth}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Закрити меню</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Адмін панель
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
