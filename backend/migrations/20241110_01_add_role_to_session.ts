import { DataTypes } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }) => {
    const tableDefinition = await queryInterface.describeTable('users');
    if (!tableDefinition.role) {
      await queryInterface.addColumn("active_user_sessions", "role", {
        type: DataTypes.ENUM({
          values: ["user", "superuser", "admin"],
        }),
        defaultValue: "user",
        allowNull: false,
      });
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("active_user_sessions", "role");

  },
};
