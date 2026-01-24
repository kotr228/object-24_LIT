import { Hero } from '@/components/hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { profiles, testimonials, news } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, MessageSquare, Newspaper } from 'lucide-react';

export default async function HomePage() {
  // Fetch data for homepage
  const [latestProfiles, latestTestimonials, latestNews] = await Promise.all([
    db.select().from(profiles).orderBy(profiles.order).limit(4),
    db.select().from(testimonials).where(eq(testimonials.isPublished, true)).orderBy(testimonials.order).limit(3),
    db.select().from(news).where(eq(news.isPublished, true)).orderBy(desc(news.publishedAt)).limit(3),
  ]);

  return (
    <div className="flex flex-col">
      <Hero />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProfiles.map((profile) => {
              const colorMap: Record<string, string> = {
                blue: 'from-blue-500 to-cyan-500',
                yellow: 'from-yellow-500 to-orange-500',
                green: 'from-green-500 to-emerald-500',
                purple: 'from-purple-500 to-pink-500',
              };
              const gradient = colorMap[profile.color || 'blue'];

              return (
                <Card key={profile.id} className="group hover:shadow-lg transition-all duration-300">
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
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>Випуск {testimonial.graduationYear}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{testimonial.content}</p>
                  {testimonial.university && (
                    <div className="text-xs font-semibold text-primary">
                      {testimonial.university}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
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
            </div>

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
