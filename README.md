Project Title

Online Course Platform using MongoDB (NoSQL)


Project Description:
This project presents the design and implementation of a full-stack **Online Course Platform** with a focus on **NoSQL database modeling and backend logic**. The main objective of the project is to demonstrate practical skills in designing advanced MongoDB schemas, implementing RESTful APIs, and applying aggregation pipelines for analytical insights
The platform allows users to register and authenticate, create and manage online courses, add and remove lessons, and view analytical summaries of course data. The project integrates **embedded and referenced data models**, advanced update and delete operations, compound indexing, and JWT-based authentication
The system showcases real-world usage of MongoDB for handling hierarchical data, user-specific access control, and analytical queries. Overall, the project demonstrates how NoSQL databases support scalable, flexible, and business-oriented application development

Dataset / Data Information

This project does not rely on a static dataset. Instead, it uses **dynamically generated application data** created by users through the platform

Data Type: Application-generated data
Database: MongoDB (NoSQL)

Collections Include:
* Users
* Courses

Data Characteristics:
* Real-time data creation through REST API
* Hierarchical data structures (courses with embedded lessons)
* User-specific ownership of records

Database Schema Overview

User Collection

Fields:

*username (String)
*email (String)
*password (hashed String)

Course Collection

Fields:

* title (String)
* category (String)
* price (Number)
* lessons (Embedded documents)
* createdBy (Reference to User)
* createdAt / updatedAt (Timestamps)

Data Modeling Approach:

*Embedded documents for lessons (one-to-many relationship)
*Referenced documents for user-course relationship

Project Structure

backend/
config/
db.js
models/
User.js
Course.js
routes/
authRoutes.js
courseRoutes.js
analyticsRoutes.js
middleware/
auth.js
server.js
.env

frontend/
login.html
register.html
courses.html
my-courses.html
create-course.html
edit-course.html
analytics.html

README.md

## Methods and Tools

1. Programming Languages

* JavaScript (Node.js)
* HTML, CSS, JavaScript (Frontend)

2. Technologies and Libraries

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JSON Web Tokens (JWT)
* bcrypt (password hashing)

3. Database and Backend Techniques

* RESTful API development
* CRUD operations across multiple collections
* Embedded and referenced data models
* Advanced MongoDB update operators ($push, $pull)
* Multi-stage aggregation pipelines
* Compound indexing and query optimization
* Authentication and authorization middleware

REST API Functionality

uthentication

* User registration
* User login with JWT

Course Management

* Create course (authenticated users)
* Read all courses
* Read user’s own courses
* Update course (owner only)
* Delete course (owner only)

Lesson Management

* Add lesson to course ($push)
* Remove lesson from course ($pull)

Analytics

* Courses grouped by category
* User-specific course summary using aggregation pipelines

Aggregation and Analytics

The project includes multiple aggregation-based endpoints that demonstrate analytical querying in MongoDB:

* Grouping courses by category with average pricing
* User-specific analytics including:

  * Total number of courses
  * Average, minimum, and maximum course price
  * Total number of lessons

These analytics endpoints illustrate real business use cases for MongoDB aggregation pipelines.

Indexing and Optimization

* Compound index on `category` and `price`
* Index on `createdBy` field for fast user-based queries
* Early `$match` stages in aggregation pipelines to reduce processed data volume

How to Run the Project

 Backend Setup

1. Ensure Node.js is installed
2. Navigate to backend directory
3. Install dependencies:

npm install

4. Create a `.env` file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


5. Start the server:

node server.js

Frontend Usage

* Open HTML files in the browser
* Ensure backend is running on port 5000
* Use login/register pages to access protected functionality

 Key Notes

* All data is generated dynamically through user interaction
* Passwords are securely hashed
* Protected routes require valid JWT tokens
* Users can only modify their own courses
* The project was developed strictly for educational purposes
