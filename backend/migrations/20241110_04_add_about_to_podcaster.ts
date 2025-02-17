import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    const tableDefinition = await queryInterface.describeTable("podcasters");
    if (!tableDefinition.about) {
      await queryInterface.addColumn("podcasters", "about", {
        type: DataTypes.TEXT,
      });
      await queryInterface.addColumn("podcasters", "links", {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      });
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("subscriptions", "about");
    await queryInterface.removeColumn("subscriptions", "links");
  },
};
