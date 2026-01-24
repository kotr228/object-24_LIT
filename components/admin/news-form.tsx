'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsSchema, type NewsFormData } from '@/lib/validations/news';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createNews, updateNews } from '@/actions/news';
import { toast } from 'sonner';

interface NewsFormProps {
  news?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsForm({ news, open, onOpenChange }: NewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(news?.category || 'general');
  const [isPublished, setIsPublished] = useState(news?.isPublished ?? true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: news || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: 'general',
      isPublished: true,
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
        category,
        isPublished,
      };

      const result = news
        ? await updateNews(news.id, formData)
        : await createNews(formData);

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

  const categoryOptions = [
    { value: 'events', label: 'Події' },
    { value: 'achievements', label: 'Досягнення' },
    { value: 'announcements', label: 'Оголошення' },
    { value: 'general', label: 'Загальні' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {news ? 'Редагувати новину' : 'Додати новину'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок *</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input id="slug" {...register('slug')} placeholder="news-title-2026" />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Категорія *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Короткий опис *</Label>
            <Textarea id="excerpt" {...register('excerpt')} rows={2} />
            {errors.excerpt && (
              <p className="text-sm text-red-500">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Повний текст *</Label>
            <Textarea id="content" {...register('content')} rows={6} />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">URL обкладинки</Label>
            <Input id="coverImage" {...register('coverImage')} placeholder="https://..." />
            {errors.coverImage && (
              <p className="text-sm text-red-500">{errors.coverImage.message}</p>
            )}
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
              {loading ? 'Збереження...' : news ? 'Оновити' : 'Створити'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
