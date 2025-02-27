import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    const tableDefinition = await queryInterface.describeTable("podcasts");
    if (!tableDefinition.slug) {
      await queryInterface.addColumn("podcasts", "slug", {
        type: DataTypes.STRING,
        allowNull: false,
      });
    }
  },
  down: async ({ context: queryInterface }) => {

    await queryInterface.removeColumn("podcasts", "slug");
  },
};
