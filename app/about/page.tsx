import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, Target, Heart, Sparkles } from 'lucide-react';
import { getAboutSections, getAboutMedia } from '@/actions/about-content';
import Image from 'next/image';

export const metadata = {
  title: 'Про нас - ЛІТ Олександрія',
  description: 'Інформація про Олександрійський ліцей інформаційних технологій - історія, місія, цінності',
};

const sectionIcons: Record<string, any> = {
  main: BookOpen,
  mission: Target,
  values: Heart,
  history: BookOpen,
  achievements: Award,
};

const sectionColors: Record<string, { bg: string; icon: string }> = {
  main: { bg: 'bg-blue-100 dark:bg-blue-900', icon: 'text-blue-600 dark:text-blue-400' },
  mission: { bg: 'bg-purple-100 dark:bg-purple-900', icon: 'text-purple-600 dark:text-purple-400' },
  values: { bg: 'bg-green-100 dark:bg-green-900', icon: 'text-green-600 dark:text-green-400' },
  history: { bg: 'bg-orange-100 dark:bg-orange-900', icon: 'text-orange-600 dark:text-orange-400' },
  achievements: { bg: 'bg-yellow-100 dark:bg-yellow-900', icon: 'text-yellow-600 dark:text-yellow-400' },
};

function getCardWidth(content: string): string {
  const length = content.length;
  if (length < 300) return 'md:col-span-1';
  if (length < 700) return 'md:col-span-2';
  return 'md:col-span-3';
}

export default async function AboutPage() {
  const sections = await getAboutSections();
  const media = await getAboutMedia();

  // Групуємо секції за типом
  const mainSections = sections.filter(s => s.sectionType === 'main');
  const missionSections = sections.filter(s => s.sectionType === 'mission');
  const valuesSections = sections.filter(s => s.sectionType === 'values');
  const historySections = sections.filter(s => s.sectionType === 'history');
  const achievementSections = sections.filter(s => s.sectionType === 'achievements');

  const hasDynamicContent = sections.length > 0 || media.length > 0;

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm mb-4">
          <BookOpen className="mr-2 h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Наша історія</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Про наш ліцей
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Сучасний заклад освіти з глибокими традиціями та інноваційним підходом
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {hasDynamicContent ? (
          <>
            {/* Main sections */}
            {mainSections.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                {mainSections.map((section) => {
                  const Icon = sectionIcons[section.sectionType] || BookOpen;
                  const colors = sectionColors[section.sectionType] || sectionColors.main;
                  const colSpan = getCardWidth(section.content || '');

                  return (
                    <Card key={section.id} className={`border-2 hover:shadow-lg transition-shadow ${colSpan}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${colors.icon}`} />
                          </div>
                          <CardTitle className="text-2xl card-title-white">{section.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        <p className="whitespace-pre-wrap break-words">{section.content}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            )}

            {/* History sections */}
            {historySections.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                {historySections.map((section) => {
                  const Icon = sectionIcons[section.sectionType] || BookOpen;
                  const colors = sectionColors[section.sectionType] || sectionColors.history;
                  const colSpan = getCardWidth(section.content || '');

                  return (
                    <Card key={section.id} className={`border-2 hover:shadow-lg transition-shadow ${colSpan}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${colors.icon}`} />
                          </div>
                          <CardTitle className="text-2xl card-title-white">{section.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        <p className="whitespace-pre-wrap break-words">{section.content}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            )}

            {/* Mission and Vision */}
            {missionSections.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                {missionSections.map((section) => {
                  const Icon = sectionIcons[section.sectionType] || Target;
                  const colors = sectionColors[section.sectionType] || sectionColors.mission;
                  const colSpan = getCardWidth(section.content || '');

                  return (
                    <Card key={section.id} className={`hover:shadow-lg transition-shadow ${colSpan}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${colors.icon}`} />
                          </div>
                          <CardTitle className="text-xl card-title-white">{section.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        <p className="whitespace-pre-wrap break-words">{section.content}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            )}

            {/* Values */}
            {valuesSections.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">Наші цінності</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                  {valuesSections.map((section) => {
                    const Icon = sectionIcons[section.sectionType] || Heart;
                    const colors = sectionColors[section.sectionType] || sectionColors.values;
                    const colSpan = getCardWidth(section.content || '');

                    return (
                      <Card key={section.id} className={`text-center hover:shadow-lg transition-shadow ${colSpan}`}>
                        <CardHeader>
                          <div className={`w-12 h-12 mx-auto rounded-full ${colors.bg} flex items-center justify-center mb-3`}>
                            <Icon className={`h-6 w-6 ${colors.icon}`} />
                          </div>
                          <CardTitle className="text-lg card-title-white">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="whitespace-pre-wrap break-words">
                            {section.content}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Achievements */}
            {achievementSections.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">Наші досягнення</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                  {achievementSections.map((section, index) => {
                    const Icon = sectionIcons[section.sectionType] || Award;
                    const colors = sectionColors[section.sectionType] || sectionColors.achievements;
                    const colSpan = getCardWidth(section.content || '');

                    return (
                      <Card key={section.id} className={`hover:shadow-md transition-shadow ${colSpan}`}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`h-5 w-5 ${colors.icon}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg mb-1">{section.title}</CardTitle>
                              <CardDescription className="whitespace-pre-wrap">{section.content}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Media Gallery */}
            {media.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">Галерея</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'dense' }}>
                  {media.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      {item.mediaType === 'image' ? (
                        <div className="relative h-64 w-full">
                          <Image
                            src={item.url}
                            alt={item.caption || 'Фото'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full">
                          <iframe
                            src={item.url.includes('youtube.com')
                              ? item.url.replace('watch?v=', 'embed/')
                              : item.url}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      )}
                      {item.caption && (
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">{item.caption}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          // Fallback static content if no dynamic content
          <>
            <section>
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl card-title-white">Наша історія</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                  <p>
                    Олександрійський ліцей інформаційних технологій - це сучасний навчальний заклад,
                    який поєднує кращі освітні традиції з інноваційними методиками викладання.
                  </p>
                  <p>
                    Наш ліцей спеціалізується на поглибленій підготовці учнів за чотирма профілями:
                    математично-інформаційним, філологічним, природничим та гуманітарним. Ми створюємо
                    умови для розвитку талантів кожного учня та допомагаємо їм обрати свій майбутній шлях.
                  </p>
                </CardContent>
              </Card>
            </section>

            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                Контент сторінки можна налаштувати через адмін панель
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
