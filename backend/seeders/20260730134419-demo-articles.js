'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Первая статья',
        text: 'Это текст первой статьи. Здесь много интересного контента.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Вторая статья',
        text: 'Вторая статья рассказывает о технологиях программирования.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Третья статья',
        text: 'Третья статья посвящена работе с базами данных.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};