'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TeacherForm } from '@/components/admin/teacher-form';
import { deleteTeacher } from '@/actions/teachers';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TeachersManagementProps {
  initialTeachers: any[];
}

export function TeachersManagement({ initialTeachers }: TeachersManagementProps) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => {
    setSelectedTeacher(null);
    setFormOpen(true);
  };

  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher);
    setFormOpen(true);
  };

  const handleDeleteClick = (teacher: any) => {
    setTeacherToDelete(teacher);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teacherToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteTeacher(teacherToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setTeachers(teachers.filter((t) => t.id !== teacherToDelete.id));
        setDeleteDialogOpen(false);
        setTeacherToDelete(null);
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
    setSelectedTeacher(null);
    // Refresh teachers list
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
          <h1 className="text-xl font-bold">Управління вчителями</h1>
        </div>
      </header>

      <div className="container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Вчителі</CardTitle>
                <CardDescription>
                  Управління інформацією про педагогічний склад
                </CardDescription>
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Додати вчителя
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {teachers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Немає жодного вчителя. Додайте першого!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Посада</TableHead>
                    <TableHead>Спеціалізація</TableHead>
                    <TableHead>Контакти</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">
                        {teacher.lastName} {teacher.firstName}
                        {teacher.middleName && ` ${teacher.middleName}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{teacher.position}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {teacher.specialization}
                      </TableCell>
                      <TableCell>
                        {teacher.email && (
                          <div className="text-sm text-muted-foreground">
                            {teacher.email}
                          </div>
                        )}
                        {teacher.phone && (
                          <div className="text-sm text-muted-foreground">
                            {teacher.phone}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(teacher)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(teacher)}
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

      <TeacherForm
        teacher={selectedTeacher}
        open={formOpen}
        onOpenChange={handleFormClose}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити вчителя?</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити{' '}
              {teacherToDelete &&
                `${teacherToDelete.firstName} ${teacherToDelete.lastName}`}
              ? Цю дію не можна скасувати.
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
