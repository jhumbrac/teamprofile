const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Intern = require('./lib/intern');

let generateQuestions = async function(employeeType) {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Employee name?',
            filter: function(val) {
                return val;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Employee email?',
            filter: function(val){
                return val;
            }
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What office number?',
            when: function(){
                return employeeType === 'manager'
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the employee's github username?",
            when: function(){
                return employeeType === 'engineer'
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school do they attend?',
            when: function() {
                return employeeType === 'intern'
            }
        }

    ]).then( res =>{
        res.role = employeeType;
        //console.log(res);
        switch(res.role){
            case 'manager':
                console.log('manager');
                break;
            case 'engineer':
                console.log('engineer');
                break;
            case 'intern':
                console.log('intern');
                break;
            default: console.log('No role');
        }
    })
};


inquirer
    .prompt(
        {
            type: 'list',
            name: 'role',
            message: "What is this employee's role?",
            choices: ['manager', 'engineer', 'intern'],
            filter: function(val){
                return val.toLowerCase();
            }
        }
    ).then( res => {
        const role = res.role;
        generateQuestions(role);
        // if ( res.role === 'manager') {
        //     // generateQuestions(manager)
        //     console.log('manager')
        // } else if ( res.role === 'engineer') {
        //     // generateQuestions(engineer);
        //     console.log('engineer')
        // } else {
        //     //generateQuestions(intern);
        //     console.log('intern')
        // }
        //questions:
        // name
        // email
        // role
        // id
        // specific info based on role ???
        
        // Ask manager first
        // new team member?

        // validation to ensure proper format
    })

