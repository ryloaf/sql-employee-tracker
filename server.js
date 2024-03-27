// required packages
const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// created a connection to th MySQL database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'your_password here',
    database: 'employeeTracker_db'
  },
  console.log('Connected to the employeeTracker_db database.')
);

// initializes the application
  function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What do you want to do?',
            name: 'question',
            choices: ["View all Departments","View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an employee role"]
        }
    ])
        .then((response) => {
            // call coresponding function based on user's selection
            switch (response.question){
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "View all Employees":
                    viewEmployee();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateRole();
                    break;
                case "Exit":
                  // close database
                  db.end();
                  console.log("Sayonara!");
                  break;
                }
          });
}

// function to view all deparments in database
function viewDepartments() {
  db.query('select * from departments', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
}

// function to view all roles in database
function viewRoles () {
  db.query('select * from roles', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
}

// function to view all employees in database
function viewEmployee () {
  db.query('select * from employee', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
}

// function to add a department to the database
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter new department name:",
  })
  .then((response) => {
    // construct SQL query to insert a new department
    const query = `INSERT INTO departments (department_name) VALUES ("${response.name}")`;
    db.query(query, function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Department added successfully!");
      init();
    });
  });
}

// function to add a role to the database
function addRole() {
  db.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter new role title:",
          },
          {
            type: "input",
            name: "salary",
            message: "Enter salary for the role:"
          },
          {
            type: "list",
            name: "department",
            message: "Which department does this role belong to?",
            choices: res.map(department => department.department_name)
    },
  ]).then((response) => {
    const department = res.find(
      department => department.department_name === response.department);
    const query = "INSERT INTO roles SET ?";
    db.query(query,
      {
        title: response.title,
        salary: response.salary,
        department_id: department.id,
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Added role ${response.title} with salary ${response.salary} to ${response.department} department in the database.`);
        init();
      }
      );
    });
  });
}

// function to add an employee to the database
function addEmployee() {
  // retrieves roles from the database
    db.query("SELECT id, title FROM roles", (err, resRoles) => {
      if (err) {
        console.log(err);
        return;
      }
      const roles = resRoles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      // retrieves employees from the database
      db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
        (err, resEmployees) => {
          if (err) {
            console.error(err);
            return;
          }
          const employees = resEmployees.map(({ id, name }) => ({
            name: name,
            value: id,
          }));
        });
    });
  }
  // function to update an employee's role in the database
    function updateRole() {
      // retrieves the list of employees
      db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
        if (err) {
          console.error(err);
          return;
        }
        // prompts the user to select an employee
        inquirer.prompt([
          {
            type: 'list',
            message: 'Select the employee whose role you want to update:',
            name: 'employeeId',
            choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
          }
        ]).then(employeeResponse => {
          // retrieves the list of roles
          db.query('SELECT id, title FROM roles', (err, roles) => {
            if (err) {
              console.error(err);
              return;
            }
            // prompts the user to select a new role for the employee
            inquirer.prompt([
              {
                type: 'list',
                message: 'Select a new role for the employee:',
                name: 'roleId',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
              }
            ]).then(roleResponse => {
              // updates the employee's role in the database
              db.query('UPDATE employee SEET role_id = ? WHERE id = ?', [roleResponse.roleId, employeeResponse.employeeId], (err, result) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Employee role updated successfully!');
                init();
              });
            });
          });
        });
      });
    }

init();

  viewDepartments();
  viewRoles();
  viewEmployee();

