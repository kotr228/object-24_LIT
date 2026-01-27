import { requireAuth } from '@/lib/auth';
import { db } from '@/db';
import { teachers, profiles, testimonials, news, registrations } from '@/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  MessageSquare,
  Newspaper,
  LogOut,
  LayoutDashboard,
  Settings,
  UserPlus,
  FileText,
} from 'lucide-react';

export default async function AdminDashboard() {
  await requireAuth();

  // Get counts
  const [teachersCount, profilesCount, testimonialsCount, newsCount, registrationsCount] =
    await Promise.all([
      db.select().from(teachers).then((r) => r.length),
      db.select().from(profiles).then((r) => r.length),
      db.select().from(testimonials).then((r) => r.length),
      db.select().from(news).then((r) => r.length),
      db.select().from(registrations).then((r) => r.length),
    ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Адмін панель</h1>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Вийти
            </Button>
          </form>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Панель управління</h2>
          <p className="text-muted-foreground">
            Керуйте контентом сайту ліцею
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Вчителі</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachersCount}</div>
              <p className="text-xs text-muted-foreground">
                Всього вчителів у базі
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Профілі</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profilesCount}</div>
              <p className="text-xs text-muted-foreground">
                Профілів навчання
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Відгуки</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonialsCount}</div>
              <p className="text-xs text-muted-foreground">
                Відгуків випускників
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Новини</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsCount}</div>
              <p className="text-xs text-muted-foreground">
                Опубліковано новин
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Заявки</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrationsCount}</div>
              <p className="text-xs text-muted-foreground">
                Заявок на навчання
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Вчителі</CardTitle>
              <CardDescription>
                Управління інформацією про вчителів
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/teachers">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Профілі</CardTitle>
              <CardDescription>
                Управління профілями навчання
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/profiles">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Відгуки</CardTitle>
              <CardDescription>
                Управління відгуками випускників
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/testimonials">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Новини</CardTitle>
              <CardDescription>
                Управління новинами та оголошеннями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/news">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Заявки</CardTitle>
              <CardDescription>
                Перегляд заявок на навчання
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/registrations">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle>Про нас</CardTitle>
              <CardDescription>
                Редагування контенту сторінки "Про нас"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/about">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <CardTitle>Налаштування</CardTitle>
              <CardDescription>
                Контактна інформація та базові дані
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/settings">
                <Button className="w-full">Управління</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Швидкі дії</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <Button variant="outline">Переглянути сайт</Button>
            </Link>
            <Link href="/admin/news">
              <Button variant="outline">Додати новину</Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button variant="outline">Додати відгук</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
