import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    const tableDefinition = await queryInterface.describeTable("podcasts");
    if (!tableDefinition.cover_url) {
      await queryInterface.addColumn("podcasts", "cover_url", {
        type: DataTypes.STRING,
      });
    }
  },
  down: async ({ context: queryInterface }) => {

    await queryInterface.removeColumn("podcasts", "cover_url");
  },
};
