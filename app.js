const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Intern = require('./lib/intern');

const beginningHtml =`<!doctype><html><head><title>Employee Team Generator</title><meta charset="utf-8"><link rel="stylesheet" href="style.css"></head><body><h1>Employee Team</h1>`;
const endingHtml = `</body></html>`;
const employees = [];
const employeeHtml = [];
let id = 0;

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
                let manager = new Manager(res.name, id, res.email, res.officeNumber);
                employees.push(manager);
                break;
            case 'engineer':
                let engineer = new Engineer(res.name, id, res.email, res.github);
                employees.push(engineer);
                break;
            case 'intern':
                let intern = new Intern(res.name, id, res.email, res.school);
                employees.push(intern);
                break;
            default: console.log('No role');
        }
        id++;
        continueQuestions();
    })
};
function continueQuestions() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmation',
            message: 'Would you like to enter another employee?',
            filter: val => {
                return val;
            }
        }
    ]).then( val =>{
        if (val.confirmation) {
            employeeSetup();
        } else {
            generateHtml();
        }
    })
}
function generateHtml() {
    employees.forEach(employee => {
        let employeeSpecific = employee.getRole();
        let empResult;
        switch (employeeSpecific){
            case 'Manager':
                empResult = `Office #: ${employee.getOfficeNumber()}`;
                break;
            case 'Engineer':
                empResult = `Github profile: ${employee.getGithub()}`
                break;
            case 'Intern':
                empResult = `Attends: ${employee.getSchool()}`
                break;
            default: console.log('Not successful');
        }
        const $employee = `<section class="employee"><h3>${employee.getName()}</h3><h4>${employee.getRole()}</h4><p>Employee ID: ${employee.getId()}</p><p>${empResult}</p><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></section>`;
        employeeHtml.push($employee);
    });
    const htmlArray = [beginningHtml, ...employeeHtml, endingHtml];
    fs.writeFile('output/index.html', htmlArray.join(' '), err=>{
        if (err) throw err;
    });
    console.log(employeeHtml);
}
function employeeSetup() {
    inquirer.prompt(
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
    })
} employeeSetup();

