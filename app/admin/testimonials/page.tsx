import { requireAuth } from '@/lib/auth';
import { TestimonialsManagement } from './testimonials-management';
import { getAllTestimonials } from '@/actions/testimonials';

export const metadata = {
  title: 'Управління відгуками - Адмін панель',
};

export default async function TestimonialsAdminPage() {
  await requireAuth();
  const testimonials = await getAllTestimonials();

  return <TestimonialsManagement initialTestimonials={testimonials} />;
}
