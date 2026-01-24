import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowLeft, FileText, Video, Presentation } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProfileMedia } from '@/actions/profile-media';
import Image from 'next/image';

export async function generateStaticParams() {
  const allProfiles = await db.select().from(profiles);
  return allProfiles.map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.slug, slug),
  });

  if (!profile) return { title: 'Профіль не знайдено' };

  return {
    title: `${profile.title} - Профілі навчання`,
    description: profile.description,
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.slug, slug),
  });

  if (!profile) {
    notFound();
  }

  const media = await getProfileMedia(profile.id);

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    red: 'from-red-500 to-rose-500',
    indigo: 'from-indigo-500 to-purple-500',
  };
  const gradient = colorMap[profile.color || 'blue'];

  let subjects: string[] = [];
  try {
    subjects = profile.subjects ? JSON.parse(profile.subjects) : [];
  } catch {
    subjects = profile.subjects ? profile.subjects.split(',').map(s => s.trim()) : [];
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/profiles">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Всі профілі
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-4xl mb-4">{profile.title}</CardTitle>
            <CardDescription className="text-lg">{profile.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {profile.fullDescription && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Про профіль</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {profile.fullDescription}
                </p>
              </div>
            )}

            {subjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Профільні предмети</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {media.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Презентації та матеріали</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {media.map((item) => {
                    const isVideo = item.mediaType === 'video';
                    const isPresentation = item.mediaType === 'presentation';
                    const icon = isVideo ? Video : isPresentation ? Presentation : FileText;
                    const Icon = icon;

                    return (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 group"
                          >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold group-hover:text-primary transition-colors mb-1">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-6 border-t">
              <Card className="bg-muted/40">
                <CardHeader>
                  <CardTitle className="text-lg">Цікавить цей профіль?</CardTitle>
                  <CardDescription>
                    Дізнайтеся більше про процес вступу та навчання
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/about">
                    <Button>Дізнатися більше</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
