const { log } = require("console");
const fs = require("fs");

/////////////////////////////////////////
// FILES
/*
===================================================================================
* This is a simple example of how to use the `fs` module to read a file.
*This is Bloking / Synchronous code way.
===================================================================================
const fileInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(fileInput);
const fileOu = `This is what we know about avocado: ${fileInput} \n created by - David  In ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", fileOu);
*/

/*
===================================================================================
*This is Non-Bloking / Asynchronous code way.
===================================================================================
fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
  if (err1) return console.log("Error reading file");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
        console.log("file has been written 👌");
      });
    });
  });
});
*/
////////////////////////////////////////////////////
//server
const http = require("http");
// const server = http.createServer((req, res) => {
//   res.end("Hello From the server!");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("server is listening on port 8000");
// });
//////////////////////////////////////////////
//Routing
const url = require("url");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/") {
    res.end("welcome to home page");
  } else if (pathName === "/product") {
    res.end("welcome to product page");
  } else if (pathName === "/pay") {
    res.end("welcome to pay page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 page not found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server is listening on port 3000");
});
///////////////////////////////////////////////
