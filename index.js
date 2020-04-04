const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const datafire = require('datafire');
// const primeng = require('primeng');
 let username = "";
function inquireQuestions() {
    inquirer
  .prompt([
    {
      type: "input",
      message: "GitHub username",
      name: "username"
    },
    {
      type: "password",
      message: "GitHub Password",
      name: "password"
    },
    {
      type: "input",
      message: "Project Title",
      name: "project name"
    },
    {
        type: "input",
        message: "Contributors",
        name: "contributors"
      },
      {
        type: "input",
        message: "Description of Project",
        name: "description"
      },
      {
        type: "checkbox",
        message: "Technology Stack Used",
        choices: [
            "HTML",
            "CSS",
            "JavaScript",
            "jQuery",
            "Node.js",
            "Express", 
            "React.js",
            "React", 
            "GIT", 
             "GitHub",
            "MongoDB", 
            "MySQL", 
            "Firebase", 
            "Handlebars", 
            "Bootstrap", 
            "Media Queries",
             "APIs", 
             "Microsoft Suite",
              "Heroku",
               "Command- Line"
       ],
        name: "technology"
      },
      {
        type: "list",
        message: "What license do you want to use?",
        choices: [
            "MIT", 
        "BSD", 
        "ISC", 
        "Apache", 
        "GPL"
        ]
    },
    

  ])
  .then(function(res) {
// console.log(response);
userName = res.userName;

` # Project
${res.project}
// ## Live Link
## Description
${res.description}
## Technology Stack
${res.technology}
## Contributors
${res.contributors}
## Contributors
${res.contributors}
## Contact
* #### Name:  ()
${res.name}
* #### Email: []()
${res.email}
* #### LinkedIn: "https:www.linkedin.com/in/
## License
${res.license}
`
// End MarkUp
      fs.writeFile("README.md", usersInfo, function(err) {
      if (err) {
      return console.log(err);
       }
      console.log("Success!");
      });
      githubAPICall();
    });
 
  }
  inquireQuestions();


function githubAPICall () {
console.log (username);
const queryURL = `https://api.github.com/users`+ username;

  axios
  .get(queryURL)
  .then(function(res) {
    console.log(res.data);
  });
}

 //end function
