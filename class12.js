  /*
We will create an application that lists arrays within an object as looping through objects are useful
We will use for (let key in obj)

This application will allow hosts to give add users to their chat server, assign roles through permissions that are true or untrue
  */

/*
1. StartApp() Function
Shows a menu with options like "add user", "list users", "assign role", "show permissions", or "quit".

2. createUsers() Function
Asks for the user's name
Adds the user to the users list with no role

3. listUsers() Function
Lists all the users and their assigned roles

4. assignRole() Function
Asks for the user's name and assigns the selected role to the user ( moderator, simple, or coAdmin)

5. showPermissions() Function
Asks for the user's name.
Shows the permissions for the assigned role (like darkMode, editAccounts).

6. Error 
If a user or role doesn't exist, it will show an error message.

7. Quit
The app will keep running until the user type "quit".
*/


const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

let users = [];

let role = {
    moderator: {
      darkMode: true,
      sensitivityAmount: false,
      editAccounts: true,
      deleteAccounts: false,
      createChannels: false,
      editChannels: true,
    },
    simple: {
      darkMode: true,
      sensitivityAmount: false,
      editAccounts: false,
      deleteAccounts: false,
      createChannels: false,
      editChannels: false,
    },
    coAdmin: {
      darkMode: true,
      sensitivityAmount: true,
      editAccounts: true,
      deleteAccounts: false,
      createChannels: true,
      editChannels: true,
    },
  };

function createUsers(){
      readline.question("Enter the name of the user: ", (userName) => {
        users.push({ name: userName, role: "" });  
        console.log(`${userName} has been added.`);
        StartApp();
      });
}

function listUsers(){
    if (users.length === 0) {
        console.log("No users have been added.");
      } else {
        console.log("Users and their roles:");
        for (let i = 0; i < users.length; i++) {
            console.log(`${i + 1}. ${users[i].name} - Role: ${users[i].role}`);  
        }
      }
      StartApp();
}

function assignRole() {
    readline.question("Enter the name of the user to assign a role: ", (userName) => {
        let user = null;
        for (let i = 0; i < users.length; i++) {
          if (users[i].name === userName) { 
            user = users[i];
            break; 
          }
        }
      if (user) {
        readline.question("Enter the role (moderator/simple/coAdmin): ", (roleName) => {
          if (role[roleName]) {
            user.role = roleName;
            console.log(`${userName} has been assigned the role of ${roleName}.`);
          } else {
            console.log("Invalid role name.");
          }
          StartApp();
        });
      } else {
        console.log("User not found.");
        StartApp();
      }
    });
}

function showPermissions() {
    readline.question("Enter the name of the user to view permissions: ", (userName) => {
        let user = null;

        for (let i = 0; i < users.length; i++) {
          if (users[i].name === userName) { 
            user = users[i];
            break; 
          }
        }
      if (user && user.role) {
        const userRole = role[user.role];
        console.log(`${userName}'s permissions:`);
        for (let key in userRole) {
          console.log(`${key}: ${userRole[key]}`);
        }
      } else {
        console.log("User not found / no role assigned.");
      }
      StartApp();
    });
}

function StartApp() {
    readline.question(
      "What would you like to do? (add user, list users, assign role, show permissions, quit): ",
      (_command) => {
        if (_command === "add user") {
          createUsers();
        } else if (_command === "list users") {
          listUsers();
        } else if (_command === "assign role") {
          assignRole();
        } else if (_command === "show permissions") {
          showPermissions();
        } else if (_command === "quit") {
          readline.close();
        } else {
          console.log("Invalid command. Please try again.");
          StartApp();
        }
      }
    );
}
  
StartApp();

// The code is well-structured and easy to follow:) - Sandy