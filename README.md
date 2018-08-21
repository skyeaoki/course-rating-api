# course-rating-api
A REST API that provides a way for users to review educational courses. (Requires Node.js & MongoDB to be already installed.)

## First:    
Navigate to project folder and run:

    npm install  


## Seed database (optional):
Navigate to the project's 'seed-data' folder in the console.

    C:/Users/Skye/Desktop/course-rating-api-master/seed-data>

Then run...

### On Mac Terminal:

    npm run seedCourses
    npm run seedUsers
    npm run seedReviews

### On Windows CMD:

    "<path/to/mongoimport.exe>" --db course-api --collection courses --type=json --jsonArray --file courses.json
    "<path/to/mongoimport.exe>" --db course-api --collection users --type=json --jsonArray --file users.json
    "<path/to/mongoimport.exe>" --db course-api --collection reviews --type=json --jsonArray --file reviews.json  

## Run Mongo daemon:

### Mac Terminal:
    mongod

### Or Windows CMD:
    "<path/to/mongod.exe>"


## Finally:  
In an additional console window navigate to project folder and run:

    npm start
