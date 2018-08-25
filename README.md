# course-rating-api
A REST API that provides a way for users to review educational courses. (Requires Node.js & MongoDB)

- Run npm install  

- Seed database (instructions below)  

- Run the Mongo daemon  

- In an additional console window run npm start.  


## Seeding the database (optional):
Navigate to the project's 'seed-data' folder in the console.

    C:/Users/Skye/Desktop/course-rating-api-master/seed-data>

Then run...

    mongoimport.exe --db course-api --collection courses --type=json --jsonArray --file courses.json
    mongoimport.exe --db course-api --collection users --type=json --jsonArray --file users.json
    mongoimport.exe --db course-api --collection reviews --type=json --jsonArray --file reviews.json  
