import { requireAuth } from '@/lib/auth';
import { ProfilesManagement } from './profiles-management';
import { getAllProfiles } from '@/actions/profiles';

export const metadata = {
  title: 'Управління профілями - Адмін панель',
};

export default async function ProfilesAdminPage() {
  await requireAuth();
  const profiles = await getAllProfiles();

  return <ProfilesManagement initialProfiles={profiles} />;
}
