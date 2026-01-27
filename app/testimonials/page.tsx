import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, GraduationCap } from 'lucide-react';
import Image from 'next/image';

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
          const cardColor = testimonial.cardColor || '#10b981';

          return (
            <Card
              key={testimonial.id}
              className="group hover:shadow-lg transition-all duration-300 border-t-4"
              style={{ borderTopColor: cardColor }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.photo ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl"
                      style={{ backgroundColor: cardColor }}
                    >
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
                <blockquote
                  className="text-sm text-muted-foreground mb-4 italic border-l-4 pl-4"
                  style={{ borderLeftColor: cardColor }}
                >
                  "{testimonial.content}"
                </blockquote>

                {testimonial.achievement && (
                  <div
                    className="rounded-lg px-3 py-2 mb-2"
                    style={{ backgroundColor: `${cardColor}15` }}
                  >
                    <p className="text-xs font-semibold" style={{ color: cardColor }}>
                      {testimonial.achievement}
                    </p>
                  </div>
                )}

                {testimonial.university && (
                  <div className="text-xs font-semibold" style={{ color: cardColor }}>
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
