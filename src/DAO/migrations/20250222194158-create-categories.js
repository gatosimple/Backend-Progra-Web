'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    });

    await queryInterface.addConstraint("Categories", {
      name : "FK_BUDGETS_CATEGORIES",
      type : "FOREIGN KEY",
      fields : ["categoriaId"],
      references : {
        table : "Categories",
        field : "id"
      }
    })


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};