'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/admin/profile-form';
import { deleteProfile } from '@/actions/profiles';
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

interface ProfilesManagementProps {
  initialProfiles: any[];
}

export function ProfilesManagement({ initialProfiles }: ProfilesManagementProps) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => {
    setSelectedProfile(null);
    setFormOpen(true);
  };

  const handleEdit = (profile: any) => {
    setSelectedProfile(profile);
    setFormOpen(true);
  };

  const handleDeleteClick = (profile: any) => {
    setProfileToDelete(profile);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!profileToDelete) return;

    setDeleting(true);
    try {
      const result = await deleteProfile(profileToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setProfiles(profiles.filter((p) => p.id !== profileToDelete.id));
        setDeleteDialogOpen(false);
        setProfileToDelete(null);
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
    setSelectedProfile(null);
    // Refresh profiles list
    window.location.reload();
  };

  const colorMap: Record<string, string> = {
    blue: 'Синій',
    yellow: 'Жовтий',
    green: 'Зелений',
    purple: 'Фіолетовий',
    red: 'Червоний',
    indigo: 'Індіго',
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
          <h1 className="text-xl font-bold">Управління профілями</h1>
        </div>
      </header>

      <div className="container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Профілі навчання</CardTitle>
                <CardDescription>
                  Управління освітніми профілями школи
                </CardDescription>
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Додати профіль
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {profiles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Немає жодного профілю. Додайте перший!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Назва</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Колір</TableHead>
                    <TableHead>Предмети</TableHead>
                    <TableHead>Порядок</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.title}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {profile.slug}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {colorMap[profile.color] || profile.color}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {profile.subjects || '—'}
                      </TableCell>
                      <TableCell>{profile.order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(profile)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(profile)}
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

      <ProfileForm
        profile={selectedProfile}
        open={formOpen}
        onOpenChange={handleFormClose}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити профіль?</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити{' '}
              {profileToDelete && profileToDelete.title}? Цю дію не можна скасувати.
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
