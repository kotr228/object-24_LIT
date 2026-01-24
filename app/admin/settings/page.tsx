import { requireAuth } from '@/lib/auth';
import { SettingsForm } from './settings-form';
import { getSettings } from '@/actions/settings';

export default async function SettingsPage() {
  await requireAuth();
  const settings = await getSettings();

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Налаштування сайту</h1>
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
