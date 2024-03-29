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

class BooksList {
  constructor() {
    const thisBookList = this;
    thisBookList.getElements();
    thisBookList.render();
    thisBookList.initActions();
    
  }

  getElements() {
    const thisBookList = this;
    thisBookList.booksList = document.querySelector(select.listOf.listBooks);
    thisBookList.filters = [];
  }
  


  render(){
    const thisBookList = this;
    for(let data of dataSource.books) {
      const ratingBgc = thisBookList.determineRatingBgc(data.rating);
      const ratingWidth = data.rating*10;
      data.ratingBgc = ratingBgc;
      data.ratingWidth = ratingWidth;
      const generatedHTML = templates.templateBook(data);
      console.log('data', data);
      console.log('generatedHTML: ', generatedHTML);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBookList.booksList.appendChild(element);
      console.log('dataSource.books',dataSource.books);
      console.log('booksList:', thisBookList.booksList);
    }  
  }

  initActions() {
    const thisBookList = this;
    const favoriteBooks = [];
    thisBookList.booksList.addEventListener('dblclick', function(event){
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
          thisBookList.filters.push(clickedElement);
          thisBookList.filterBooks();
        } else {
          const elementToRemove = thisBookList.filters.indexOf(clickedElement);
          thisBookList.filters.splice(elementToRemove, 1);
          thisBookList.filterBooks();
        }
        console.log('filters: ', thisBookList.filters);
      }
    });
  
  
  }


  filterBooks() {
    const thisBookList = this;
    for(let data of dataSource.books){
      let shouldBeHidden = false;
      for(const input of thisBookList.filters){
        if(!data.details[input.value]){
          shouldBeHidden = true;
          break;
        }
      } 
      const bookImage = thisBookList.booksList.querySelector('.book__image[data-id="' + data.id + '"]');
      if(shouldBeHidden){
        bookImage.classList.add(select.image.hidden);
      } else {
        bookImage.classList.remove(select.image.hidden);
      }
    
    
    }
  }

  determineRatingBgc(rating) {
    const thisBookList = this;
    if(rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9){
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  
  }
}

const app = new BooksList();


