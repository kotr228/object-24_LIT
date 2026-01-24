import { db } from './index';
import { users, teachers, profiles, testimonials, news } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    10
  );

  await db.insert(users).values({
    email: process.env.ADMIN_EMAIL || 'admin@lit.kr.ua',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Admin user created');

  // Seed profiles
  await db.insert(profiles).values([
    {
      title: 'Математично-інформаційний',
      slug: 'math-it',
      description:
        'Поглиблене вивчення математики, інформатики та програмування',
      fullDescription:
        'Профіль орієнтований на підготовку фахівців у галузі інформаційних технологій, математики та програмування. Учні опановують сучасні мови програмування, алгоритми, структури даних.',
      icon: 'Code',
      color: 'blue',
      subjects: JSON.stringify([
        'Математика',
        'Інформатика',
        'Програмування',
        'Фізика',
      ]),
      order: 1,
    },
    {
      title: 'Українська філологія',
      slug: 'ukrainian-philology',
      description: 'Поглиблене вивчення української мови та літератури',
      fullDescription:
        'Профіль для тих, хто закохані в українську мову, літературу та культуру. Учні вивчають історію мови, літературознавство, риторику.',
      icon: 'BookOpen',
      color: 'yellow',
      subjects: JSON.stringify([
        'Українська мова',
        'Українська література',
        'Зарубіжна література',
        'Історія України',
      ]),
      order: 2,
    },
    {
      title: 'Біолого-хімічний',
      slug: 'bio-chem',
      description: 'Поглиблене вивчення біології та хімії',
      fullDescription:
        'Профіль для майбутніх медиків, біологів, хіміків. Учні отримують ґрунтовні знання з біології, хімії, екології.',
      icon: 'FlaskConical',
      color: 'green',
      subjects: JSON.stringify(['Біологія', 'Хімія', 'Екологія', 'Фізика']),
      order: 3,
    },
    {
      title: 'Історичний',
      slug: 'history',
      description: 'Поглиблене вивчення історії та суспільних наук',
      fullDescription:
        'Профіль для тих, хто цікавиться історією, політологією, правознавством. Учні вивчають історію України та світу, правознавство, економіку.',
      icon: 'Landmark',
      color: 'purple',
      subjects: JSON.stringify([
        'Історія України',
        'Всесвітня історія',
        'Правознавство',
        'Економіка',
      ]),
      order: 4,
    },
  ]);

  console.log('✅ Profiles seeded');

  // Seed teachers
  await db.insert(teachers).values([
    {
      firstName: 'Олена',
      lastName: 'Коваленко',
      middleName: 'Петрівна',
      position: 'Директор',
      specialization: 'Українська мова та література',
      bio: 'Досвідчений педагог з 25-річним стажем роботи',
      email: 'director@lit.kr.ua',
      order: 1,
    },
    {
      firstName: 'Ігор',
      lastName: 'Шевченко',
      middleName: 'Володимирович',
      position: 'Вчитель інформатики',
      specialization: 'Інформатика, програмування',
      bio: 'Спеціаліст з програмування та алгоритмів',
      email: 'shevchenko@lit.kr.ua',
      order: 2,
    },
    {
      firstName: 'Марія',
      lastName: 'Бондаренко',
      middleName: 'Іванівна',
      position: 'Вчитель математики',
      specialization: 'Математика, алгебра, геометрія',
      bio: 'Переможець обласного конкурсу "Вчитель року"',
      order: 3,
    },
    {
      firstName: 'Андрій',
      lastName: 'Мельник',
      middleName: 'Сергійович',
      position: 'Вчитель фізики',
      specialization: 'Фізика, астрономія',
      bio: 'Кандидат фізико-математичних наук',
      order: 4,
    },
    {
      firstName: 'Тетяна',
      lastName: 'Лисенко',
      middleName: 'Олександрівна',
      position: 'Вчитель біології',
      specialization: 'Біологія, екологія',
      bio: 'Організатор шкільної екологічної лабораторії',
      order: 5,
    },
  ]);

  console.log('✅ Teachers seeded');

  // Seed testimonials
  await db.insert(testimonials).values([
    {
      name: 'Дмитро Петренко',
      graduationYear: 2020,
      content:
        'Ліцей дав мені міцні знання з математики та програмування. Зараз навчаюсь у КПІ на факультеті інформатики.',
      achievement: 'Студент КПІ',
      university: 'КПІ ім. Ігоря Сікорського',
      order: 1,
    },
    {
      name: 'Анна Коваль',
      graduationYear: 2019,
      content:
        'Завдяки вчителям філологічного профілю я закохалася в українську мову. Тепер навчаюсь на філолога у Київському університеті.',
      achievement: 'Студентка КНУ',
      university: 'КНУ ім. Тараса Шевченка',
      order: 2,
    },
    {
      name: 'Віктор Сидоренко',
      graduationYear: 2021,
      content:
        'Біолого-хімічний профіль підготував мене до вступу на медичний факультет. Дякую всім вчителям!',
      achievement: 'Студент НМУ',
      university: 'Національний медичний університет',
      order: 3,
    },
  ]);

  console.log('✅ Testimonials seeded');

  // Seed news
  await db.insert(news).values([
    {
      title: 'Початок нового навчального року',
      slug: 'new-academic-year-2024',
      excerpt: 'Вітаємо всіх учнів та вчителів з початком нового навчального року!',
      content:
        'Дорогі учні та вчителі! Вітаємо вас з початком нового навчального року. Бажаємо успіхів у навчанні та нових звершень!',
      category: 'events',
      isPublished: true,
    },
    {
      title: 'Переможці олімпіад',
      slug: 'olympiad-winners-2024',
      excerpt:
        'Наші учні здобули призові місця на обласних олімпіадах з математики та інформатики',
      content:
        'Вітаємо наших учнів з отриманням призових місць на обласних олімпіадах! Особливо відзначаємо переможців з математики та програмування.',
      category: 'achievements',
      isPublished: true,
    },
  ]);

  console.log('✅ News seeded');

  console.log('✨ Seeding completed successfully!');
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
