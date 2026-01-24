import { requireAuth } from '@/lib/auth';
import { TeachersManagement } from './teachers-management';
import { getAllTeachers } from '@/actions/teachers';

export const metadata = {
  title: 'Управління вчителями - Адмін панель',
};

export default async function TeachersAdminPage() {
  await requireAuth();
  const teachers = await getAllTeachers();

  return <TeachersManagement initialTeachers={teachers} />;
}
