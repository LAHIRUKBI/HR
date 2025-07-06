
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

1. Download Java JDK 23.0.2  [here](https://www.oracle.com/java/technologies/downloads/)

       🔴Get the installer from Oracle's website

       🔴Run the installer and note the installation location (usually C:\Program Files\Java\jdk-23.0.2)

2. Set JAVA_HOME Environment Variable

       🔴Press Windows + S and search for "Environment Variables"

       🔴Click "Edit the system environment variables"

       🔴In the System Properties window, click "Environment Variables..."

       🔴Under "System variables" (not user variables), click "New"

               ✔ Variable name: JAVA_HOME

               ✔ Variable value: C:\Program Files\Java\jdk-23.0.2 (or your actual install path)



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

**As a Employee,**

To log in as an employee, you must have registered in the system. This is done by the Admin. Then you will be given an email and an ID. You can use it to log in to the system using the Login button on the navigation bar. Then you can send your details and your requests to the Admin.
