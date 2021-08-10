const books = [
	{
		ISBN: "book1",
		title: "Tesla",
		pubDate: "10-08-2021",
		language: "en",
		numPage: 250,
		authors: [1,2],
		publication: [1],
		category: ["tech","education","space"]
	}
];

const authors = [
	{
		id: 1,
		name: "Janak Khorgade",
		books: ["book1","book2"]
	},
	{
		id: 2,
		name: "Elon Musk",
		books: ["book1"]
	}
];

const publications = [
	{
		id: 1,
		name: "WriteX",
		books: ["book1"]
	}
];

module.exports = {books, authors, publications};