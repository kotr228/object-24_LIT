import { db } from '@/db';
import { news } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Новини - ЛІТ Олександрія',
  description: 'Актуальні новини та оголошення Олександрійського ліцею інформаційних технологій',
};

export default async function NewsPage() {
  const allNews = await db
    .select()
    .from(news)
    .where(eq(news.isPublished, true))
    .orderBy(desc(news.publishedAt));

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
          <Newspaper className="mr-2 h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Актуальні події</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Новини та оголошення
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Будьте в курсі всіх подій та досягнень нашого ліцею
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {allNews.map((item) => {
          const categoryColors: Record<string, string> = {
            events: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            achievements: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            general: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
          };

          const categoryColor = categoryColors[item.category] || categoryColors.general;

          return (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString('uk-UA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColor}`}>
                    {item.category === 'events' && 'Подія'}
                    {item.category === 'achievements' && 'Досягнення'}
                    {item.category === 'general' && 'Загальне'}
                  </span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                {item.excerpt && (
                  <CardDescription className="text-base">{item.excerpt}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Link href={`/news/${item.slug}`}>
                  <Button variant="ghost" className="group-hover:bg-accent">
                    Читати далі
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">
            Поки що немає опублікованих новин
          </p>
        </div>
      )}
    </div>
  );
}
