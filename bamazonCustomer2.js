const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"#Ladybird1987!",
	database:"bamazonDB"
});

connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId);
	 
});

