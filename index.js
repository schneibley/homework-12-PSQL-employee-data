const inquirer = require('inquirer');
const queries = require('./queries');

// Define the main menu function, which handles user interaction
const mainMenu = async () => {
    // Prompt the user with a list of actions they can perform
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    // Handle the user's choice with a switch statement
    switch (action) {
        case 'View all departments':
            // Retrieve and display all departments from the database
            const departments = await queries.getDepartments();
            console.table(departments);
            break;
        
        case 'View all roles':
            // Retrieve and display all roles from the database
            const roles = await queries.getRoles();
            console.table(roles);
            break;

        case 'View all employees':
            // Retrieve and display all employees from the database
            const employees = await queries.getEmployees();
            console.table(employees);
            break;

        case 'Add a department':
            // Prompt the user for the department name
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:'
            });
            // Add the new department to the database
            await queries.addDepartment(departmentName);
            console.log('Department added.');
            break;

        case 'Add a role':
            // Prompt the user for the role details
            const { roleTitle, roleSalary, roleDepartmentId } = await inquirer.prompt([
                { type: 'input', name: 'roleTitle', message: 'Enter the role title:' },
                { type: 'input', name: 'roleSalary', message: 'Enter the salary:' },
                { type: 'input', name: 'roleDepartmentId', message: 'Enter the department ID:' }
            ]);
            // Add the new role to the database
            await queries.addRole(roleTitle, parseFloat(roleSalary), parseInt(roleDepartmentId));
            console.log('Role added.');
            break;

        case 'Add an employee':
            // Prompt the user for the employee details
            const { employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId } = await inquirer.prompt([
                { type: 'input', name: 'employeeFirstName', message: 'Enter the employee’s first name:' },
                { type: 'input', name: 'employeeLastName', message: 'Enter the employee’s last name:' },
                { type: 'input', name: 'employeeRoleId', message: 'Enter the role ID:' },
                { type: 'input', name: 'employeeManagerId', message: 'Enter the manager ID (leave blank if none):' }
            ]);
            // Add the new employee to the database
            await queries.addEmployee(employeeFirstName, employeeLastName, parseInt(employeeRoleId), employeeManagerId ? parseInt(employeeManagerId) : null);
            console.log('Employee added.');
            break;

        case 'Update an employee role':
            // Prompt the user for the employee ID and new role ID
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
                { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
            ]);
            // Update the employee's role in the database
            await queries.updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
            console.log('Employee role updated.');
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    await mainMenu();
};

mainMenu();