class Book {
  constructor(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
    this.displayInfo = function () {
      return (
        this.title +
        ", by " +
        this.author +
        ", " +
        this.pageCount +
        " pages, " +
        readStatus
      );
    };

    this.toggleReadStatus = function () {
      if (this.readStatus === "Read") {
        return (this.readStatus = "Unread");
      } else if (this.readStatus === "Unread") {
        return (this.readStatus = "Read");
      } else {
        return (this.readStatus = "Unread");
      }
    };
  }
}

const myLibrary = [];

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function displaySingleBook(book) {
  let tableRef = document.getElementById("shelf");

  let newRow = tableRef.insertRow(-1);

  bookProperties = [book.title, book.author, book.pageCount, book.readStatus];

  bookProperties.forEach((bookProperty) => {
    let newCell = newRow.insertCell(-1);
    let newText = document.createTextNode(bookProperty);
    newCell.appendChild(newText);
  });
  // book['bookIndex'] = myLibrary.length
  // console.log(book['bookIndex'])
  let readCell = newRow.insertCell(-1);
  readCell.appendChild(createBookReadButton(book.bookIndex));

  let deleteCell = newRow.insertCell(-1);
  deleteCell.appendChild(createBookDeleteButton(book.bookIndex));
}

function displayAllBooks(library = myLibrary) {
  library.forEach((book, index) => {
    book["bookIndex"] = index;
    displaySingleBook(book);
  });
}

function initializeSampleLibrary() {
  const testbook = new Book("test book", "test name", "999", "Read");
  const testbooktwo = new Book(
    "second book here",
    "another name",
    "1111",
    "Unread"
  );

  addBookToLibrary(testbook);
  addBookToLibrary(testbooktwo);
  displayAllBooks();
}

//new book modal setup
function initializeBookModal() {
  const dialog = document.getElementById("newBookDialog");
  const showButton = document.getElementById("showDialog");
  const closeButton = document.getElementById("closeDialog");
  const saveButton = document.getElementById("saveDialog");

  showButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetNewBookForm();
    dialog.close();
  });

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const myBook = new Book(
      document.getElementById("inputAuthor").value,
      document.getElementById("inputTitle").value,
      document.getElementById("inputPages").value,
      document.getElementById("inputReadStatus").value
    );

    const bookForm = document.getElementById("bookForm");
    if (!bookForm.checkValidity()) {
      toggleFormErrorShowHide();
      console.log(bookForm.reportValidity());
    } else {
      addBookToLibrary(myBook);
      refreshDisplay();
      dialog.close();
    }
  });
}

function resetNewBookForm() {
  document.getElementById("bookForm").reset();
}

//remove book functions

function createBookDeleteButton(bookToDelete) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    // console.log('Request to delete')
    // console.log(bookToDelete)
    deleteBookByIndex(bookToDelete);
  });

  return deleteButton;
}

function deleteBookByIndex(removeIndex) {
  myLibrary.splice(removeIndex, 1);
  refreshDisplay();
}

function clearDisplay() {
  let table = document.getElementById("shelf");
  let tbody = table.getElementsByTagName("tbody")[0];
  let rows = tbody.getElementsByTagName("tr");
  for (let i = rows.length - 1; i > 0; i--) {
    tbody.removeChild(rows[i]);
  }
}

function refreshDisplay() {
  clearDisplay();
  displayAllBooks();
}

//read status toggle button

function createBookReadButton(toggleIndex) {
  const readButton = document.createElement("button");
  readButton.textContent = "Read";
  readButton.addEventListener("click", () => {
    console.log("Request to toggle");
    myLibrary[toggleIndex].toggleReadStatus();
    refreshDisplay();
  });

  return readButton;
}

//form validation

function setValidationTooShort(element) {
  element.addEventListener("input", () => {
    element.reportValidity();
    if (element.validity.tooShort) {
      console.log("is too short");
    } else {
      console.log("input length ok");
    }
  });
}

function toggleFormErrorShowHide() {
  const formError = document.querySelector(".formError");
  formError.classList.toggle("hide");
}

function initializeFormValidation() {
  const inputAuthor = document.querySelector("#inputAuthor");
  const inputTitle = document.querySelector("#inputTitle");
  console.log(inputAuthor);

  setValidationTooShort(inputAuthor);
  setValidationTooShort(inputTitle);
}

initializeBookModal();
initializeSampleLibrary();
initializeFormValidation();
