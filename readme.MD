# **Student Hostel Room Allocation System**

## **Introduction**

The **Student Hostel Room Allocation System** is a full-stack application designed to streamline the management of student hostel rooms. This system is tailored for estate employees, enabling them to securely log in, view room availability, allocate rooms to students, and manage existing room assignments. The backend is powered by **Spring Boot**, while the frontend is built using **React**, ensuring a modern, robust, and user-friendly experience.

### **Key Features**
1. **Authentication & Authorization**: Secure login for estate employees using JWT (JSON Web Token) authentication.
2. **Room Management**: View, allocate, and modify room assignments seamlessly.
3. **Filtering & Searching**: Advanced tools to filter rooms by availability, floor, or other criteria.
4. **Scalable Architecture**: Modular and maintainable codebase with clearly defined backend and frontend components.
5. **Real-Time Interaction**: A responsive and dynamic frontend ensures instant feedback for actions like room allocation or status updates.

---

## **Project Architecture**

This project follows a **client-server architecture**, with the backend and frontend working together seamlessly.

### **Backend (Spring Boot)**
The backend provides a RESTful API to handle all business logic and database operations. It is structured as follows:

```
com.naval.HostelAllocation
├── configure
│   └── MyConfiguration.java      # Custom application configuration
├── controller                    # Handles API requests
│   ├── HostelController.java     # APIs for hostel-related operations
│   ├── LoginController.java      # APIs for authentication and login
│   └── StudentController.java    # APIs for student-related operations
├── dto                           # Data Transfer Objects for API communication
│   ├── LoginDTO.java             # Handles login-related payloads
│   └── StudentDetailDTO.java     # Handles student-related payloads
├── entities                      # Entity classes representing database tables
│   ├── Hostel.java               # Entity for hostel room details
│   └── Student.java              # Entity for student details
├── repository                    # Manages database interactions
│   ├── HostelRepository.java     # Queries for hostel-related data
│   └── StudentRepository.java    # Queries for student-related data
├── service                       # Business logic layer
│   ├── HostelService.java        # Logic for room operations
│   └── StudentService.java       # Logic for student operations
├── security                      # Authentication and authorization setup
│   └── SpringSecurity.java       # Configures Spring Security with JWT
└── utility
    └── DemoApplication.java      # Main application entry point
```

### **Frontend (React)**
The frontend, built using **React**, provides an interactive and user-friendly interface for managing the hostel allocation system.

```
project-directory/
├── public/
│   ├── index.html                # Entry point for the React app
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/               # Reusable React components
│   │   ├── Header.js
│   │   ├── Hostel.js             # Handles room operations
│   │   ├── Login.js              # Login form
│   │   └── Student.js            # Manages student-related views
│   ├── css/                      # Stylesheets
│   │   ├── Header.css
│   │   ├── Hostel.css
│   │   ├── Login.css
│   │   └── Student.css
│   ├── App.js                    # Main app component
│   ├── index.js                  # Entry point for React app logic
│   └── services/                 # API interaction logic
│       ├── authService.js        # Handles authentication API calls
│       └── hostelService.js      # Handles hostel-related API calls
└── package.json                  # Project dependencies
```

---

## **Getting Started**

### Prerequisites
- **Backend**: Java 17+, Maven, MySQL (or any relational database)
- **Frontend**: Node.js (v16+) and npm or Yarn package manager

---

### Steps to Run the Application

#### **Backend (Spring Boot)**:
1. Clone the repository and navigate to the backend folder.
2. Configure the database settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hostel_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
4. The backend will be available at `http://localhost:8080`.

---

#### **Frontend (React)**:
1. Navigate to the frontend directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The frontend will be available at `http://localhost:3000`.

---

## **Application Workflow**

### **Backend**:
- **Login and Authentication**:
  - Users must log in to access the system, with JWT tokens used for secure API calls.
- **Room Management**:
  - Fetch the list of rooms, check allocation status, and modify room assignments.
- **Filtering**:
  - Apply filters (e.g., room availability, floor) using API query parameters.

---

### **Frontend**:
- **Login Page**:
  - User-friendly login form with validation.
- **Dashboard**:
  - Overview of room statuses with visual cues.
- **Room Allocation**:
  - Allocate rooms via simple forms, with real-time updates.
- **Filters**:
  - Intuitive filter panel for narrowing search results.

---

## **Technologies Used**

### **Backend**:
- **Spring Boot**: Core framework for building the backend.
- **Hibernate**: For ORM and database operations.
- **Spring Security**: For secure authentication and authorization.
- **MySQL**: Database to store room and student data.

### **Frontend**:
- **React**: Core library for building the user interface.
- **CSS Modules**: For styling components.
- **Axios**: For making API calls.
- **React Router**: For handling navigation.

---



## **Contact**

For any questions or support, feel free to contact Naval Kishore Singh Bisht .

My email : NavalKishore.Singh@iiitb.ac.in

--- 
