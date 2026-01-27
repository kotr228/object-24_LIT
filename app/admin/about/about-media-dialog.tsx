'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAboutMedia } from '@/actions/about-content';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const mediaSchema = z.object({
  url: z.string().min(1, 'URL обов\'язковий'),
  mediaType: z.enum(['image', 'video']),
  caption: z.string().optional(),
  order: z.number().int().min(0),
});

type MediaFormData = z.infer<typeof mediaSchema>;

interface AboutMedia {
  id: string;
  url: string;
  mediaType: string;
  caption: string | null;
  order: number;
  createdAt: Date;
}

interface AboutMediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (media: AboutMedia) => void;
}

export function AboutMediaDialog({ open, onOpenChange, onSuccess }: AboutMediaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      url: '',
      mediaType: 'image',
      caption: '',
      order: 0,
    },
  });

  const mediaType = watch('mediaType');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'about');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const { url } = await response.json();
      setValue('url', url);
      toast.success('Файл завантажено');
    } catch (error) {
      toast.error('Помилка завантаження файлу');
    } finally {
      setUploadingFile(false);
    }
  };

  const onSubmit = async (data: MediaFormData) => {
    setIsLoading(true);
    try {
      const result = await createAboutMedia(data);

      if (result.success && result.data) {
        toast.success(result.message);
        onSuccess(result.data as AboutMedia);
        reset();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати медіа</DialogTitle>
          <DialogDescription>
            Завантажте зображення або додайте відео
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mediaType">Тип медіа</Label>
            <Select
              value={mediaType}
              onValueChange={(value) => setValue('mediaType', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Зображення</SelectItem>
                <SelectItem value="video">Відео</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mediaType === 'image' ? (
            <div className="space-y-2">
              <Label htmlFor="file">Завантажити файл</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-sm text-muted-foreground">Завантаження...</p>}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="url">URL відео (YouTube, Vimeo)</Label>
              <Input
                id="url"
                {...register('url')}
                placeholder="https://youtube.com/watch?v=..."
              />
              {errors.url && (
                <p className="text-sm text-destructive">{errors.url.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="caption">Підпис (опціонально)</Label>
            <Input
              id="caption"
              {...register('caption')}
              placeholder="Опис медіа"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Порядок відображення</Label>
            <Input
              id="order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              placeholder="0"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button type="submit" disabled={isLoading || uploadingFile}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Додати
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
