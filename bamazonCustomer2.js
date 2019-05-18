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
        console.log("\n");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID:  " + res[i].item_id + " Product Name: " + res[i].product_name + 
            " Department: " + res[i].department_name + " Price: " + res[i].price + " Quanity: " 
            + res[i].stock_quantity);
        }
    });
    selectProduct();
};

const selectProduct = function() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Select Item ID of Product you would like to buy?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;

            } else {
                console.log("\nNot a valid ID number.\n");
                return false;
            } 
        } 

    	}, {

        name: "total",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) { 
            if (isNaN(value) == false) {                
                return true;
            } else {        
                console.log("\nPlease enter total\n");
                return false;
            } 
        } 
        
    	}]).then(function(answer) {         
            console.log(answer);
            IntItem = parseInt(answer.total);
            console.log(IntItem);
            connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.id}], function(err, data) { 
                if (err) throw err;
                if (data[0].stock_quantity < IntItem) {
                console.log("Insufficient quantity!");
                findProducts();
                }   
                else {
                    const newQuantity = data[0].stock_quantity - IntItem;
                    const totalPrice = data[0].price * IntItem;
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, answer.id], 
                    function(err, results) {
                        if (err) throw err;
                        else {
                            console.log("Congrats on your purchase! Your total cost is $"+ totalPrice);
                            buyMoreProducts();
                        }
                    });  
                }
            });
        });
}

const buyMoreProducts = function() {
    inquirer.prompt({
        type: "confirm",
        message: "Make another Purchase?",
        name: "confirm",
        default: true
    
        }).then(function(answer) {
            if (answer.confirm)
            {
                findProducts();
            }
            else {
                console.log("Please come back again!")
            }
            
        });
}