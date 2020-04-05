const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
// const myBadge = require('./badges');
require('dotenv').config();


function inquireQuestions() {
    inquirer
  .prompt([
    {
      type: "input",
      message: "GitHub username",
      name: "username"
    },
    {
      type: "input",
      message: "Project Title",
      name: "project"
    },
    {
      type: "input",
      message: "Description",
      name: "description"
    },
    {
      type: "input",
      message: "Installation",
      name: "installation"
    },
    {
        type: "checkbox",
        message: "Technology Stack Used",
        choices:  ["Node.Js", " Express", " JavaScript", " jQuery", " React.js", " React", " GIT", " GitHub", " MongoDB", " MySQL", " Firebase", " Handlebars", " HTML", " CSS", " Bootstrap", " Media Queries", " APIs", " Microsoft Suite", " Heroku", " Command- Line"],
       name: "technology"
    },
    {
        type: "input",
        message: "Usage",
        name: "usage"
      },
{
        type: "list",
        message: "What license do you want to use?",
        choices: ["MIT", "BSD", "ISC", "Apache", "GPL"],
        name: "license"
    },
    {
        type: "input",
        message: "Contributors",
        name: "contributors"
      },
    
     
      {
        type: "input",
        message: "What is your LinkedIn URL?",
        name: "linkedIn"
      },
      {
        type: "input",
        message: "What is the command to run tests?",
        name: "tests"
      }
  ])
  .then(function(answers){
    let userName = answers.username;
    // console.log(response);
    githubAPICall(userName, answers);
  });
}

inquireQuestions();

function githubAPICall  (username, ans) {
    axios
    .get(`https://api.github.com/users/${username}`,
    
      {'Authorization': `token ${process.env.TOKEN}`}
    )
    .then(function(response){
      generateMD(response, ans);
      console.log(response.data);
    })
      .catch(function (error) {
      console.log(error);
      })
  }   

function generateMD(response, answers) {
var userInfo =`
<img src = "${response.data.avatar_url}">
// alt = "profile pic" style="width:"
 # Project
${answers.project}

// ## Live Link

## Table of Contents

### Contributors
${answers.contributors}

## Description
${answers.description}
## Installation
${answers.installation}

## Technology Stack
${answers.technology}
## Usage
${answers.usage}


## Contact
* #### Name:  ()
${response.data.name}
* ### GitHub 
"https://github.com/${response.userName}"
${response.portfolio}
* #### Email: []()
[${response.data.email}](${response.data.email})


* #### LinkedIn: "https:www.linkedin.com/in/${answers.linkedIn}
## License
${answers.license}

[travis-image]: https://img.shields.io/travis/git-theresa/GenerateRM/master.svg?label=license

## Tests
### To Run Tests, Run the Following Command:
${answers.tests}
`


// End MarkUp
fs.writeFile("README.md", userInfo, function(err) {
  if (err) {
  return console.log(err);
  }
  console.log("Success!");
});
}
    
 


