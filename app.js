const inquirer = require('inquirer');
const fs = require('fs');

inquirer
    .prompt(
        //questions:
        // name
        // email
        // role
        // id
        // specific info based on role ???
        
        // Ask manager first
        // new team member?

        // validation to ensure proper format
    ).then (

    );

// class - employee
// name
// id
// title
// getName()
// getI()
// getEmail()
// getRole() -> returns 'employee'

// employee types (extend) engineer, intern, manager

// manager
// officeNumber
// getRole() overriden to return manager

// engineer
// github - username
// getGithub()
// getRole() -> Engineer

// intern
// school
// getSchool()
// getRole() -> Intern