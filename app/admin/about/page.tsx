import { requireAuth } from '@/lib/auth';
import { getAllAboutSections, getAboutMedia } from '@/actions/about-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Text Sections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Текстові секції</CardTitle>
                <CardDescription>
                  {sections.length} секцій
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Додати секцію
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sections.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Немає секцій
              </p>
            ) : (
              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{section.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {section.sectionType}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Редагувати
                        </Button>
                        <Button size="sm" variant="destructive">
                          Видалити
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Медіа-галерея</CardTitle>
                <CardDescription>
                  {media.length} файлів
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Додати медіа
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {media.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Немає медіа
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    {item.mediaType === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.caption || ''}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-muted flex items-center justify-center">
                        <p className="text-sm">Відео</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        Видалити
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
