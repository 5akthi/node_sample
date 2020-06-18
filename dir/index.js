// // Common js syntax
// const Person = require("./person");

// /* import Person from "./person";
//  Node has'nt implemented this ES6 syntax yet, to use this , implement babble */

// const person1 = new Person("John Doe", 30);

// person1.greeting();

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "/index.html"),
  //     (err, content) => {
  //       // Checks for status:200 and passes the content-type as html
  //       res.writeHead(200, { "Content-type": "text/html" });
  //       res.end(content);
  //       if (err) throw err;
  //     }
  //   );
  // }
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "/about.html"),
  //     (err, content) => {
  //       // Checks for status:200 and passes the content-type as html
  //       res.writeHead(200, { "Content-type": "text/html" });
  //       res.end(content);
  //       if (err) throw err;
  //     }
  //   );
  // }
  // if (req.url === "/api/users") {
  //   const users = [
  //     { name: "Bob Smith", age: 40 },
  //     { name: "John Doe", age: 30 },
  //   ];
  //   res.writeHead(200, { "Content-type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Page not found
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
