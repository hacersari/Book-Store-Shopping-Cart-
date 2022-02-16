/**
 * Hacer Aynur Sari
 * Date: 11/19/21
 * Section: CSE 154 AA
 *
 * This is CP4, this is the first draft of the shopping website. I used
 * JS HTML AND CSS to implement this website. This is the JS that I used it for
 * main page of this project.
 */

"use strict";

const BASE_URL = "http://localhost:8000/books";

(function() {
  window.addEventListener("load", init);

  /**
   * CHANGE: Describe what your init function does here.
   */
  function init() {
    makeRequest();
  }

  /**
   * Make sure to always add a descriptive comment above
   * every function detailing what it's purpose is
   * Use JSDoc format with @param and @return.
   */
  function makeRequest() {
    fetch(BASE_URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * processes the data that comes from api, prints them all
   * in the products box
   * @param {dataSRC} dataSRC is the data comes from api
   */
  function processData(dataSRC) {
    for (let i = 0; i <= dataSRC.length - 1; i++) {
      id("products-box").appendChild(createBook(dataSRC[i]));
    }
  }

  /**
   *
   * @param {error} error
   */
  function handleError(error) {
    let errorTxt = "Error, check the Network tab for more details";
    alert(errorTxt);
  }

  /**
   *
   * @param {res} res
   * @returns res
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.json());
    }
    return res;
  }

  /**
   *
   * @param {book} book
   * @returns bookSec
   */
  function createBook(book) {
    let booksSec = gen("section");

    let bookTitle = gen("h2");
    bookTitle.textContent = "Title: " + book.title;
    booksSec.appendChild(bookTitle);

    let bookAuthor = gen("h3");
    bookAuthor.textContent = "Author: " + book.author;
    booksSec.appendChild(bookAuthor);

    let bookIsbn = gen("h4");
    bookIsbn.textContent = "ISBN: " + book.isbn;
    booksSec.appendChild(bookIsbn);

    let bookPicture = gen("img");
    bookPicture.src = "book.png";
    booksSec.appendChild(bookPicture);

    let btn = gen("button");
    btn.textContent = "Add To Cart";
    btn.classList.add('addBtn');
    btn.setAttribute("type", "button");
    btn.addEventListener("click", addToCart);
    booksSec.appendChild(btn);

    booksSec.classList.add("product-container");
    return booksSec;
  }

  /**
   *
   * @param {sender} sender
   */
  function addToCart(sender) {
    let myDIV = gen("div");
    let senderC = sender.currentTarget.parentNode;
    myDIV.textContent = senderC.querySelector("h4").textContent;
    let myP = gen("p");
    myP.textContent = " added to the cart. Thank you \n";
    id('shopping-cart').appendChild(myDIV);
    id('shopping-cart').appendChild(myP);
    addIsbn(myDIV.textContent);

  }

  /**
   * prints the clicked book to shopping cart
   * @param {isbnvar} isbnVar of clicked item
   */
  function addIsbn(isbnVar) {
    let url = 'http://localhost:8000/shoppingcart';
    let data = {
      isbn: isbnVar
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
      .then(resp => resp.json());
  }

  /** ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();