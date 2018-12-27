# course-rating-api
A REST API that allows users to review educational courses. It includes bcrypt user authentication. (Requires Node.js & MongoDB)

To test this API with the provided collection of Postman requests, please follow the instructions below:

1. Run:

       npm install  
       
2. Run the Mongo daemon

3. Seed the database:
In the console navigate to the project's 'seed-data' folder and run...

       mongoimport.exe --db course-api --collection courses --type=json --jsonArray --file courses.json
       mongoimport.exe --db course-api --collection users --type=json --jsonArray --file users.json
       mongoimport.exe --db course-api --collection reviews --type=json --jsonArray --file reviews.json  
    
4. Import the 'CourseAPI.postman' file located in the root directory to Postman. 

5. Run:
                
       npm start
       
6. Once the console has notified you the database connection was successful you may send Postman requests.


(Postman tests and seed data provided by teamtreehouse.com)
