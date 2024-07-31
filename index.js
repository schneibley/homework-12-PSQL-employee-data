const inquirer = require('inquirer');
const queries = require('./queries');

const mainMenu = async () => {
    try {
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
        // Define an object that maps actions to functions
        const actions = {
            'View all departments': async () => {
                const departments = await queries.getDepartments();
                console.table(departments);
            },
            'View all roles': async () => {
                const roles = await queries.getRoles();
                console.table(roles);
            },
            'View all employees': async () => {
                const employees = await queries.getEmployees();
                console.table(employees);
            },
            'Add a department': async () => {
                const { departmentName } = await inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department:'
                });
                await queries.addDepartment(departmentName);
                console.log('Department added.');
            },
            'Add a role': async () => {
                const { roleTitle, roleSalary, roleDepartmentId } = await inquirer.prompt([
                    { type: 'input', name: 'roleTitle', message: 'Enter the role title:' },
                    { type: 'input', name: 'roleSalary', message: 'Enter the salary:' },
                    { type: 'input', name: 'roleDepartmentId', message: 'Enter the department ID:' }
                ]);
                await queries.addRole(roleTitle, parseFloat(roleSalary), parseInt(roleDepartmentId));
                console.log('Role added.');
            },
            'Add an employee': async () => {
                const { employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId } = await inquirer.prompt([
                    { type: 'input', name: 'employeeFirstName', message: 'Enter the employee’s first name:' },
                    { type: 'input', name: 'employeeLastName', message: 'Enter the employee’s last name:' },
                    { type: 'input', name: 'employeeRoleId', message: 'Enter the role ID:' },
                    { type: 'input', name: 'employeeManagerId', message: 'Enter the manager ID (leave blank if none):' }
                ]);
                await queries.addEmployee(employeeFirstName, employeeLastName, parseInt(employeeRoleId), employeeManagerId ? parseInt(employeeManagerId) : null);
                console.log('Employee added.');
            },
            'Update an employee role': async () => {
                const { employeeId, newRoleId } = await inquirer.prompt([
                    { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
                    { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
                ]);
                await queries.updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
                console.log('Employee role updated.');
            },
            'Exit': () => {
                console.log('Goodbye!');
                process.exit();
            }
        };

        // Call the function associated with the chosen action
       console.log("Expected: ", actions[action]);
        if (actions[action]) {
            await actions[action]();
        } else {
            console.log('Invalid action.');
            process.exit(1);
        }
        
        // Call mainMenu recursively to prompt the user again
        await mainMenu();
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
};


mainMenu();
