import { db } from '@/db';
import { news } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const allNews = await db.select().from(news).where(eq(news.isPublished, true));
  return allNews.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await db.query.news.findFirst({
    where: eq(news.slug, slug),
  });

  if (!item) return { title: 'Новина не знайдена' };

  return {
    title: `${item.title} - Новини`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await db.query.news.findFirst({
    where: eq(news.slug, slug),
  });

  if (!item || !item.isPublished) {
    notFound();
  }

  const categoryMap: Record<string, string> = {
    events: 'Події',
    achievements: 'Досягнення',
    announcements: 'Оголошення',
    general: 'Загальні',
  };

  const categoryColorMap: Record<string, 'default' | 'success' | 'warning' | 'secondary'> = {
    events: 'default',
    achievements: 'success',
    announcements: 'warning',
    general: 'secondary',
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/news">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Всі новини
          </Button>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          {item.coverImage && (
            <div className="w-full h-[400px] overflow-hidden rounded-t-lg">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {item.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={new Date(item.publishedAt).toISOString()}>
                    {new Date(item.publishedAt).toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <Badge variant={categoryColorMap[item.category] || 'secondary'}>
                  {categoryMap[item.category] || item.category}
                </Badge>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>

            {item.excerpt && (
              <p className="text-xl text-muted-foreground">{item.excerpt}</p>
            )}
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-line leading-relaxed">
              {item.content}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/news">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Повернутися до новин
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
