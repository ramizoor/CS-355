const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const booksFilePath = path.join(__dirname, 'books.json');
app.use(express.json());

// Function that reads book data
const readBooks = () => {
    if (!fs.existsSync(booksFilePath)) {
        fs.writeFileSync(booksFilePath, JSON.stringify([])); 
        return [];
    }
    try {
        const data = fs.readFileSync(booksFilePath, 'utf8').trim();
        return data ? JSON.parse(data) : []; 
    } catch (error) {
        console.error('Error reading books.json:', error);
        return []; 
    }
};

// Function that writes book data
const writeBooks = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

// GET - Retrieves all of our books -- Used ChatGPT for a list of 10 books
app.get('/books', (req, res) => {
    const books = readBooks();
    res.json(books);
});

// POST - Adds a new book -- tested with Postman
app.post('/books', (req, res) => {
    const { title, author, publicationYear } = req.body;
    if (!title || !author || !publicationYear) {
        return res.status(400).json({ message: 'Title, author, and publication year are required' });
    }
    const books = readBooks();
    const newBook = { id: books.length + 1, title, author, publicationYear };
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

// PUT - Updates a book -- tested with Postman
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, publicationYear } = req.body;
    const books = readBooks();
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books[bookIndex] = { id: Number(id), title, author, publicationYear };
    writeBooks(books);
    res.json(books[bookIndex]);
});

// DELETE - Deletes a book -- tested with Postman
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    let books = readBooks();
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books = books.filter(book => book.id != id);
    writeBooks(books);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
