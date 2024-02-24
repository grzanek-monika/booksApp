/* eslint-disable no-unused-vars */
const templates = {
  bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
};


const bookList = document.querySelector('.books-list');
const favoriteBooks = [];

function render(){
  for(let data of dataSource.books) {
    const generatedHTML = templates.bookList(data);
    console.log('data', data);
    const element = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(element);
    console.log('dataSource.books',dataSource.books);
  }  
}

render();