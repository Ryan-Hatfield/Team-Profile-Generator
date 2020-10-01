const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//---where the array of objects are stored.
const team = [];
//---Collecting information on the manager of the team.
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Provide the name of the manager.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter the ID number of the manager.",
            name: "id"
        },
        {
            type: "input",
            message: "Provide the email of the manager.",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the manager's office phone number.",
            name: "officeNumber"
        },
    ]).then(function (response) {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(manager);
        addTeamMember();
    })
}
//---Function for asking use if they would like to add additional team members or not.
function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add? (use the up and down arrows",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No."
            ],
            name: "role",
        }
    ]).then(function (response) {
        if(response.role === "Manager") {
            createManager();
        } else if(response.role === "Engineer") {
            createEngineer();
        } else if(response.role === "Intern") {
            createIntern();
        } else {
            buildTeam();
        }
    })
}
//---Collecting information on the engineer team member.
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Provide the name of team member.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter the ID number of the team member.",
            name: "id"
        },
        {
            type: "input",
            message: "Provide the email of the team member.",
            name: "email"
        },
        {
            type: "input",
            message: "Enter team member's GitHub username.",
            name: "github",
        },
    ]).then(function (response) {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        team.push(engineer);
        addTeamMember();
    })
}
//--Collecting information on the intern team memmber.
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Provide the name of team member.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter the ID number of the team member.",
            name: "id"
        },
        {
            type: "input",
            message: "Provide the email of the team member.",
            name: "email"
        },
        {
            type: "input",
            message: "Enter your team member's school name.",
            name: "schoolName",
        },
    ]).then(function (response) {
        const intern = new Intern(response.name, response.id, response.email, response.schoolName);
        team.push(intern);
        addTeamMember();
    })
}
//--Creating HTML based on the information provided by the user.
function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
}

createManager();
