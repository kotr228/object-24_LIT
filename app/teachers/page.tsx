import { db } from '@/db';
import { teachers } from '@/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Phone } from 'lucide-react';

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

          return (
            <Card key={teacher.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  {teacher.photo ? (
                    <img
                      src={teacher.photo}
                      alt={`${teacher.firstName} ${teacher.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {initials}
                    </div>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {teacher.firstName} {teacher.lastName}
                    </CardTitle>
                    {teacher.middleName && (
                      <p className="text-sm text-muted-foreground">{teacher.middleName}</p>
                    )}
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg px-3 py-2 mb-2">
                  <p className="text-sm font-semibold text-primary">{teacher.position}</p>
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
          );
        })}
      </div>
    </div>
  );
}
