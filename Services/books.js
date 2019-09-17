const express = require("express");
const fs = require("fs-extra");
const shortid = require("shortid");
const utils = require("./utils");

getBooks = async () => {
  var buffer = await fs.readFile("books.json");
  var content = buffer.toString();
  return JSON.parse(content);
};

saveBooks = async books => {
  await fs.writeFile("books.json", JSON.stringify(items));
};
getComments = async () => {
  var buffer = await fs.readFile("comments.json");
  var content = buffer.toString();
  return JSON.parse(content);
};

saveComments = async products => {
  await fs.writeFile("comments.json", JSON.stringify(items));
};

const router = express.Router();

router.get("/", async (req, res) => {
  var books = await getBooks();
  console.log(req.query);
  for (let entry in req.query) {
    var queryValue = req.query[entry].toLowerCase
      ? req.query[entry].toLowerCase()
      : req.query[entry];
    books = books.filter(x =>
      x[entry].toLowerCase
        ? x[entry].toLowerCase().indexOf(queryValue) >= 0
        : x[entry] == queryValue
    );
    console.log(entry + " => " + queryValue + " array size: " + books.length);
  }
  res.send(books);
});

//http://localhost:3000/books?category=scifi
router.get("/", async (req, res) => {
    var books = await geBooks();
    res.send(
      books.filter(
        book =>
          !req.query.category ||
         book.category.toLowerCase() == req.query.category.toLowerCase()
      )
    );
  });

router.get("/:id", async (req, res) => {
  var books = await getBooks();
  res.send(books.find(x => x.asin == req.params.id));
});

router.post("/", async (req, res) => {
  var books = await getBooks();
  if (!req.body.asin) req.body.asin = shortid.generate();
  books.push(req.body);
  await saveBooks(books);
  res.send(req.body);
});

router.put("/:id", async (req, res) => {
  var books = await getBooks();
  var book = books.find(x => x.asin == req.params.id);
  Object.assign(book, req.body);
  await saveBooks(books);
  res.send(book);
});

router.delete("/:id", async (req, res) => {
  var books = await getBooks();
  var booksWithoutSpecifiedID = books.filter(x => x.asin != req.params.id);
  await saveBooks(booksWithoutSpecifiedID);
  res.send(booksWithoutSpecifiedID);
});

router.get("/:id/comments", async (req, res) => {
  var comments = await getComments();
  res.send(comments.filter(comment => comment.bookId == req.params.id));
});

router.post("/:id/comments", async (req, res) => {
  var comments = await getComments();
  req.body.id = shortid.generate();
  req.body.createdDate = new Date();
  req.body.bookId = req.params.id;
  comments.push(req.body);
  await saveComments(comments);
  res.send(req.body);
});

router.delete("/comments/:commentId", async (req, res) => {
  var comments = await getComments();
  await saveComments(comments.filter(comment => comment.id != req.params.commentId))
  res.send("ok");
});

module.exports = router;
