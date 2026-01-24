'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teacherSchema, type TeacherFormData } from '@/lib/validations/teacher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ImageUpload } from '@/components/ui/image-upload';
import { createTeacher, updateTeacher } from '@/actions/teachers';
import { toast } from 'sonner';

interface TeacherFormProps {
  teacher?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeacherForm({ teacher, open, onOpenChange }: TeacherFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: teacher || {
      firstName: '',
      lastName: '',
      middleName: '',
      position: '',
      specialization: '',
      bio: '',
      email: '',
      phone: '',
      photo: '',
      cardColor: '#3b82f6',
      order: 0,
    },
  });

  const onSubmit = async (data: TeacherFormData) => {
    setLoading(true);
    try {
      const result = teacher
        ? await updateTeacher(teacher.id, data)
        : await createTeacher(data);

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
            {teacher ? 'Редагувати вчителя' : 'Додати вчителя'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Прізвище *</Label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">Ім'я *</Label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="middleName">По батькові</Label>
            <Input id="middleName" {...register('middleName')} />
            {errors.middleName && (
              <p className="text-sm text-red-500">{errors.middleName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Посада *</Label>
            <Input id="position" {...register('position')} />
            {errors.position && (
              <p className="text-sm text-red-500">{errors.position.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Спеціалізація *</Label>
            <Input id="specialization" {...register('specialization')} />
            {errors.specialization && (
              <p className="text-sm text-red-500">{errors.specialization.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Біографія</Label>
            <Textarea id="bio" {...register('bio')} rows={3} />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" {...register('phone')} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Фото вчителя"
                value={field.value}
                onChange={field.onChange}
                folder="teachers"
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
                  placeholder="#3b82f6"
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Скасувати
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Збереження...' : teacher ? 'Оновити' : 'Створити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
