/**
 * Hacer Aynur Sari
 * Date: 11/19/21
 * Section: CSE 154 AA
 *
 * This is CP4, this is the javascipt of shopping webpage. I used
 * JS to implement this website.
 */

"use strict";
const BASE_URL = "http://localhost:8000/shoppingcart";

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
      .then(res => res.text())
      .then(processData)
      .catch(handleError);
  }
  /**
   * processes the data that comes from api, prints them all
   * in the products box
   * @param {dataSRC} dataSRC is the data comes from api
   */
  function processData(dataSRC) {
    let bookIsbn = gen("h2");
    bookIsbn.textContent = dataSRC;
    id("products-box").appendChild(bookIsbn);
  }

  /**
   *
   * @param {error} error
   */
  function handleError() {
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
      throw new Error(await res.text());
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