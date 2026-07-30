'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем ID существующих статей
    const articles = await queryInterface.sequelize.query(
      `SELECT id FROM "Articles";`
    );
    const articleRows = articles[0];
    if (articleRows.length < 2) return; // если статей нет, выходим

    await queryInterface.bulkInsert('Comments', [
      {
        text: 'Отличная статья, спасибо!',
        articleId: articleRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Можно больше примеров?',
        articleId: articleRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Не согласен с автором.',
        articleId: articleRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Хороший материал для начинающих.',
        articleId: articleRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};