'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createProfile, updateProfile } from '@/actions/profiles';
import { toast } from 'sonner';

interface ProfileFormProps {
  profile?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileForm({ profile, open, onOpenChange }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(profile?.color || 'blue');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {
      title: '',
      slug: '',
      description: '',
      fullDescription: '',
      icon: 'BookOpen',
      color: 'blue',
      subjects: '',
      order: 0,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const result = profile
        ? await updateProfile(profile.id, { ...data, color })
        : await createProfile({ ...data, color });

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
            {profile ? 'Редагувати профіль' : 'Додати профіль'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Назва *</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input id="slug" {...register('slug')} placeholder="math-it" />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Короткий опис *</Label>
            <Textarea id="description" {...register('description')} rows={2} />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Повний опис</Label>
            <Textarea id="fullDescription" {...register('fullDescription')} rows={4} />
            {errors.fullDescription && (
              <p className="text-sm text-red-500">{errors.fullDescription.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Колір</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Синій</SelectItem>
                  <SelectItem value="yellow">Жовтий</SelectItem>
                  <SelectItem value="green">Зелений</SelectItem>
                  <SelectItem value="purple">Фіолетовий</SelectItem>
                  <SelectItem value="red">Червоний</SelectItem>
                  <SelectItem value="indigo">Індіго</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Порядок</Label>
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

          <div className="space-y-2">
            <Label htmlFor="subjects">Предмети (через кому)</Label>
            <Input id="subjects" {...register('subjects')} placeholder="Математика, Інформатика" />
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
              {loading ? 'Збереження...' : profile ? 'Оновити' : 'Створити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
