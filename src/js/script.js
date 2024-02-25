/* eslint-disable no-unused-vars */

const select = {
  templateOf: {
    templateBook: '#template-book',
  },
  listOf: {
    list: '.books-list',
  },
  attribute: {
    dataId: 'data-id',
  },
  image: {
    coverImage: '.book__image',
    favoriteCoverImage: 'favorite',
  },
};


const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML)
};


const booksList = document.querySelector(select.listOf.list);




function render(){
  for(let data of dataSource.books) {
    const generatedHTML = templates.templateBook(data);
    console.log('data', data);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
    console.log('dataSource.books',dataSource.books);
  }  
}

render();

function initActions() {
  const favoriteBooks = [];
  const booksImages = booksList.querySelectorAll(select.image.coverImage);
  for(let book of booksImages){
    console.log('book', book);
    const attribute = book.getAttribute(select.attribute.dataId);
    book.addEventListener('dblclick', function(event){
      event.preventDefault();   
      book.classList.add(select.image.favoriteCoverImage);
      favoriteBooks.push(attribute);
    });
  }
}


initActions();