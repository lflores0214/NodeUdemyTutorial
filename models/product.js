const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname("../data/products.json"));

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        err ? console.log(err) : null
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
