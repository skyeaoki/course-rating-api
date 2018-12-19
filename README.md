# course-rating-api
A REST API that provides a way for users to review educational courses. (Requires Node.js & MongoDB)

To test this API with Postman requests, please follow the instructions below:

1. Run:

       npm install  
       
2. Run the Mongo daemon

3. Seed database: Navigate to the project's 'seed-data' folder in the console and run...

       mongoimport.exe --db course-api --collection courses --type=json --jsonArray --file courses.json
       mongoimport.exe --db course-api --collection users --type=json --jsonArray --file users.json
       mongoimport.exe --db course-api --collection reviews --type=json --jsonArray --file reviews.json  
    
4. import the 'CourseAPI.postman' file located in the root directory to Postman. 

5. Run:
                
       npm start

(Postman tests provided by teamtreehouse.com)
