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
console.log(podcasters)
  for ( let podcaster of podcasters) {
    const updateData = {
        links : [faker.internet.url(), faker.internet.url() ,faker.internet.url() ],
        disabled :  faker.datatype.boolean(),
        premium : faker.datatype.boolean(),
        about: faker.person.bio()
    }
    console.log(updateData)
    const { data, error } = await supabase
    .from('podcasters')
    .update(updateData)
    .eq('id', podcaster.id)
    if(error) return error;
    if( data) console.log(data)
  }

};

(async () => {
  await seedPodcastersData();
})();