import { requireAuth } from '@/lib/auth';
import { getAllAboutSections, getAboutMedia } from '@/actions/about-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AboutContentManager } from './about-content-manager';

export default async function AboutContentPage() {
  await requireAuth();
  const sections = await getAllAboutSections();
  const media = await getAboutMedia();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Контент сторінки "Про нас"</h1>
          <p className="text-muted-foreground mt-2">
            Управління текстовими секціями та медіа-галереєю
          </p>
        </div>
      </div>

      <AboutContentManager sections={sections} media={media} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Попередній перегляд</CardTitle>
          <CardDescription>
            Як виглядатиме сторінка "Про нас"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <a href="/about" target="_blank" rel="noopener noreferrer">
              Відкрити сторінку
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
