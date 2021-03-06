// SERVER
const app = require('express')();
const watch = require('watch')
const server = require('http').Server(app);
const port = 3000;


// FILE SYSTEM
var file = require('file-system');
var fs = require('fs');
file.readFile === fs.readFile;


// MYSQL
var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     port: 8889,
     user: "root",
     password: "root",
     database: "welcome"
});



server.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});

// ROUTES
app.get('/', (req, res) => {
     res.sendFile(__dirname + '/');
});

// WATCH FILE CHANGES
watch.watchTree('/Users/mikelis/Mikelish', function (f, curr, prev) {

     if (typeof f == "object" && prev === null && curr === null) {
          // Finished walking the tree
     } else if (prev === null) {
          // f is a new file
     } else if (curr.nlink === 0) {
          // f was removed
     } else {

          console.log(`${f} was changed`);

          var callback = function () {
               console.log("yes");
          }

          // console.log(fs.readFile(f, callback));

          fs.readFile(f, 'utf-8', (err, data) => {

               if (err) throw err;
               var welcome = JSON.parse(data);

               con.connect(function (err) {

                    if (err) throw err;
                    console.log("Connected!");

                    var sql = `SELECT * FROM guests WHERE uid='${welcome.Uid}'`;
                    console.log(sql);

                    con.query(sql, function (err, result) {
                         if (err) throw err;
                         console.log(result);
                    });

               });



          });




     }

});