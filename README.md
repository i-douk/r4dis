# R4dis app - Full Stack -web development project 10 credits - University of Helsinki

## Live Demo
[View the deployed project here](http://r4dis.com/)

## About the Platform
This platform is designed to connect podcasters to their audience. It provides subscription to podcasters and following podcasts functionality to help users keep track of their favorite podcasts.

## User Roles
The platform supports two distinct user roles:

1. **User**: A regular user can create a account, add an about me section and upload an avatar picture, follow and unfollow pdocasts, subscribe and unsubscribe to podcasters, and keep track of their activity in following and subscription lists.
2. **Podcaster**: A podcaster can create an account, add an about me section and upload an avatar picture, a podcaster can add podcasts with external links, and view their added podcasts in my pods.

## Used Tutorials for Learning
The following tutorials and resources were instrumental in building this project:
- Course material for the backend
- vueschool.io vue.js courses for the vue frontend
## How my project differantiates from the tutorial used
While I heavily relied on the tutorial for vue.js fundamentals, understanding the Composition API, managing global state with Pinia, and composables, and using Suspens for asynchronous operations loading, learning new technics for handling errors. My layout was personalised and the the handling of the sidebar state was developed independantly, furthermore, I combined both a dual communication with the database through supabase api -similar to the tutorial- and an express api - adding a level of complexity to manage the stores and data fetching and various other operations.
## How I Expanded My Knowledge
While working on this project, I expanded my knowledge in the following areas:
- Learning to work with a new frontend framework
- Interacting with supabase
- Running pods and managing deployment using Kubernetes
## How I intend to expand the project
- Using Supabase to subscribe to real-time changes to the database -or socket.io- to populate the feed with revelevant data and recent activity of users and podcasters.
- Add more functionalities for the podcasters role to manage their content.
- Expand the subscription logic to allow a monthly stipend to be attributed to the podcaster from a subscribed user.


