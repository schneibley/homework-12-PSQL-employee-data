# Employee Tracker

## Description

The **Employee Tracker** is a command-line application that helps manage a company's employee database. Built using Node.js, Inquirer, and PostgreSQL, this tool provides a user-friendly interface for viewing and managing departments, roles, and employees within an organization.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Schema](#schema)
- [Video Walkthrough](#video-walkthrough)
- [License](#license)

## Installation

To set up the application on your local machine, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:schneibley/homework-12-PSQL-employee-data.git
   ```

2. **Install Dependencies**

   Ensure you have Node.js and PostgreSQL installed. Then, run the following commands to install required packages:

   ```bash
   npm install
   ```

   For Inquirer version 8.2.4:

   ```bash
   npm install inquirer@8.2.4
   ```

3. **Set Up PostgreSQL Database**

   - Create a new PostgreSQL database (e.g., `employee_db`).
   - Configure your PostgreSQL credentials in a `.env` file (not included in this repository). Example `.env` file:

     ```
     DB_HOST=localhost
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_NAME=employee_db
     ```

   - Create the database schema by running the SQL commands in `schema.sql` file (provided in the repository).

   - Optionally, use the `seeds.sql` file to populate the database with initial data.

## Usage

To start the application, run:

```bash
node index.js
```

Follow the command-line prompts to:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role

## Features

- **View All Departments**: Displays a formatted table showing department names and IDs.
- **View All Roles**: Shows job titles, role IDs, departments, and salaries.
- **View All Employees**: Lists employee IDs, names, job titles, departments, salaries, and managers.
- **Add a Department**: Prompts for a department name and adds it to the database.
- **Add a Role**: Prompts for a role name, salary, and department, then adds the role to the database.
- **Add an Employee**: Prompts for an employee's first name, last name, role, and manager, then adds the employee.
- **Update an Employee Role**: Prompts to select an employee and their new role, updating the database accordingly.

## Schema

The application utilizes the following database schema:

- **Department Table**

  ```sql
  CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
  );
  ```

- **Role Table**

  ```sql
  CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
  );
  ```

- **Employee Table**

  ```sql
  CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
  );
  ```

## Video Walkthrough

A video demonstration of the application's functionality can be found [here](https://drive.google.com/file/d/1ACFe27ndkbamTroHu9jY1sCqicEu2EBB/view).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or issues with the application. Enjoy managing your employee data!
