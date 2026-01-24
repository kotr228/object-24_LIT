import { requireAuth } from '@/lib/auth';
import { NewsManagement } from './news-management';
import { getAllNews } from '@/actions/news';

export const metadata = {
  title: 'Управління новинами - Адмін панель',
};

export default async function NewsAdminPage() {
  await requireAuth();
  const news = await getAllNews();

  return <NewsManagement initialNews={news} />;
}
