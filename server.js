const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Lizaloo767',
    database: 'employeeTracker_db'
  },
  console.log('Connected to the employeeTracker_db database.')
);

  function viewDepartments() {
    db.query('select * from departments', function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(results);
    });
  }

  function viewRoles () {
    db.query('select * from roles', function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(results);
    });
  }

  function viewEmployee () {
    db.query('select * from employee', function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(results);
    });
  }

  function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What do you want to do?',
            name: 'question',
            choices: ["View all Departments","View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an employee role"]
        }
    ])
        .then((response) => {
            //call function to respond to given prompt using the switch based in first input from inquire
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
                case "Exit";
                  connection.end();
                  console.log("Sayonara!");
                  break;
                }
          });
}

  viewDepartments();
  viewRoles();
  viewEmployee();

