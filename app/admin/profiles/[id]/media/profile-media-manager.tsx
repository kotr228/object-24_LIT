'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProfileMedia, deleteProfileMedia } from '@/actions/profile-media';
import { toast } from 'sonner';
import { Plus, Video, Presentation, FileText, Trash2, ExternalLink } from 'lucide-react';
import type { ProfileMedia } from '@/db/schema/profile-media';

interface ProfileMediaManagerProps {
  profileId: string;
  initialMedia: ProfileMedia[];
}

export function ProfileMediaManager({ profileId, initialMedia }: ProfileMediaManagerProps) {
  const [media, setMedia] = useState<ProfileMedia[]>(initialMedia);
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    mediaType: 'presentation' as 'presentation' | 'video' | 'document',
    title: '',
    url: '',
    description: '',
  });

  const handleAddMedia = async () => {
    if (!formData.title || !formData.url) {
      toast.error('Заповніть всі обов\'язкові поля');
      return;
    }

    setIsLoading(true);
    try {
      const result = await createProfileMedia({
        profileId,
        ...formData,
      });

      if (result.success) {
        toast.success(result.message);
        setIsAddingMedia(false);
        setFormData({
          mediaType: 'presentation',
          title: '',
          url: '',
          description: '',
        });
        // Refresh page to get updated media
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете видалити це медіа?')) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await deleteProfileMedia(id, profileId);
      if (result.success) {
        toast.success(result.message);
        setMedia(media.filter((m) => m.id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'presentation':
        return Presentation;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Відео';
      case 'presentation':
        return 'Презентація';
      case 'document':
        return 'Документ';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Медіа-файли</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {media.length} файл(ів)
              </p>
            </div>
            <Button onClick={() => setIsAddingMedia(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Додати медіа
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {media.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Немає доданих медіа-файлів
              </p>
              <Button onClick={() => setIsAddingMedia(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Додати перший файл
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {media.map((item) => {
                const Icon = getIcon(item.mediaType);
                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {getTypeLabel(item.mediaType)}
                          </p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {item.description}
                            </p>
                          )}
                          <div className="flex gap-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Відкрити
                              </Button>
                            </a>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteMedia(item.id)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Видалити
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Media Dialog */}
      <Dialog open={isAddingMedia} onOpenChange={setIsAddingMedia}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Додати медіа-файл</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediaType">Тип медіа *</Label>
              <Select
                value={formData.mediaType}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, mediaType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presentation">Презентація</SelectItem>
                  <SelectItem value="video">Відео</SelectItem>
                  <SelectItem value="document">Документ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Назва *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Наприклад: Вступна презентація"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://... або посилання на Google Drive/YouTube"
              />
              <p className="text-xs text-muted-foreground">
                Додайте пряме посилання на файл, Google Drive, YouTube відео тощо
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Опис</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Короткий опис медіа-файлу"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingMedia(false)}
              disabled={isLoading}
            >
              Скасувати
            </Button>
            <Button onClick={handleAddMedia} disabled={isLoading}>
              {isLoading ? 'Додавання...' : 'Додати'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
