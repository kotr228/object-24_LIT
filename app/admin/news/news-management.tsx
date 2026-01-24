'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { NewsForm } from '@/components/admin/news-form';
import { deleteNews } from '@/actions/news';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewsManagementProps {
  initialNews: any[];
}

export function NewsManagement({ initialNews }: NewsManagementProps) {
  const [news, setNews] = useState(initialNews);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => {
    setSelectedNews(null);
    setFormOpen(true);
  };

  const handleEdit = (newsItem: any) => {
    setSelectedNews(newsItem);
    setFormOpen(true);
  };

  const handleDeleteClick = (newsItem: any) => {
    setNewsToDelete(newsItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!newsToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteNews(newsToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setNews(news.filter((n) => n.id !== newsToDelete.id));
        setDeleteDialogOpen(false);
        setNewsToDelete(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Помилка при видаленні');
    } finally {
      setDeleting(false);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedNews(null);
    // Refresh news list
    window.location.reload();
  };

  const categoryMap: Record<string, string> = {
    events: 'Події',
    achievements: 'Досягнення',
    announcements: 'Оголошення',
    general: 'Загальні',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Управління новинами</h1>
        </div>
      </header>

      <div className="container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Новини</CardTitle>
                <CardDescription>
                  Управління новинами та оголошеннями школи
                </CardDescription>
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Додати новину
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {news.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Немає жодної новини. Додайте першу!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Заголовок</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Категорія</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((newsItem) => (
                    <TableRow key={newsItem.id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {newsItem.title}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {newsItem.slug}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {categoryMap[newsItem.category] || newsItem.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {newsItem.isPublished ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm">Опубліковано</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm">Чернетка</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {newsItem.publishedAt
                          ? new Date(newsItem.publishedAt).toLocaleDateString('uk-UA')
                          : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(newsItem)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(newsItem)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <NewsForm
        news={selectedNews}
        open={formOpen}
        onOpenChange={handleFormClose}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити новину?</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити{' '}
              {newsToDelete && newsToDelete.title}? Цю дію не можна скасувати.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Скасувати
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? 'Видалення...' : 'Видалити'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
