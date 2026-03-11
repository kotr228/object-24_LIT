'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAboutSection, updateAboutSection } from '@/actions/about-content';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const sectionSchema = z.object({
  title: z.string().min(1, 'Заголовок обов\'язковий'),
  content: z.string().optional(),
  sectionType: z.enum(['main', 'mission', 'values', 'history', 'achievements']),
  order: z.number().int().min(0),
});

type SectionFormData = z.infer<typeof sectionSchema>;

interface AboutSection {
  id: string;
  title: string;
  content: string | null;
  sectionType: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AboutSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: AboutSection | null;
  onSuccess: (section: AboutSection) => void;
}

export function AboutSectionDialog({ open, onOpenChange, section, onSuccess }: AboutSectionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: '',
      content: '',
      sectionType: 'main',
      order: 0,
    },
  });

  const sectionType = watch('sectionType');

  useEffect(() => {
    if (section) {
      reset({
        title: section.title,
        content: section.content || '',
        sectionType: section.sectionType as any,
        order: section.order,
      });
    } else {
      reset({
        title: '',
        content: '',
        sectionType: 'main',
        order: 0,
      });
    }
  }, [section, reset, open]);

  const onSubmit = async (data: SectionFormData) => {
    setIsLoading(true);
    try {
      const result = section
        ? await updateAboutSection(section.id, data)
        : await createAboutSection(data);

      if (result.success && result.data) {
        toast.success(result.message);
        onSuccess(result.data as AboutSection);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Помилка при збереженні');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{section ? 'Редагувати секцію' : 'Додати секцію'}</DialogTitle>
          <DialogDescription>
            Заповніть інформацію про секцію сторінки "Про нас"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sectionType">Тип секції</Label>
            <Select
              value={sectionType}
              onValueChange={(value) => setValue('sectionType', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Основна інформація</SelectItem>
                <SelectItem value="mission">Місія</SelectItem>
                <SelectItem value="values">Цінності</SelectItem>
                <SelectItem value="history">Історія</SelectItem>
                <SelectItem value="achievements">Досягнення</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Наша місія"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Контент</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="Опишіть секцію..."
              rows={6}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Порядок відображення</Label>
            <Input
              id="order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.order && (
              <p className="text-sm text-destructive">{errors.order.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {section ? 'Зберегти' : 'Створити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
