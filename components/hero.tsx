import Link from 'next/link';
import { ArrowRight, GraduationCap, Users, Award } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#hero-pattern)"
          />
        </svg>
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm dark:bg-gray-800">
            <GraduationCap className="mr-2 h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              Сучасна освіта для майбутніх лідерів
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Олександрійський ліцей інформаційних технологій
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Готуємо майбутніх фахівців у галузі ІТ, філології, природничих та
            гуманітарних наук. Індивідуальний підхід, сучасне обладнання,
            досвідчені вчителі.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/profiles">
              <Button size="lg" className="gap-2">
                Профілі навчання
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Дізнатися більше
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm text-muted-foreground">
                Досвідчених вчителів
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">
                Профілі навчання
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">
                Випускників щороку
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
