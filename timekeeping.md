# time keeping

| date | hours | tasks |
| :----:|:-----| :-----|
| 17.10. | 2   | setting up project / db connection with supabase |
|        | 2    | add inital models and migrations |
| 23.10. | 1    | looking up and deciding on front-end |
|        | 1    | end frameworksetting up Vue with tailwind |
| 28.10. | 2    | creation of user and podcaster endpoints  |
| 29.10. | 2    | add jwt auth login endpoint hardcoded secret |
|        | 3    | jwt authentication and password hashing with bcrypt  |
| 30.10. | 2    | middleware for token extraction for user and podcaster |
|        | 1    | add role and  add middleware to check role |
|        | 1    | CRUD for users and podcasters |
| 31.10. | 2    | add many to many b/w podcasters/users/podcasts |
|        | 2    | add linting, fixes to align with project goals |
|        | 2    | add global typing and start mapping fields |
| 01.11  | 2    | fix typing/ endpoints/ model interfaces for podcasters |
| milest | 25   | ------------------------25 hours completed-------------------------|
| 01.11  | 2.5  | add and tweak endpoints, fix consistency |
|        | 1    | finish CRUD operations to podcasts|
|        | 1    | add post endpoints for following and subscription|
|        | 1.5  | add patches to followings _& subscriptions & logout for user and podcaster|
| 05.11  | 1    | fix podcasters endpoints in the backend |
| 06.11  | 2.5  | research & start implementating DTO for better handling of data sent to  client |
|        | 1    | implement DTO mapping to get methods of users and podcasters |
|        | 1.5  |  fixing DTOs|
| 07.11  | 3    | clean up DTO logic and look for bug causing user data mapped through DTO to not render correctely|
| 09.11  | 6    | clean up endpoints and tweak logic for followings and subscriptions |
| 10.11  | 1    | add admin and superuser endpoints and role checking |
|        | 1    | debug role not being saved to activesession & add put for superuser and admin to verifiy and disable podcaster|
|        | 1    | keep cleaning up endpoints and deploying consistant logic|
| milest | 50   | ------------------------50 hours completed-------------------------|
|        | 1    | restrict subscriptions and followings CRUD to super user and admin |
|        | 1    | add freezing and commenting to superuser and admin on subscriptions |
|        | 1    | add bulk edit to podcaster and add propreties to podcast schema and db |
|        | 1    | add properties to users and podcasters and edit users put endpoint |
| 17.11  | 1    | add supscription count and follow count dynamically to podcasters and podcasts without db storing |
|        | 2    | created logo with diff declinaison in figma |
| 13.02  | 1    | add verfiication to sequelize migrations |
|        | 0000 | Starting over with frontend due to diffculty getting back where I left off, all entries and corresponding time here concerning frontend will be removed |
|        | 2    | Resetting up frontend with vite supabase and tailwind |
|        | 1    | add chadcn vue  |
| 14.02  | 2    | refactor back and front to sync users table with supaAuth table |
|        | 2    | refactoring + add register vue and supaAuth |
|        | 1.5  | debug sign up error bc of trigger |
|        | 0.5  | create login page, pwd hash b4 saving to users |
| 15.02  |  2   | refactoring & file structure + looking up suspense for coordinated loading state |
|        |  5   | Vue documentation  overview |
| milest | 75   | ------------------------75 hours completed-------------------------|
|        |  1.5 | add topbar with logo sign in sign up and logout buttons |
| 16.02  |  3   | tweaking backend to connect back to front and resolve auth problem |
|        |  2.5 | saving supabase JWT token to active_session_users|
| 17.02  |  2   | major refactoring to migrate to supabase auth in the backend |
|        |  2   | cleanup backend from remanents of custom JWT |
|        |  1.5 | tweak user login and users endpoints for new supa auth |
| 18.02  |  1.5 | set up auth store |
|        |  2   | add building block for Layout + express services |
|        |  1   | add sidebar, links |
| 19.02  |  2   | fix sidebar  |
|        |  1   | fix logout |
| 21.02. |  3   | changes to  backend, add uuid to add references to public users and public podcasters with  auth.users, rewriting of sequelize models/umzug migrations  |
|        |  2   | fixed authentication and auth store, buttons in topbar change when logged in |
| milest | 100  | ------------------------100 hours completed-------------------------|
| 22.02  |  2   | add dynamic routing to account page  and add shadcn components for UI and account editing|
|        |  1   | add Cancel and save buttons to account page |
| 23.02  |  2   | fix ui and add fields to the accout page, saving to db logic still ongoing |
|        |  2   | fix editing mode account page, next create s3 bucket to save avatar image |
|        |  1   | debug file storage failing, added policies to s3 bucket and other tweaks |
|        |  1   | add delete accisount feature, deletes public user only |
|        |  1   | fix bucket policy bug and avatar display thru public url |
| 24.02  |  1   | seed users data and setup page store for pages titles |
|        |  2   | look up and add logic to differentiate b/w two user roles, user and podcaster during login and register |
|        |  1.5 | generalize role based log in to rest of pages / pinia store / supaQuery / migration to sync with public.podcasters |
| 25.02  |  2   | fix pinia store and create seperate action for podcaster and user role + edits to backend and db + cleaning up|
| 26.02  |  1   | create users store + caching + suspense due to script returning a promise |
|        |  0.5 | add podcasters store + caching |
|        |  1   | create podcaste button + page |
|        |  0.5 | add podcaster page saves to db |
|        |  2   | edit sidebar + styling + paths + add footer + decolorized logo |
|        |  2   | add collapsable sidebar + reponsive to fix + further styling + fix routes for all pages + project tree |
|        |  1.5 | add podcasts store + fixed page routes + add emits & props to automatically close menu in sm |
| milest | 125  | ------------------------125 hours completed-------------------------|
| 27.02  |  1   | edit podcaster store + create podcasts/podcasters index page |
|        |  1   | fix auth store error by seperating tracking for user and podcaster + more styles fixing + fix paths |
|        |  1.5 | fix reactivity of state in auth store + create my pods page |
|        |  1   | add following request + tweak backend |
|        |  1   | researching websockets - socket.io |
|        |  1.5 | start socket.io config + add slug to podcasts and slug verification |
|        |  1   | styling + work on single podcaster page |
| 28.02  |  3   | work on podcaster page + seed data podcasters, podcasts|
|        |  1.5 | debug sidebar routing failing to plain ui + single podcast page |
|        |  1   | add subscription button with db query |
| 01.03  |  0.5 | refactoring + users list |
|        |  2   | 404 page + add lucide icons + refactor sidebar links |
|        |  1   | add data table componenet + fix loaders bug  |
|        |  1.5 | create following table  |
| 02.03  |  1.5 | add subscriptions and followings tables |
|        |  1   | suspense + error store for global error handling folowing tuto |
|        |  2   | set up glabal error handling |
|        |  1   | fix typescript errors + next up extend supabase types to include dtos data from express + fix auth store |
|        |  1   | create global store for sidebar with composables + trying to implement dark light mode toggling |
| milest | 150  | ------------------------150 hours completed-------------------------|
| 03.03  |  2   | add follow unfollow, subscribe unsubscribe to tables |
|        |  3   | add follow/unfollow and subscribe/unsubscribe logic to podcasts and podcasters pages respectively|
|        |  1   | look up deployment - opted for amazon ec2 + gitlab ci/cd |
| 04.03  |  1   | create seperate test supabse db + cross-env |
|        |  2   | set up unit testing with supertest to express users and podcasters get all endpoints and db |
|        |  2   | set up ec2 instalnce in aws install dependencies, set up gitlab |
| 05.03  |  2   | Opted for gke, creating account activation free tier, Enable GKE API , create cluster  |
|        |  2   | create manifests for deployment service secrets and configmap |
|        |  2   | backend and frontend failed to coonnect, set up ingress to manage routing + set up custom domaine name + dns |
| 06.03  |  3   | debugging pods + deployed app successfully  |
| 07.03  |  2   | debug server error not recognizing token |
|        |  1   | edit UI single podcast page and single podcaster page |
|        |  2   | Wrapping up |
| milest | 175  | ------ 175 SUBMIT PROJECT ------