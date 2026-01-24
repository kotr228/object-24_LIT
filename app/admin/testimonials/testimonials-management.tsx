'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TestimonialForm } from '@/components/admin/testimonial-form';
import { deleteTestimonial } from '@/actions/testimonials';
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

interface TestimonialsManagementProps {
  initialTestimonials: any[];
}

export function TestimonialsManagement({ initialTestimonials }: TestimonialsManagementProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setFormOpen(true);
  };

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setFormOpen(true);
  };

  const handleDeleteClick = (testimonial: any) => {
    setTestimonialToDelete(testimonial);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteTestimonial(testimonialToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setTestimonials(testimonials.filter((t) => t.id !== testimonialToDelete.id));
        setDeleteDialogOpen(false);
        setTestimonialToDelete(null);
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
    setSelectedTestimonial(null);
    // Refresh testimonials list
    window.location.reload();
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
          <h1 className="text-xl font-bold">Управління відгуками</h1>
        </div>
      </header>

      <div className="container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Відгуки випускників</CardTitle>
                <CardDescription>
                  Управління відгуками та досягненнями випускників школи
                </CardDescription>
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Додати відгук
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {testimonials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Немає жодного відгуку. Додайте перший!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Рік випуску</TableHead>
                    <TableHead>Університет</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Порядок</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">
                        {testimonial.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{testimonial.graduationYear}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {testimonial.university || '—'}
                      </TableCell>
                      <TableCell>
                        {testimonial.isPublished ? (
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
                      <TableCell>{testimonial.order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(testimonial)}
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

      <TestimonialForm
        testimonial={selectedTestimonial}
        open={formOpen}
        onOpenChange={handleFormClose}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити відгук?</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити відгук від{' '}
              {testimonialToDelete && testimonialToDelete.name}? Цю дію не можна скасувати.
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
