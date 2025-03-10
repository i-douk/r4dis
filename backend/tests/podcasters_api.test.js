// const { test, after, beforeEach, describe } = require('node:test');
// const assert = require('node:assert');
// import  models from "../models";
// import { faker } from "@faker-js/faker";
// const supertest = require('supertest');
// const app = require('../index.ts');
// const api = supertest(app);
// import { sequelize, supabase } from "../utils/db";


// const seedPodcasters= async (entriesNum) => {
//     const podcasters = [];
//     for (let i = 0; i < entriesNum; i++) {
//       const email = faker.internet.email();
//       const username = faker.internet.username();
//       const password = faker.internet.password();
  
//       podcasters.push({
//         password,
//         username,
//         email,
//         created_at: new Date(),
//         updated_at: new Date(),
//       });
//     }
//     for (let i = 0; i < entriesNum; i++) {
//     const { error } = await supabase.auth.signUp({
//       email : podcasters[i].email,
//       password : podcasters[i].password,
//       username : podcasters[i].username,
//       options : {
//         data :  {
//           role : 'podcaster'
//         }
//       }
//     })
//     if (error) {
//       console.error("Error inserting data:", error);
//     } else {
//       console.log("Data inserted successfully");
//     }}
//   };
// beforeEach(async () => {
//   await sequelize.authenticate(); 
//   await models.Podcaster.truncate({ cascade: true });

// });

// test('data is seeded and auth.users syncs to public.users', async ()=>{
//     await seedPodcasters(5);
//     const podcasters = await models.Podcaster.findAll();
//     assert.strictEqual(podcasters.length, 5, "Expected public.podcasters to contain 5 users");
// })

// test('Endpoint /podcasters returns the 10 5 podcasters', async () => {
//   const response = await api.get('/api/podcasters');
//   assert.strictEqual(response.length, 5, "Expected public.podcasters to contain 5 podcasters");
// });
