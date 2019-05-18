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
	 findProducts();
});

const findProducts = function() {
    const query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log('\n');
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID:  " + res[i].item_id + " Product Name: " + res[i].product_name + 
            " Department: " + res[i].department_name + " Price: " + res[i].price + " Quanity: " 
            + res[i].stock_quantity);
        }
    });
    selectProduct();
};

const selectProduct = function() {
    
}