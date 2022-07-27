"use strict";

const formContainer = document.querySelector("#container");
const form = document.querySelector("#form");
const newBook = document.querySelector("#new-book");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close");
const bookshelf = document.querySelector(".bookshelf");
let books = JSON.parse(localStorage.getItem("books")) || [];
let formOpen = false;

class Book {
  constructor(title, author, pages, like) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.like = like;
  }
}

function formOpenOrClosed() {
  if (formOpen) {
    formContainer.style.transform = "scale(0)";
    newBook.style.transform = "rotate(0)";
    form.reset();
    overlay.style.opacity = 0;
    formOpen = false;
  } else {
    formContainer.style.transform = "scale(1)";
    newBook.style.transform = "rotate(45deg)";
    overlay.style.opacity = 1;
    formOpen = true;
  }
}

function closeModal() {
  formContainer.style.transform = "scale(0)";
  overlay.style.opacity = 0;
  newBook.style.transform = "rotate(0)";
  form.reset();
  formOpen = false;
}

function addBook(i) {
  let bookNode = document.createElement("div");
  bookNode.classList.add("book");
  bookNode.setAttribute("data-index", `${i}`);

  const title = document.getElementById("title").value;
  let titleNode = document.createElement("h2");
  titleNode.innerHTML = `Title: ${title}`;

  const author = document.getElementById("author").value;
  let authorNode = document.createElement("h3");
  authorNode.innerHTML = `Author: ${author}`;

  const pages = document.getElementById("pages").value;
  let pageNode = document.createElement("h3");
  pageNode.innerHTML = `Pages: ${pages}`;

  const like = document.getElementById("like").value;
  let likeNode = document.createElement("h3");
  likeNode.innerHTML = `Like? ${like}${like === "Yes" ? "😎" : "😒"}`;

  let updateNode = document.createElement("button");
  updateNode.classList = "update";
  updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

  let trashNode = document.createElement("button");
  trashNode.classList = "trash";
  trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;

  const book = new Book(title, author, pages, like);
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  bookNode.appendChild(titleNode);
  bookNode.appendChild(authorNode);
  bookNode.appendChild(pageNode);
  bookNode.appendChild(likeNode);
  bookNode.appendChild(updateNode);
  bookNode.appendChild(trashNode);
  bookshelf.appendChild(bookNode);
  formOpenOrClosed();
  form.reset();

  // Update book status
  updateNode.addEventListener("click", () => {
    if (likeNode.innerHTML === "Like? No😒") {
      likeNode.innerHTML = "Like? Yes😎";
      book.like = "Yes";
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      likeNode.innerHTML = "Like? No😒";
      book.like = "No";
      localStorage.setItem("books", JSON.stringify(books));
    }
  });

  // Delete book
  trashNode.addEventListener("click", () => {
    bookshelf.removeChild(bookNode);
    books.splice(bookNode, 1);
    localStorage.setItem("books", JSON.stringify(books));
  });
}

function getBooks() {
  books.forEach(function (book, i) {
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);

    const title = document.getElementById("title").value;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${book.title}`;

    const author = document.getElementById("author").value;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${book.author}`;

    const pages = document.getElementById("pages").value;
    let pageNode = document.createElement("h3");
    pageNode.innerHTML = `Pages: ${book.pages}`;

    const like = document.getElementById("like").value;
    let likeNode = document.createElement("h3");
    likeNode.innerHTML = `Like? ${book.like}${
      book.like=== "Yes" ? "😎" : "😒"
    }`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

    let trashNode = document.createElement("button");
    trashNode.classList = "trash";
    trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(likeNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);

    // Update book status
    updateNode.addEventListener("click", () => {
      if (likeNode.innerHTML === "Like? No😒") {
        likeNode.innerHTML = "Like? Yes😎";
        book.like = "Yes";
        localStorage.setItem("books", JSON.stringify(books));
      } else {
        likeNode.innerHTML = "Like? No😒";
        book.like = "No";
        localStorage.setItem("books", JSON.stringify(books));
      }
    });

    // Delete book
    trashNode.addEventListener("click", () => {
      bookshelf.removeChild(bookNode);
      books.splice(bookNode, 1);
      localStorage.setItem("books", JSON.stringify(books));
    });
  });
}

window.addEventListener("load", getBooks);
newBook.addEventListener("click", formOpenOrClosed);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", (e, i) => {
  e.preventDefault();
  addBook(i);
});