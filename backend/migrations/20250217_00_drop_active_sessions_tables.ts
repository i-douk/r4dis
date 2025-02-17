
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("active_user_sessions");
    await queryInterface.dropTable("active_podcaster_sessions");
  },
};