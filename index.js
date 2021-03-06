// Require Packages
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
require('dotenv').config();

// Prompts within command line
function inquireQuestions() {
  inquirer
  .prompt([
  {   
    type: "input",
    message: "What is your full name",
    name: "firstLast"
  },
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
    choices:  [" Node.Js", " Express", " JavaScript", " jQuery", " React.js", " React", " GIT", " GitHub", " MongoDB", " MySQL", " Firebase", " Handlebars", " HTML", " CSS", " Bootstrap", " Media Queries", " APIs", " Microsoft Suite", " Heroku", " Command- Line"],
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
    let username = answers.username;
    githubAPICall(username, answers);
    });
}
inquireQuestions();

      // Using GitHub API 
    function githubAPICall(username, ans) {
      const queryURL = `https://api.github.com/users/` + username;
      axios
      .get(queryURL, {
      headers: {'Authorization': `token ${process.env.TOKEN}`}
      })  
      .then(function(response) { 
      generateMD(response, ans);
      // console.log(response.data);
      })
     .catch(function (error) {
      console.log(error);
      })
    }


        // Generate ReadMe 
  function generateMD(response, answers) {
  var userInfo =`
  
  <img align="left" src= "https://img.shields.io/badge/License-${answers.license}-green">

  <img align="right" width="100" height="100" src="${response.data.avatar_url}">
  
 
  # **Project** ${answers.project}
  
  ##  **_Live Link_** 
  *  ~~_Insert Live Link Once Generated_~~
  
  ##  **Table of Contents**
  * Description
  * Installation
  * Technology Stack
  * Usage
  * Contact
  * License
  * Test
  * Questions

  ##  **Description**
  ${answers.description}
 
  ## **Installation**
  ${answers.installation}

  <img  style="width: 100px;" src="assets/screenShot2.png" alt="screenshot" />
 
  ## **Technology Stack**
  ${answers.technology}

  ##  **Usage**
  ${answers.usage}

  ###  **Contributors**
  ${answers.contributors}

  ## **Contact**
  ####  Name: ${answers.firstLast}
  ####  GitHub https://github.com/${answers.username}
  ####  Portfolio 
  ~~${response.portfolio}~~
  ####  Email: [${response.data.email}](${response.data.email})
  ####  LinkedIn: https://www.linkedin.com/in/${answers.linkedIn}
  
  ####  **License** 
   ${answers.license}

  ####  Tests
  _To run tests, use the following command:_  ${answers.tests}

  #### Questions? 
  _Please contact me @:_[${response.data.email}](${response.data.email})
  
`
    // End MarkUp

      // Place Responses and Answers onto Page
    fs.writeFile("genREADME.md", userInfo, function(err) {
      if (err) {
      return console.log(err);
      }
      console.log("Success!");
      });
}


 


