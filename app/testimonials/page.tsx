import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'Відгуки випускників - ЛІТ Олександрія',
  description: 'Відгуки та історії успіху випускників Олександрійського ліцею інформаційних технологій',
};

export default async function TestimonialsPage() {
  const allTestimonials = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isPublished, true))
    .orderBy(testimonials.order);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
          <MessageSquare className="mr-2 h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Історії успіху</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Відгуки випускників
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Наші випускники навчаються в провідних університетах України та успішно реалізують себе у професійній сфері
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {allTestimonials.map((testimonial) => {
          const initial = testimonial.name.charAt(0);

          return (
            <Card key={testimonial.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.photo ? (
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                      {initial}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Випуск {testimonial.graduationYear}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm text-muted-foreground mb-4 italic border-l-4 border-primary pl-4">
                  "{testimonial.content}"
                </blockquote>

                {testimonial.achievement && (
                  <div className="bg-blue-50 dark:bg-blue-950 rounded-lg px-3 py-2 mb-2">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {testimonial.achievement}
                    </p>
                  </div>
                )}

                {testimonial.university && (
                  <div className="text-xs font-semibold text-primary">
                    🎓 {testimonial.university}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
