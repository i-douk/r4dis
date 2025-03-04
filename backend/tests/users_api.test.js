const { test, after, beforeEach } = require('node:test');
const assert = require('assert');
const { User } = require("../models");
const faker = require("@faker-js/faker");
const supertest = require('supertest');
const app = require('../index.ts');
const { supabase, sequelize } = require('../utils/db');
const api = supertest(app);

const seedUsers = async (entriesNum) => {
  const users = [];
  for (let i = 0; i < entriesNum; i++) {
    const email = faker.internet.email();
    const username = faker.internet.username();
    const password = faker.internet.password();

    users.push({
      password,
      username,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  // Create users using Supabase authentication
  for (let i = 0; i < entriesNum; i++) {
    const { error } = await supabase.auth.admin.createUser({
      email: users[i].email,
      password: users[i].password,
      options: {
        data: {
          username: users[i].username,
          role: 'user',
        }
      }
    });
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
    }
  }
};

beforeEach(async () => {
  // Sync database and truncate the user table
  await sequelize.sync({ force: true }); // Ensure a fresh sync before each test
  await User.drop({});
  
  // Seed the users table with test data
  await seedUsers(10);
});

test('Public users is populated', async () => {
  const response = await api.get('/api/users');

  assert.strictEqual(response.body.length, 10, 'Should return 10 users');
});

test('the first user is about HTTP methods', async () => {
  const response = await api.get('/api/users');

  const contents = response.body.map(e => e.content);
  assert(contents.includes('HTML is easy'), 'Expected content to include "HTML is easy"');
});
