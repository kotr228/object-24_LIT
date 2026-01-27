import { Hero } from '@/components/hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { profiles, testimonials, news } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, MessageSquare, Newspaper, GraduationCap, Award, Target } from 'lucide-react';
import { ResponsiveCarousel } from '@/components/ui/carousel';
import Image from 'next/image';
import { getAboutSections } from '@/actions/about-content';

export default async function HomePage() {
  // Fetch data for homepage - get more items for carousel rotation
  const [latestProfiles, latestTestimonials, latestNews, aboutSections] = await Promise.all([
    db.select().from(profiles).orderBy(profiles.order),
    db.select().from(testimonials).where(eq(testimonials.isPublished, true)).orderBy(testimonials.order).limit(9),
    db.select().from(news).where(eq(news.isPublished, true)).orderBy(desc(news.publishedAt)).limit(9),
    getAboutSections(),
  ]);

  // Filter main sections to show on homepage (limit to first 3)
  const mainAboutSections = aboutSections.filter(s => s.sectionType === 'main').slice(0, 3);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* About Section - Main Info */}
      {mainAboutSections.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm mb-4">
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Про ліцей</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Олександрійський ліцей інформаційних технологій
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
              {mainAboutSections.map((section) => {
                const colSpan = section.content && section.content.length < 300 ? 'md:col-span-1' :
                               section.content && section.content.length < 700 ? 'md:col-span-2' : 'md:col-span-3';

                return (
                  <Card key={section.id} className={`border-2 hover:shadow-lg transition-shadow ${colSpan}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      <p className="whitespace-pre-wrap break-words">{section.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Дізнатись більше
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Profiles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
              <BookOpen className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Чотири напрямки</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Профілі навчання
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Обирайте напрямок відповідно до ваших інтересів та майбутньої професії
            </p>
          </div>

          <ResponsiveCarousel autoplayDelay={20000}>
            {latestProfiles.map((profile) => {
              const colorMap: Record<string, string> = {
                blue: 'from-blue-500 to-cyan-500',
                yellow: 'from-yellow-500 to-orange-500',
                green: 'from-green-500 to-emerald-500',
                purple: 'from-purple-500 to-pink-500',
              };
              const gradient = colorMap[profile.color || 'blue'];

              return (
                <Card key={profile.id} className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{profile.title}</CardTitle>
                    <CardDescription>{profile.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/profiles/${profile.slug}`}>
                      <Button variant="ghost" className="w-full group-hover:bg-accent" size="sm">
                        Детальніше
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </ResponsiveCarousel>

          <div className="mt-12 text-center">
            <Link href="/profiles">
              <Button size="lg" variant="outline">
                Всі профілі
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
              <MessageSquare className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Історії успіху</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Відгуки випускників
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Наші випускники навчаються в провідних університетах України
            </p>
          </div>

          <ResponsiveCarousel autoplayDelay={20000}>
            {latestTestimonials.map((testimonial) => {
              const initial = testimonial.name.charAt(0);
              const cardColor = testimonial.cardColor || '#10b981';

              return (
                <Card
                  key={testimonial.id}
                  className="hover:shadow-lg transition-shadow border-t-4 h-full"
                  style={{ borderTopColor: cardColor }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.photo ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.photo}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: cardColor }}
                        >
                          {initial}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          Випуск {testimonial.graduationYear}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote
                      className="text-sm text-muted-foreground mb-4 italic border-l-4 pl-4"
                      style={{ borderLeftColor: cardColor }}
                    >
                      "{testimonial.content}"
                    </blockquote>
                    {testimonial.achievement && (
                      <div
                        className="rounded-lg px-3 py-2 mb-2"
                        style={{ backgroundColor: `${cardColor}15` }}
                      >
                        <p className="text-xs font-semibold" style={{ color: cardColor }}>
                          {testimonial.achievement}
                        </p>
                      </div>
                    )}
                    {testimonial.university && (
                      <div className="text-xs font-semibold" style={{ color: cardColor }}>
                        🎓 {testimonial.university}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </ResponsiveCarousel>

          <div className="mt-12 text-center">
            <Link href="/testimonials">
              <Button size="lg" variant="outline">
                Всі відгуки
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      {latestNews.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
                <Newspaper className="mr-2 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Актуальні події</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Новини та оголошення
              </h2>
            </div>

            <ResponsiveCarousel autoplayDelay={20000}>
              {latestNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="text-xs text-muted-foreground mb-2">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('uk-UA') : ''}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/news/${item.slug}`}>
                      <Button variant="ghost" size="sm">
                        Читати далі
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveCarousel>

            <div className="mt-12 text-center">
              <Link href="/news">
                <Button size="lg" variant="outline">
                  Всі новини
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl sm:text-4xl mb-4">
                Готові приєднатися до нас?
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Дізнайтеся більше про процес вступу та наші програми навчання
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4 pb-12">
              <Link href="/about">
                <Button size="lg" variant="secondary">
                  Про ліцей
                </Button>
              </Link>
              <Link href="/teachers">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Наші вчителі
                  <Users className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
