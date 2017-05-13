# Agora Api
## FILE STRUCTURE
agora/

  package.json

  README.md

  src/

    index.js

    app/

      routes/

      models/

    lib/

      ** Stores helper files such as logger **

    config/

      ** Stores config files **

### Stage 1(Basic resources):
-Create routes to handle resource retrievals(i.e. files/posts/comments etc...)

### Stage 2(User controls):
-Create User routes(GET, POST, PUT, DELETE)

-Create User authentication system

-Create resource POST, PUT, DELETE using user auth.

### Stage 3(Core functionality):
-Create connection(allow following)

-Create "like" and tag system for posts

-Create basic feed algorithms

-Create basic trend algorithms

### Stage 4(Flare):
-Create sale system(i.e. attach a sale platform to posts)

    -Provide payment processing

    -Provide shipping details

    -Provide verification(so no one gets ripped off)

-Create additional profile types(Band, Store etc...)


### Stage 5(FIRE):
-Create permission system for managing sub profiles

-Create simple messaging platform(Possibly encrypted for fun?)
