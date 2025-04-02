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
const { console } = require("inspector");
// const server = http.createServer((req, res) => {
//   res.end("Hello From the server!");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("server is listening on port 8000");
// });
//////////////////////////////////////////////
//Routing
const url = require("url");
const tempOverView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProductCard = fs.readFileSync(
  `${__dirname}/templates/product-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replacetemp = (temp, product) => {
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);
  //overview
  if (pathname === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const card = dataObj.map((el) => replacetemp(tempProductCard, el));
    const output = tempOverView.replace(/{%PRODUCT_CARDS%}/g, card);
    res.end(output);

    //products
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replacetemp(tempProduct, product);
    res.end(output);

    //api
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 page not found</h1>");
  }
});

server.listen(8001, "127.0.0.1", () => {
  console.log("server is listening on port 8001");
});
///////////////////////////////////////////////
