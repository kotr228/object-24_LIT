import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, Target, Heart, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Про нас - ЛІТ Олександрія',
  description: 'Інформація про Олександрійський ліцей інформаційних технологій - історія, місія, цінності',
};

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
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

      <div className="max-w-4xl mx-auto space-y-12">
        {/* История */}
        <section>
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Наша історія</CardTitle>
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

        {/* Миссия и видение */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Наша місія</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Забезпечити високоякісну освіту, розвивати критичне мислення та творчі здібності
                учнів, готувати їх до успішного життя в сучасному світі.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Наше бачення</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Стати провідним закладом освіти регіону, де кожен учень має можливість розкрити
                свій потенціал та досягти успіху у обраній сфері.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ценности */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Наші цінності</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Якість освіти</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Постійне вдосконалення навчальних програм та методик викладання
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Індивідуальний підхід</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Увага до потреб та здібностей кожного учня
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Підтримка та турбота</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Створення комфортного та безпечного освітнього середовища
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Чому ми */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Чому обирають нас</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Досвідчені вчителі',
                description: 'Наша команда складається з професіоналів з багаторічним досвідом',
              },
              {
                title: 'Сучасне обладнання',
                description: 'Комп\'ютерні класи, лабораторії, бібліотека з електронними ресурсами',
              },
              {
                title: 'Індивідуальні програми',
                description: 'Можливість обрати профіль та предмети відповідно до інтересів',
              },
              {
                title: 'Підготовка до ЗНО',
                description: 'Спеціальні курси та консультації для успішного складання екзаменів',
              },
              {
                title: 'Позашкільна діяльність',
                description: 'Гуртки, секції, олімпіади, конкурси та культурні заходи',
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
