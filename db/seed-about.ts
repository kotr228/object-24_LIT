import { db } from './index';
import { aboutSections, aboutMedia } from './schema';

async function seedAboutContent() {
  console.log('🌱 Seeding About content...');

  try {
    // Очищуємо існуючий контент
    await db.delete(aboutMedia);
    await db.delete(aboutSections);

    // Головна інформація
    await db.insert(aboutSections).values({
      sectionType: 'main',
      title: 'Запрошуємо на навчання',
      content: `Ліцей інформаційних технологій запрошує на навчання

Форма для реєстрації учасників конкурсного відбору:
https://forms.gle/6fMtwerWJEqADYNZA

Головним завданням Ліцею інформаційних технологій Олександрійської міської ради Кіровоградської області є розвиток творчої особистості як вчителя, так і учня, створення умов для повноцінного фізичного, інтелектуального та духовного розвитку всіх учасників освітнього процесу, шляхом подолання усталених стереотипів, застарілих підходів, шляхом пошуку нового комплексу ідей щодо створення інтелектуальної основи школи XXI століття, школи самореалізації, школи життєтворчості.`,
      order: 0,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Профілі навчання
    await db.insert(aboutSections).values({
      sectionType: 'main',
      title: 'Профільне навчання',
      content: `У Ліцеї інформаційних технологій здійснюється профільне навчання за профілями:

• Математично-інформаційний
• Математично-економічний
• Біолого-хімічний
• Історичний
• Філологічний
• Інформаційно-технологічний`,
      order: 1,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Про ліцей сьогодні
    await db.insert(aboutSections).values({
      sectionType: 'achievements',
      title: 'Ліцей сьогодні',
      content: `Одна з найбільших шкіл Олександрії: 19 класів – 457 учнів; 8 класів із поглибленим вивченням окремих предметів, 9 профільних ліцейних класів`,
      order: 0,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'achievements',
      title: 'Лідер у наданні освітніх послуг',
      content: `Переможці міських та обласних олімпіад з базових дисциплін; 4 учасники й переможці IV етапу Всеукраїнських учнівських олімпіад; переможці обласного конкурсу-захисту науково-дослідних робіт МАН; 10 випускників отримали свідоцтво з відзнакою, 2 учениці отримали 200 балів НМТ з української мови`,
      order: 1,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'achievements',
      title: 'Національне визнання',
      content: `Лауреат конкурсу «100 кращих шкіл України», Всеукраїнської акції «Флагмани освіти і науки України», учасник національного проєкту «Відкритий світ»`,
      order: 2,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'achievements',
      title: 'Професійна команда',
      content: `Відмінна команда педагогів-професіоналів високого рівня, яку очолює директор Шульга Руслан Юрійович, спеціаліст вищої категорії, учитель-методист, Відмінник освіти України`,
      order: 3,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Можливості для учнів
    await db.insert(aboutSections).values({
      sectionType: 'values',
      title: 'Наукова робота',
      content: `Займатись науковою роботою, розробляти та реалізовувати власні проєкти, працюючи у Малій Академії Наук`,
      order: 0,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'values',
      title: 'Конкурси та олімпіади',
      content: `Брати активну участь у міських, обласних всеукраїнських конкурсах, олімпіадах. Увійти в шкільний та міський банки даних обдарованих дітей та отримати визнання за особливі досягнення`,
      order: 1,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'values',
      title: 'Номінації та нагороди',
      content: `Стати кращим ліцеїстом року у номінації «Талант року», «Відкриття року», «Ліцеїст року»`,
      order: 2,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(aboutSections).values({
      sectionType: 'values',
      title: 'Учнівське самоврядування',
      content: `Брати участь у роботі учнівського самоврядування, стати членом учнівського парламенту`,
      order: 3,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Додаткові можливості
    await db.insert(aboutSections).values({
      sectionType: 'main',
      title: 'Додаткові можливості',
      content: `З метою підготовки до навчання у закладі працює школа «Сходинки до інформатики» для учнів 1-6 класів.

Для учнів закладу проводяться:
• Курси за вибором
• Факультативні заняття
• Гурток «Основи програмування»
• Гурток вокального співу «Вернісаж»
• Виховні заходи
• Зустрічі з провідними фахівцями
• Подорожі та екскурсії`,
      order: 2,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Чому обрати ЛІТ
    await db.insert(aboutSections).values({
      sectionType: 'mission',
      title: 'Чому варто обрати ЛІТ',
      content: `Ви бажаєте:
• Надати дитині відмінну освіту
• Гарантувати дитині вступ до кращих закладів вищої освіти України
• Розвивати творчі здібності дитини
• Виховати її справжнім патріотом

Наша школа – сучасний навчальний заклад, який створює особливі умови виховання інтелігентної, високоосвіченої людини, патріота України. Тут учень формується не тільки як майбутній компетентний спеціаліст, а і як розвинена особистість, індивідуальність якої плекається вчителями-професіоналами.`,
      order: 0,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Історія
    await db.insert(aboutSections).values({
      sectionType: 'history',
      title: 'Наша історія',
      content: `Комплектування класів відбувається на основі результатів вступного тестування учнів з урахуванням їх інтересів та нахилів.

Поділ учнів на групи здійснено при вивченні предметів: інформатика, математика, хімія, англійська мова (2003-2004 н.р.); інформатика, англійська мова (2004-2011 н.р.), інформатика (2012 - по теперішній час).

01.12.2016 р. статус та назву ЛІТ змінено на навчально-виховний комплекс «Ліцей інформаційних технологій – спеціалізована школа II ступеня» Олександрійської міської ради Кіровоградської області. З 2017/18 н.р. у заклад здійснювався набір учнів до 5-х і 6-х класів.

Рішенням виконавчого комітету Олександрійської міської ради від 21.07.2022 р. заклад було перейменовано в Ліцей інформаційних технологій Олександрійської міської ради. Набір учнів у ЛІТ здійснюється, починаючи з 7 класу.`,
      order: 0,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Якісний рівень підготовки
    await db.insert(aboutSections).values({
      sectionType: 'mission',
      title: 'Індивідуальний підхід',
      content: `Знання потенційних можливостей дітей, прогнозування потреб і моделей розвитку особистості є основою всіх перетворень у ліцеї.

Якісний рівень підготовки учнів забезпечують висококваліфіковані педагоги закладу.

Індивідуальне навчання та екстернат відсутні відповідно до положень Статуту Ліцею інформаційних технологій.`,
      order: 1,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ About content seeded successfully!');
    console.log('📝 Created sections:');
    console.log('  - 3 main sections');
    console.log('  - 2 mission sections');
    console.log('  - 4 values sections');
    console.log('  - 1 history section');
    console.log('  - 4 achievements sections');
  } catch (error) {
    console.error('❌ Error seeding about content:', error);
    throw error;
  }
}

// Запускаємо якщо викликається напряму
if (require.main === module) {
  seedAboutContent()
    .then(() => {
      console.log('✅ Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seedAboutContent };
