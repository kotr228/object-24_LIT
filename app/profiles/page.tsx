import { db } from '@/db';
import { profiles } from '@/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Профілі навчання - ЛІТ Олександрія',
  description: 'Чотири профілі навчання: математично-інформаційний, українська філологія, біолого-хімічний, історичний',
};

export default async function ProfilesPage() {
  const allProfiles = await db.select().from(profiles).orderBy(profiles.order);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
          <BookOpen className="mr-2 h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Обирайте свій шлях</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Профілі навчання
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ми пропонуємо чотири напрямки поглибленого навчання для розвитку ваших талантів
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {allProfiles.map((profile) => {
          const colorMap: Record<string, { gradient: string; bg: string }> = {
            blue: {
              gradient: 'from-blue-500 to-cyan-500',
              bg: 'bg-blue-50 dark:bg-blue-950'
            },
            yellow: {
              gradient: 'from-yellow-500 to-orange-500',
              bg: 'bg-yellow-50 dark:bg-yellow-950'
            },
            green: {
              gradient: 'from-green-500 to-emerald-500',
              bg: 'bg-green-50 dark:bg-green-950'
            },
            purple: {
              gradient: 'from-purple-500 to-pink-500',
              bg: 'bg-purple-50 dark:bg-purple-950'
            },
          };
          const colors = colorMap[profile.color || 'blue'];
          const subjects = profile.subjects ? JSON.parse(profile.subjects) : [];

          return (
            <Card key={profile.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className={colors.bg}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-4`}>
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{profile.title}</CardTitle>
                <CardDescription className="text-base">{profile.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {profile.fullDescription && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {profile.fullDescription}
                  </p>
                )}

                {subjects.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Основні предмети:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link href={`/profiles/${profile.slug}`}>
                  <Button className="w-full group-hover:shadow-md" variant="default">
                    Детальніше про профіль
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
