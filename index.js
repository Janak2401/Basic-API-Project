require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// requiring databse
const database = require("./database/database");


// requiring Models
const BookModel = require("./database/allBooks");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");


// Initialize express and body-parser
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());


// Initialising MongoDB
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => console.log("Established connection"));

// -----------Book API---------------------------------------------------------------
/*
Route			/
Description		Get all the books
Access			Public
Parameter		None
Method			.get
*/
booky.get("/", async(req,res) => {
	const getAllBooks = await BookModel.find();
	return res.json(getAllBooks);
});


/*
Route			/isbn
Description		Get a specific book
Access			Public
Parameter		isbn
Method			.get
*/
booky.get("/isbn/:isbn", async(req,res) => {
	const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});

	if(!getSpecificBook) {			// Use backticks when there is a dynamic variable
		return res.json({error:`No book found for ISBN ${req.params.isbn}`});
	}
	else {
		return res.json({book:getSpecificBook});
	}
});


/*
Route			/cat
Description		Get a specific book by category
Access			Public
Parameter		category
Method			.get
*/
booky.get("/cat/:category", async(req,res) => {
	const getSpecificBook = await BookModel.findOne({category:req.params.category});

	if(!getSpecificBook) {			// Use backticks when there is a dynamic variable
		return res.json({error:`No book found for the category of ${req.params.category}`});
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
booky.get("/lang/:language", async(req,res) => {
	const getSpecificBook = await BookModel.findOne({language:req.params.language});

	if(!getSpecificBook) {
		return res.json({error:`No book found for the language of ${req.params.language}`});
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
booky.get("/author", async(req,res) => {
	const getAllAuthors = await AuthorModel.find();
	return res.json(getAllAuthors);
});


/*
Route			/author
Description		Get a specific author by their name
Access			Public
Parameter		name
Method			.get
*/
booky.get("/author/:name", async(req,res) => {
	const authorName = req.params.name;
	const getSpecificAuthor = await AuthorModel.findOne({name:authorName});

	if(!getSpecificAuthor) {
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
booky.get("/author/book/:isbn", async(req,res) => {
	const bookISBN = req.params.isbn;
	const getSpecificAuthor = await AuthorModel.find({books:bookISBN});

	if(!getSpecificAuthor) {
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
booky.get("/pub", async(req,res) => {
	const getAllPublications = await PublicationModel.find();
	return res.json(getAllPublications);
});


/*
Route			/pub
Description		Get a specific publication by their name
Access			Public
Parameter		name
Method			.get
*/
booky.get("/pub/:name", async(req,res) => {
	const pubName = req.params.name;
	const getSpecificPub = await PublicationModel.findOne({name:pubName});

	if(!getSpecificPub) {
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
booky.get("/pub/book/:isbn", async(req,res) => {
	const bookISBN = req.params.isbn;
	const getSpecificPub = await PublicationModel.find({books:bookISBN});

	if(!getSpecificPub) {
		return res.json({error:`No publication found with the book ISBN of ${bookISBN}`});
	}
	else {
		return res.json({publication:getSpecificPub});
	}
});


// ----------- Post Request ---------------------------------------------------------------
/*
Route			/book/new
Description		Post a new book and update the database
Access			Public
Parameter		None
Method			.post
*/
booky.post("/book/new", async(req,res) => {
	const { newBook } = req.body;
	const addNewBook = BookModel.create(newBook);
	return res.json({
		books:addNewBook,
		message:"Book added"
	});
});


/*
Route			/author/new
Description		Post a new author and update the database
Access			Public
Parameter		None
Method			.post
*/
booky.post("/author/new", async(req,res) => {
	const { newAuthor } = req.body;
	const addNewAuthor = AuthorModel.create(newAuthor);
	return res.json({
		author:addNewAuthor,
		message:"Author added"
	});
});


/*
Route			/publication/new
Description		Post a new publication and update the database
Access			Public
Parameter		None
Method			.post
*/
booky.post("/publication/new", async(req,res) => {
	const { newPub } = req.body;
	const addNewPub = PublicationModel.create(newPub);
	return res.json({
		publication:addNewPub,
		message:"Publication added"
	});
});


// Setting up port and callback function
booky.listen(2000, () => {
	console.log("Server on port 2000 is up and running");
});


// *********** Put Method *****************************************************************


/*
Route			/book/update/
Description		Update a specific book
Access			Public
Parameter		isbn
Method			.put
*/
booky.put("/book/update/:isbn", async(req,res) => {
	const updateBook = await BookModel.findOneAndUpdate(
		{
			ISBN:req.params.isbn 					// To find the book we want to update
		},
		{
			title:req.body.bookTitle				// The data we want to update in the book
		},
		{
			new:true								// Allowing the updated data to be shown on frontend
		}
	);
	
	return res.json({books:updateBook});
});


/*
Route			/book/author/update/
Description		Update a author in book and author database
Access			Public
Parameter		isbn
Method			.put
*/
booky.put("/book/author/update/:isbn", async(req,res) => {

	// Updating Book Database
	const updateBook = await BookModel.findOneAndUpdate(
		{
			ISBN:req.params.isbn
		},
		{
			$addToSet:{
				authors:req.body.newAuthor
			}
		},
		{
			new:true
		}
	);

	// Updating Author Database
	const updateAuthor = await AuthorModel.findOneAndUpdate(
		{
			id:req.body.newAuthor
		},
		{
			$addToSet:{
				books:req.params.isbn
			}
		},
		{
			new:true
		}
	);

	return res.json({
		books:updateBook,
		authors:updateAuthor
	});
});


// *********** Delete Method *****************************************************************

/*
Route			/book/delete/
Description		Delete a book from book database
Access			Public
Parameter		isbn
Method			.delete
*/
booky.delete("/book/delete/:isbn", async(req,res) => {
	const deleteBook = await BookModel.findOneAndDelete(
		{
			ISBN:req.params.isbn
		}
	);

	return res.json({books:deleteBook});
});
