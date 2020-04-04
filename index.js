const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
// const badges = require('gh-badges');
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
        message: "Tests?",
        name: "tests"
      }
  ])
  .then(function(response){
    let userName = response.username;
    console.log(response);
    githubAPICall(userName, response);
  });
}

inquireQuestions();

const githubAPICall = {
  getUser(username){
    axios
    .get(`https://api.github.com/users${username}`,
    {
      headers: {'Authorization': `token ${process.env.token}`}
    })
    .then(function(response){
      generateMD(response, res);
    })
      .catch(function (error) {
      console.log(error);
      })
  }   
};

function generateMD(response, res) {
  var userInfo =`
<img src = "${res.data.avatar_url}">

 # Project
${res.project}

// ## Live Link
## Table of Contents
### Contributors
${res.contributors}

## Description
${res.description}
## Installation
${res.installation}

## Technology Stack
${res.technology}
## Usage
${res.usage}


## Contact
* #### Name:  ()
${res.data.name}
* ### GitHub 
"https://github.com/${response.userName}"
${response.portfolio}
* #### Email: []()
[${res.data.email}](${res.data.email})

* ### PortfolioPic
${res.data.avatar}
* #### LinkedIn: "https:www.linkedin.com/in/${response.linkedin}
## License
${res.license}

## Tests
${res.tests}
`


// End MarkUp
fs.writeFile("README.md", userInfo, function(err) {
  if (err) {
  return console.log(err);
  }
  console.log("Success!");
});
}
    
 

