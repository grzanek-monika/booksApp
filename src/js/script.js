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

  booksList.addEventListener('dblclick', function(event){
    event.preventDefault();   
    console.log(event);
    const clickedElement = event.target.offsetParent;
    const attribute = clickedElement.getAttribute(select.attribute.dataId);
    if(clickedElement.classList.contains('book__image')) {
      if(!favoriteBooks[attribute]) {
        clickedElement.classList.add(select.image.favoriteCoverImage);
        favoriteBooks.push(attribute);
      } else {
        clickedElement.classList.remove(select.image.favoriteCoverImage);
        const elementToRemove = favoriteBooks.indexOf(attribute);
        favoriteBooks.splice(elementToRemove, 1);
      }
    }
      
      
  });
  
}


initActions();