const express = require("express");

// requiring databse
const database = require("./database");

// Initialize express
const booky = express();

// -----------Book API---------------------------------------------------------------
/*
Route			/
Description		Get all the books
Access			Public
Parameter		None
Method			.get
*/
booky.get("/", (req,res) => {
	return res.json({book:database.books});
});


/*
Route			/is
Description		Get a specific book
Access			Public
Parameter		isbn
Method			.get
*/
booky.get("/is/:isbn", (req,res) => {
	const bookISBN = req.params.isbn;
	const getSpecificBook = database.books.filter(
		(book) => book.ISBN === bookISBN
		);

	if(getSpecificBook.length === 0) {			// Use backticks when there is a dynamic variable
		return res.json({error:`No book found for ISBN ${bookISBN}`});
	}
	else {
		return res.json({book:getSpecificBook});
	}
});


/*
Route			/c
Description		Get a specific book by category
Access			Public
Parameter		category
Method			.get
*/
booky.get("/cat/:category", (req,res) => {
	const bookCat = req.params.category;
	const getSpecificBook = database.books.filter(
		(book) => book.category.includes(bookCat)
		);

	if(getSpecificBook.length === 0) {			// Use backticks when there is a dynamic variable
		return res.json({error:`No book found for the category of ${bookCat}`});
	}
	else {
		return res.json({book:getSpecificBook});
	}
});


/*
Route			/lang
Description		Get a specific book by language
Access			Public
Parameter		language
Method			.get
*/
booky.get("/lang/:language", (req,res) => {
	const bookLang = req.params.language;
	const getSpecificBook = database.books.filter(
		(book) => book.language === bookLang
		);

	if(getSpecificBook.length === 0) {
		return res.json({error:`No book found for the language of ${bookLang}`});
	}
	else {
		return res.json({book:getSpecificBook});
	}
});



// -----------Author API---------------------------------------------------------------
/*
Route			/author
Description		Get all the authors
Access			Public
Parameter		None
Method			.get
*/
booky.get("/author", (req,res) => {
	return res.json({author:database.authors});
});


/*
Route			/author
Description		Get a specific author by their name
Access			Public
Parameter		name
Method			.get
*/
booky.get("/author/:name", (req,res) => {
	const authorName = req.params.name;
	const getSpecificAuthor = database.authors.filter(
		(author) => author.name.includes(authorName)
		);

	if(getSpecificAuthor.length === 0) {
		return res.json({error:`No author found of the name ${authorName}`});
	}
	else {
		return res.json({author:getSpecificAuthor});
	}
});


/*
Route			/author/book
Description		Get a specific author by the book isbn
Access			Public
Parameter		isbn
Method			.get
*/
booky.get("/author/book/:isbn", (req,res) => {
	const bookISBN = req.params.isbn;
	const getSpecificAuthor = database.authors.filter(
		(author) => author.books.includes(bookISBN)
		);

	if(getSpecificAuthor.length === 0) {
		return res.json({error:`No author found for the book ISBN of ${bookISBN}`});
	}
	else {
		return res.json({author:getSpecificAuthor});
	}
});



// -----------Publication API---------------------------------------------------------------
/*
Route			/pub
Description		Get all the publications
Access			Public
Parameter		None
Method			.get
*/
booky.get("/pub", (req,res) => {
	return res.json({publication:database.publications});
});


/*
Route			/pub
Description		Get a specific publication by their name
Access			Public
Parameter		name
Method			.get
*/
booky.get("/pub/:name", (req,res) => {
	const pubName = req.params.name;
	const getSpecificPub = database.publications.filter(
		(pub) => pub.name.includes(pubName)
		);

	if(getSpecificPub.length === 0) {
		return res.json({error:`No publication found by the name ${pubName}`});
	}
	else {
		return res.json({publication:getSpecificPub});
	}
});


/*
Route			/pub/book
Description		Get a specific publication by the book's ISBN
Access			Public
Parameter		isbn
Method			.get
*/
booky.get("/pub/book/:isbn", (req,res) => {
	const bookISBN = req.params.isbn;
	const getSpecificPub = database.publications.filter(
		(pub) => pub.books.includes(bookISBN)
		);

	if(getSpecificPub.length === 0) {
		return res.json({error:`No publication found with the book ISBN of ${bookISBN}`});
	}
	else {
		return res.json({publication:getSpecificPub});
	}
});




// Setting up port and callback function
booky.listen(2000, () => {
	console.log("Server on port 2000 is up and running");
});