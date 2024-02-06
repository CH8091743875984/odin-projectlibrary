const myLibrary = [];

function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;

    this.displayInfo = function() {
        return this.title+', by '+this.author+', '+this.pageCount
        +' pages, '+readStatus
    };
    }

function addBookToLibrary(book) {
    return myLibrary.push(book)
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/insertCell
function displaySingleBook(book) {
    let tableRef = document.getElementById("shelf");

    let newRow = tableRef.insertRow(-1);
    
    bookProperties = [book.title, book.author, book.pageCount, book.readStatus]

    bookProperties.forEach((bookProperty) => {
        let newCell = newRow.insertCell(-1);
        let newText = document.createTextNode(bookProperty)
        newCell.appendChild(newText)
    }
    )
}

function displayAllBooks(library=myLibrary) {
    library.forEach((book) => {
        displaySingleBook(book)
    }
    )
}

let testbook = new Book('test book', 'test name', '999', 'read')
addBookToLibrary(testbook)
let testbooktwo = new Book('second book here', 'another name','1111', 'not read')
addBookToLibrary(testbooktwo)

displayAllBooks()