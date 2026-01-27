import { db } from '@/db';
import { teachers } from '@/db/schema';
import { Users } from 'lucide-react';
import { TeacherCard } from '@/components/teacher-card';
import { ResponsiveCarousel } from '@/components/ui/carousel';

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

      <ResponsiveCarousel autoplayDelay={20000}>
        {allTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </ResponsiveCarousel>
    </div>
  );
}
