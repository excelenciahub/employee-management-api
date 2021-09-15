'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [
        {
          email: 'admin@gmail.com',
          password: '$2a$10$rnUdwvb00lR1weLe81Nyq.JZOh.4.gBnWunXNypty6R.XCSc013rm',
          role: 'Admin',
          first_name: "Admin",
          last_name: "user",
          gender: "Male",
          city: "Ahmedabad",
          contact_number: "9624002276",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'jamodsg@gmail.com',
          password: '$2a$10$rnUdwvb00lR1weLe81Nyq.JZOh.4.gBnWunXNypty6R.XCSc013rm',
          role: 'User',
          first_name: "Sunil",
          last_name: "Jamod",
          gender: "Male",
          city: "Ahmedabad",
          contact_number: "9624002276",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('user');
     */
  }
};
