import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const seedPodcastersData= async () => {
const {data : podcasters , error: podcasterError } = await  supabase.from('podcasters').select()
console.log(podcasterError)
  for ( let podcaster of podcasters) {
    const newPodcast = {
        urls : [faker.internet.url(), faker.internet.url() ,faker.internet.url() ],
        name :  faker.hacker.adjective(),
        slug :  faker.lorem.slug(),
        description: faker.person.bio(),
        podcaster_id : podcaster.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    const { data, error } = await supabase
  .from('podcasts')
  .insert(newPodcast);
  if ( error) console.log(error)
  console.log('inserted ' ,data)
  }
};

(async () => {
  await seedPodcastersData();
})();