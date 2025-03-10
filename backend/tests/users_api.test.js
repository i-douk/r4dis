const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
import  models from "../models";
import { faker } from "@faker-js/faker";
const supertest = require('supertest');
const app = require('../index.ts');
const api = supertest(app);
import { sequelize, supabase } from "../utils/db";

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
  await sequelize.authenticate(); 
  await models.User.truncate({ cascade: true });
  await seedUsers(5);
});

test('data is seeded and auth.users syncs to public.users', async ()=>{
    const users = await models.User.findAll();
    assert.strictEqual(users.length, 5, "Expected public.users to contain 5 users");
})