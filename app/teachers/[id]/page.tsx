import { db } from '@/db';
import { teachers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TeacherPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const allTeachers = await db.select().from(teachers);
  return allTeachers.map((teacher) => ({
    id: teacher.id,
  }));
}

export async function generateMetadata({ params }: TeacherPageProps) {
  const [teacher] = await db
    .select()
    .from(teachers)
    .where(eq(teachers.id, params.id))
    .limit(1);

  if (!teacher) {
    return {
      title: 'Вчителя не знайдено',
    };
  }

  return {
    title: `${teacher.firstName} ${teacher.lastName} - ЛІТ Олександрія`,
    description: `${teacher.position} - ${teacher.specialization}`,
  };
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const [teacher] = await db
    .select()
    .from(teachers)
    .where(eq(teachers.id, params.id))
    .limit(1);

  if (!teacher) {
    notFound();
  }

  const initials = `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`;
  const cardColor = teacher.cardColor || '#3b82f6';

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link href="/teachers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до списку вчителів
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <div
            className="h-32 rounded-t-lg"
            style={{ backgroundColor: cardColor }}
          />
          <CardHeader className="relative pt-0">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
              {teacher.photo ? (
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-background bg-background">
                  <Image
                    src={teacher.photo}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-white font-bold text-4xl md:text-5xl ring-4 ring-background"
                  style={{ backgroundColor: cardColor }}
                >
                  {initials}
                </div>
              )}

              <div className="flex-1 pb-6">
                <CardTitle className="text-3xl md:text-4xl mb-2">
                  {teacher.firstName} {teacher.lastName}
                </CardTitle>
                {teacher.middleName && (
                  <p className="text-lg text-muted-foreground mb-2">{teacher.middleName}</p>
                )}
                <div
                  className="inline-block rounded-lg px-4 py-2"
                  style={{ backgroundColor: `${cardColor}15` }}
                >
                  <p className="font-semibold" style={{ color: cardColor }}>
                    {teacher.position}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Specialization */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Спеціалізація</h2>
              <p className="text-muted-foreground">{teacher.specialization}</p>
            </div>

            {/* Bio */}
            {teacher.bio && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Біографія</h2>
                <p className="text-muted-foreground whitespace-pre-line">{teacher.bio}</p>
              </div>
            )}

            {/* Contacts */}
            {(teacher.email || teacher.phone) && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Контакти</h2>
                <div className="space-y-3">
                  {teacher.email && (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${cardColor}15` }}
                      >
                        <Mail className="h-5 w-5" style={{ color: cardColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${teacher.email}`}
                          className="hover:underline font-medium"
                          style={{ color: cardColor }}
                        >
                          {teacher.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {teacher.phone && (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${cardColor}15` }}
                      >
                        <Phone className="h-5 w-5" style={{ color: cardColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <a
                          href={`tel:${teacher.phone}`}
                          className="hover:underline font-medium"
                          style={{ color: cardColor }}
                        >
                          {teacher.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
