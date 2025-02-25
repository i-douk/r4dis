import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    const tableDefinition = await queryInterface.describeTable("podcasters");
    if (!tableDefinition.avatar_url) {
      await queryInterface.addColumn("podcasters", "avatar_url", {
        type: DataTypes.STRING,
      });
    }
  },
  down: async ({ context: queryInterface }) => {

    await queryInterface.removeColumn("podcasters", "avatar_url");
  },
};
