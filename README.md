# Social Hub

Posting and managing multiple social media accounts is easy
- Social Hub Connect your Linkedin or twitter accounts to access the application.


# RoadMap
-[] User permissions engine
-[] Account and Teams setup


Account 
Teams - users

user -> email -> permission

Keeping Multiple People Support Simple
- One team can have a multiple people emails only
- 1 email can be part of multiple orgs but will have to login separately for each

### Permission Type
- Can Post
- Can Delete
- Can edit
- Can create post
- Can add a Account


## Permission engine
User has multiple teams
but for now team wise login is implemented.

each token had org and user name
org + useremail ==> permission for that user

query db get permission list

break or continue
once moving forward decide what to do next

query and update stuff
inside the action check if the guys is allowed to perform the action.
