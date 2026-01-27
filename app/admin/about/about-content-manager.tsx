'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AboutSectionDialog } from './about-section-dialog';
import { AboutMediaDialog } from './about-media-dialog';
import { deleteAboutSection, deleteAboutMedia } from '@/actions/about-content';
import { toast } from 'sonner';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  sectionType: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AboutMedia {
  id: string;
  url: string;
  mediaType: string;
  caption: string | null;
  order: number;
  createdAt: Date;
}

interface AboutContentManagerProps {
  sections: AboutSection[];
  media: AboutMedia[];
}

export function AboutContentManager({ sections: initialSections, media: initialMedia }: AboutContentManagerProps) {
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutSection | null>(null);
  const [sections, setSections] = useState(initialSections);
  const [media, setMedia] = useState(initialMedia);

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Видалити цю секцію?')) return;

    const result = await deleteAboutSection(id);
    if (result.success) {
      toast.success(result.message);
      setSections(sections.filter(s => s.id !== id));
    } else {
      toast.error(result.message);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Видалити це медіа?')) return;

    const result = await deleteAboutMedia(id);
    if (result.success) {
      toast.success(result.message);
      setMedia(media.filter(m => m.id !== id));
    } else {
      toast.error(result.message);
    }
  };

  const handleEditSection = (section: AboutSection) => {
    setEditingSection(section);
    setSectionDialogOpen(true);
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionDialogOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Text Sections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Текстові секції</CardTitle>
                <CardDescription>
                  {sections.length} секцій
                </CardDescription>
              </div>
              <Button size="sm" onClick={handleAddSection}>
                <Plus className="h-4 w-4 mr-2" />
                Додати секцію
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sections.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Немає секцій
              </p>
            ) : (
              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{section.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {section.sectionType}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditSection(section)}>
                          Редагувати
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteSection(section.id)}>
                          Видалити
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Медіа-галерея</CardTitle>
                <CardDescription>
                  {media.length} файлів
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setMediaDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Додати медіа
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {media.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Немає медіа
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    {item.mediaType === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.caption || ''}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-muted flex items-center justify-center">
                        <p className="text-sm">Відео</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleDeleteMedia(item.id)}>
                        Видалити
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AboutSectionDialog
        open={sectionDialogOpen}
        onOpenChange={setSectionDialogOpen}
        section={editingSection}
        onSuccess={(newSection) => {
          if (editingSection) {
            setSections(sections.map(s => s.id === newSection.id ? newSection : s));
          } else {
            setSections([...sections, newSection]);
          }
          setSectionDialogOpen(false);
          setEditingSection(null);
        }}
      />

      <AboutMediaDialog
        open={mediaDialogOpen}
        onOpenChange={setMediaDialogOpen}
        onSuccess={(newMedia) => {
          setMedia([...media, newMedia]);
          setMediaDialogOpen(false);
        }}
      />
    </>
  );
}
