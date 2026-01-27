import { requireAuth } from '@/lib/auth';
import { getProfileMedia } from '@/actions/profile-media';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Video, Presentation, FileText } from 'lucide-react';
import Link from 'next/link';
import { ProfileMediaManager } from './profile-media-manager';

interface ProfileMediaPageProps {
  params: {
    id: string;
  };
}

export default async function ProfileMediaPage({ params }: ProfileMediaPageProps) {
  await requireAuth();

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, params.id))
    .limit(1);

  if (!profile) {
    notFound();
  }

  const media = await getProfileMedia(params.id);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/admin/profiles">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад до профілів
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{profile.title}</h1>
        <p className="text-muted-foreground">
          Управління презентаціями та відео для цього профілю
        </p>
      </div>

      <ProfileMediaManager profileId={params.id} initialMedia={media} />
    </div>
  );
}
