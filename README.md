# HRPro - Human Resources Management System

A modern Human Resources Management solution built to streamline employee, department, and role management.
---

## Tech Stack
- **Fron-end**: React
- **Back-end**: Spring Boot
- **Databases**: MongoDB

---

## Installation and Setup

### Prerequisites

1. Ensure that **java version "23.0.2"** is installed on your device. You can download **Java JDK** [here](https://www.oracle.com/java/technologies/downloads/).
2. Now let's install it and create the Environment variable as **JAVA_HOME**.
3. For that, go to the place where you installed java **(C:\Program Files\Java\jdk-23)** and copy its path.
4. Then go to Edit the System environment variables > Environment variables and create it as **JAVA_HOME** under User variable and put the file path you copied for that
5. Do the same for System variables
6. Now take cmd and type **java -version** there and make sure that Java is installed correctly

### Backend Setup

1. Navigate to the backend directory of the project:  
   ```bash
   cd backend

2. Start the backend:  
   ```bash
   mvn spring-boot:run

### Frontend Setup

1. Navigate to the frontend directory of the project.  
   ```bash
   cd frontend

2. Install dependencies:  
   ```bash
   npm install

3. Start the frontend:  
   ```bash
   npm run dev

## How to flow this web app

First, activate both the **frontend** and the **backend**. When it is done correctly, the link to the website on the frontend will be displayed. By doing so, you can access the website.

**As a Administrator,**

Now the home page of the web application appears. To log in as the Admin user, click the **Admin** button in the navigation bar. Then, enter **"23054"** as the password in the popup box that appears and log in. This person is the one who can add employees to the system and do everything else.

---

**As a Employee,**

To log in as an employee, you must have registered in the system. This is done by the Admin. Then you will be given an email and an ID. You can use it to log in to the system using the Login button on the navigation bar. Then you can send your details and your requests to the Admin.
