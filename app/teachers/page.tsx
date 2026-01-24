import { db } from '@/db';
import { teachers } from '@/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Наші вчителі - ЛІТ Олександрія',
  description: 'Досвідчені та професійні вчителі Олександрійського ліцею інформаційних технологій',
};

export default async function TeachersPage() {
  const allTeachers = await db.select().from(teachers).orderBy(teachers.order);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
          <Users className="mr-2 h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Наша команда</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Наші вчителі
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Професіонали своєї справи з багаторічним досвідом роботи
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTeachers.map((teacher) => {
          const initials = `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`;
          const cardColor = teacher.cardColor || '#3b82f6';

          return (
            <Link href={`/teachers/${teacher.id}`} key={teacher.id}>
              <Card
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-t-4"
                style={{ borderTopColor: cardColor }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    {teacher.photo ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4" style={{ ringColor: cardColor }}>
                        <Image
                          src={teacher.photo}
                          alt={`${teacher.firstName} ${teacher.lastName}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: cardColor }}
                      >
                        {initials}
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                        {teacher.firstName} {teacher.lastName}
                      </CardTitle>
                      {teacher.middleName && (
                        <p className="text-sm text-muted-foreground">{teacher.middleName}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="rounded-lg px-3 py-2 mb-2"
                    style={{ backgroundColor: `${cardColor}15` }}
                  >
                    <p className="text-sm font-semibold" style={{ color: cardColor }}>{teacher.position}</p>
                  </div>
                  <CardDescription className="text-sm">{teacher.specialization}</CardDescription>
                </CardHeader>
              <CardContent>
                {teacher.bio && (
                  <p className="text-sm text-muted-foreground mb-4">{teacher.bio}</p>
                )}
                <div className="space-y-2 text-sm">
                  {teacher.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${teacher.email}`} className="hover:text-primary">
                        {teacher.email}
                      </a>
                    </div>
                  )}
                  {teacher.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${teacher.phone}`} className="hover:text-primary">
                        {teacher.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
