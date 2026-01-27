'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsFormData } from '@/lib/validations/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateSettings } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface SettingsFormProps {
  initialData: SettingsFormData & { id: string; updatedAt: string };
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      schoolName: initialData.schoolName,
      schoolDescription: initialData.schoolDescription,
      address: initialData.address,
      phone: initialData.phone,
      email: initialData.email,
      logoType: initialData.logoType || 'new',
    },
  });

  const logoType = watch('logoType');

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    try {
      const result = await updateSettings(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Помилка при збереженні налаштувань');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Основні налаштування</CardTitle>
        <CardDescription>
          Редагуйте контактну інформацію та базові дані сайту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logoType">Логотип школи</Label>
            <Select
              value={logoType}
              onValueChange={(value) => setValue('logoType', value as 'new' | 'old')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть логотип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Новий логотип</SelectItem>
                <SelectItem value="old">Старий логотип</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">Попередній перегляд:</p>
              <div className="relative w-full h-32 flex items-center justify-start">
                <Image
                  src={logoType === 'new' ? '/img/LIT.png' : '/img/LITold.png'}
                  alt="Логотип"
                  width={logoType === 'new' ? 240 : 180}
                  height={120}
                  className="object-contain"
                  style={{ maxHeight: '120px', width: 'auto' }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolName">Назва школи</Label>
            <Input
              id="schoolName"
              {...register('schoolName')}
              placeholder="Олександрійський ліцей інформаційних технологій"
            />
            {errors.schoolName && (
              <p className="text-sm text-destructive">{errors.schoolName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolDescription">Опис школи</Label>
            <Textarea
              id="schoolDescription"
              {...register('schoolDescription')}
              placeholder="Сучасна освіта, професійні вчителі..."
              rows={3}
            />
            {errors.schoolDescription && (
              <p className="text-sm text-destructive">{errors.schoolDescription.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адреса</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="м. Олександрія, Кіровоградська область"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+38 (012) 345-67-89"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="info@lit.kr.ua"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Зберегти зміни
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
