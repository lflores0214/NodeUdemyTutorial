const fs = require("fs");
const path = require("path");

const p = path.join(__dirname,  "../data","products.JSON");

const getProductsFromFile = (cb) => {
  console.log(p)
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        err ? console.log(err) : null;
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
