'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialSchema, type TestimonialFormData } from '@/lib/validations/testimonial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '@/components/ui/image-upload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createTestimonial, updateTestimonial } from '@/actions/testimonials';
import { toast } from 'sonner';

interface TestimonialFormProps {
  testimonial?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestimonialForm({ testimonial, open, onOpenChange }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(testimonial?.isPublished ?? true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial || {
      name: '',
      graduationYear: new Date().getFullYear(),
      content: '',
      achievement: '',
      university: '',
      photo: '',
      cardColor: '#10b981',
      isPublished: true,
      order: 0,
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
        isPublished,
      };

      const result = testimonial
        ? await updateTestimonial(testimonial.id, formData)
        : await createTestimonial(formData);

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
        reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Редагувати відгук' : 'Додати відгук'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ім'я випускника *</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="graduationYear">Рік випуску *</Label>
            <Input
              id="graduationYear"
              type="number"
              {...register('graduationYear', { valueAsNumber: true })}
            />
            {errors.graduationYear && (
              <p className="text-sm text-red-500">{errors.graduationYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Текст відгуку *</Label>
            <Textarea id="content" {...register('content')} rows={4} />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievement">Досягнення</Label>
            <Input id="achievement" {...register('achievement')} placeholder="Переможець олімпіади, автор наукової роботи..." />
            {errors.achievement && (
              <p className="text-sm text-red-500">{errors.achievement.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">Університет</Label>
            <Input id="university" {...register('university')} placeholder="КПІ, НаУКМА..." />
            {errors.university && (
              <p className="text-sm text-red-500">{errors.university.message}</p>
            )}
          </div>

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Фото випускника"
                value={field.value}
                onChange={field.onChange}
                folder="testimonials"
              />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardColor">Колір картки</Label>
              <div className="flex gap-2">
                <Input
                  id="cardColor"
                  type="color"
                  {...register('cardColor')}
                  className="h-10 w-20"
                />
                <Input
                  {...register('cardColor')}
                  placeholder="#10b981"
                />
              </div>
              {errors.cardColor && (
                <p className="text-sm text-red-500">{errors.cardColor.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Порядок сортування</Label>
              <Input
                id="order"
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
              {errors.order && (
                <p className="text-sm text-red-500">{errors.order.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublished"
              checked={isPublished}
              onCheckedChange={(checked) => setIsPublished(checked as boolean)}
            />
            <Label
              htmlFor="isPublished"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Опублікувати
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Скасувати
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Збереження...' : testimonial ? 'Оновити' : 'Створити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
