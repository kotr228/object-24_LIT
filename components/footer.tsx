import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Про ліцей */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Олександрійський ліцей інформаційних технологій
            </h3>
            <p className="text-sm text-muted-foreground">
              Сучасна освіта, професійні вчителі, індивідуальний підхід до
              кожного учня.
            </p>
          </div>

          {/* Швидкі посилання */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/profiles"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Профілі навчання
                </Link>
              </li>
              <li>
                <Link
                  href="/teachers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Наші вчителі
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Відгуки випускників
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Новини
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>м. Олександрія, Кіровоградська область</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+380123456789" className="hover:text-primary">
                  +38 (012) 345-67-89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:info@lit.kr.ua"
                  className="hover:text-primary"
                >
                  info@lit.kr.ua
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Олександрійський ліцей інформаційних
            технологій. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
