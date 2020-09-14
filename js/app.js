function Books(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

class UI{
 
    static display(){
        const books = store.getbooks();

        books.forEach(myFunction);
        function myFunction(book){
            UI.addToList(book);
        } 
    }

    static addToList(book){
        const list = document.getElementById('table-body');

        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><i class="fa fa-trash delete"></i></td>`

        list.appendChild(row);
    }

    static remove(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
    
        }
    }

    static clear(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';


    }
}


class store{

    static getbooks(){
        let books ;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addItem(book){
        const books = store.getbooks();

        books.push(book);
        console.log(books);
        localStorage.setItem('books', JSON.stringify(books));
        console.log(localStorage);
    }

    static deletebook(el){
        let books = store.getbooks()
        books.forEach((book, index) => {
            if(book.isbn === el){
                books.splice(index, 1);

            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}






document.addEventListener('DOMContentLoaded', UI.display());

const form = document.getElementById('form')

form.addEventListener('submit',function(e){
    e.preventDefault();
     
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Books(title,author,isbn);

    if(title === '' || author === '' || isbn === '')
    {
        alert('please fill the required fields');
    } else{
        UI.addToList(book);

        store.addItem(book);

        UI.clear();

    }

})

const list = document.getElementById('table-body');

list.addEventListener('click',function(e){
    UI.remove(e.target);
    store.deletebook(e.target.parentElement.previousElementSibling.textContent);
})








