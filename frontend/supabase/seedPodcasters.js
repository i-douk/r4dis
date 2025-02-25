import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const seedPodcasters= async (entriesNum) => {
  const podcasters = [];
  for (let i = 0; i < entriesNum; i++) {
    const email = faker.internet.email();
    const username = faker.internet.username();
    const password = faker.internet.password();

    podcasters.push({
      password,
      username,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  for (let i = 0; i < entriesNum; i++) {
  const { error } = await supabase.auth.signUp({
    email : podcasters[i].email,
    password : podcasters[i].password,
    username : podcasters[i].username,
    options : {
      data :  {
        role : 'podcaster'
      }
    }
  })
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }}
};

(async () => {
  await seedPodcasters(20);
})();