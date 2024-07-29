const client = require('./db');

// Get all departments
const getDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

// Get all roles
const getRoles = async () => {
    const res = await client.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    return res.rows;
};

// Get all employees
const getEmployees = async () => {
    const res = await client.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
            department.name AS department, role.salary, manager.first_name AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    return res.rows;
};

// Add a department
const addDepartment = async (name) => {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Add a role
const addRole = async (title, salary, department_id) => {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

// Add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

// Update employee role
const updateEmployeeRole = async (employee_id, new_role_id) => {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};