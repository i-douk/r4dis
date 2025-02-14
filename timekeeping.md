# time keeping

| date | hours | tasks |
| :----:|:-----| :-----|
| 17.10. | 1    | setting up project |
|        | 1    | db connection with supabase |
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
|        | 1    | restrict subscriptions and followings CRUD to super user and admin |
|        | 1    | add freezing and commenting to superuser and admin on subscriptions |
|        | 1    | add bulk edit to podcaster and add propreties to podcast schema and db |
|        | 1    | add properties to users and podcasters and edit users put endpoint |
| 17.11  | 1    | add supscription count and follow count dynamically to podcasters and podcasts without db storing |
|        | 2    | created logo with diff declinaison in figma |
| 13.02  | 1    | add verfiication to sequelize migrations |
|        | 0    | Starting over with frontend due to diffculty getting back where I left off, all entries and corresponding time here concerning frontend will be removed |
|        | 2    | Resetting up frontend with vite supabase and tailwind |
|        | 1    | add chadcn vue  |
| 14.02  | 2    | refactor back and front to sync users table with supaAuth table |
|        | 2    | refactoring + add register vue and supaAuth |
|        | 1.5  | debug sign up error bc of trigger |
|        | 0.5  | create login page, pwd hash b4 saving to users |
| milest | 175  | ------ finish! ------|
| total  | 66   | |
| remain | 109  | |