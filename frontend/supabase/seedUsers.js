import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

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
  for (let i = 0; i < entriesNum; i++) {
  const { error } = await supabase.auth.admin.createUser({
    email : users[i].email,
    password : users[i].password,
    username : users[i].username,
  })
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }}
};

(async () => {
  await seedUsers(20);
})();