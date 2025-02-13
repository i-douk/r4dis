### Project description
 This project is a platform to manage subscriptions and followings relations between podcasters and users.
 There are two possible ways for podcasters and users to connect either through a paid subscription where the user pays either a one time stipend or a monthly stipend to a podcaster to have access to their content, ir through following podcasts created and made public by podcaster.
 Each has a certain set of permissions and operations available. The following section explains those roles and user types.

 #### superuser role
 The super user can manipulate the relations of subscriptions and followings by deleting them, addind them, and freezing a subscription and adding a comment
 The super users can also disable and verify podcasters and users and also deleting them from the database.

 #### admin role
 The admin can perform the following operation : disabling users and podcasters and freezing subscriptions.

 #### user role 
 The user can follow , unfollow and star a podcast, subscribe and send either a monthly stipend or a one time stipend to the pocaster. The user can also edit their name and avatar url through the platform.
 The user has access to all podcasters and the podcasts made public, and can access their profile and either subscribe or follow.

 ### podcaster role # DONE 
 This podcaster account can perform actions on its iformation and on the podcasts it creates. Through the /podcasters endpoint it is possible to edit the display name, avatar, links and the about section.  A podcaster can also add podcasts. ( to add , mark podcasts as private of public)

 ### public visitor



