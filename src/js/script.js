/* eslint-disable no-unused-vars */

const select = {
  templateOf: {
    templateBook: '#template-book',
  },
  listOf: {
    listBooks: '.books-list',
    listFilterInput: '.filters',
  },
  attribute: {
    dataId: 'data-id',
  },
  image: {
    coverImage: '.book__image',
    favoriteCoverImage: 'favorite',
    hidden: 'hidden',
  },
};


const templates = {
  templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML)
};


const booksList = document.querySelector(select.listOf.listBooks);


function render(){
  for(let data of dataSource.books) {
    const generatedHTML = templates.templateBook(data);
    console.log('data', data);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
    console.log('dataSource.books',dataSource.books);
    console.log('booksList:', booksList);
  }  
}

render();
const filters = [];

function initActions() {
  const favoriteBooks = [];
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

  
  const filtersList = document.querySelector(select.listOf.listFilterInput);
  filtersList.addEventListener('click', function(event){
    console.log('event', event);
    const clickedElement = event.target;
    if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
      console.log('filter value: ', clickedElement.value);
      if(clickedElement.checked){
        filters.push(clickedElement);
        filterBooks();
      } else {
        const elementToRemove = filters.indexOf(clickedElement);
        filters.splice(elementToRemove, 1);
        filterBooks();
      }
      console.log('filters: ', filters);
    }
  });
  
  
}


initActions();

function filterBooks() {
  
  for(let data of dataSource.books){
    let shouldBeHidden = false;
    for(const input of filters){
      if(!data.details[input.value]){
        shouldBeHidden = true;
        break;
      }
    } 
    const bookImage = booksList.querySelector('.book__image[data-id="' + data.id + '"]');
    if(shouldBeHidden){
      bookImage.classList.add(select.image.hidden);
    } else {
      bookImage.classList.remove(select.image.hidden);
    }
    
    
  }
}