let library;

//Init book class

class Book  {
    constructor(title,author,pages,id,read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.id = id
        this.read = read
    }
}

function addToLibrary(book) {
    library.push(book);
    console.log('book Added')
}

//INITIAL LIBRARY DISPLAY

function checkLocal() {
    if (localStorage.getItem('library') === null){
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
        render(library);
    }
}

function render(books) {
    books.forEach((book) =>{
        displayLibrary(book)
    })
}

//Initial Display

function displayLibrary(item) {
   
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = item.title
        const hr = document.createElement('hr')

        const h3 = document.createElement('h3');
        h3.textContent = item.author;

        const p = document.createElement('p');
        p.textContent = item.pages

        const read = document.createElement('p');
        read.textContent =  item.read ? "Read": "Not Read"
   

        const button = document.createElement('button')
        button.id = `deletebtn`
        button.className = 'deletebtn'
        button.textContent = "Remove Book"
        button.onclick = () => deleteBook(item)
        

        container.appendChild(card)


        card.appendChild(h1)
        card.appendChild(hr)
        card.appendChild(h3)
        card.appendChild(p)
        card.appendChild(button)
        card.appendChild(read)
        
}

//Update Display

function updateDisplay(newBook) {
    const card = document.createElement('div');
    card.setAttribute('id','displayCard')
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = newBook.title
    const hr = document.createElement('hr')

    const h3 = document.createElement('h3');
    h3.textContent = newBook.author;

    const p = document.createElement('p');
    p.textContent = newBook.pages
   
    const read = document.createElement('p');
    read.textContent = newBook.read ? "Read": "Not Read"

    const button = document.createElement('button')
    button.id = 'deletebtn'
    button.className = 'deletebtn'
    button.textContent = "Remove Book"
    button.onclick = () => deleteBook(newBook)
    

    container.appendChild(card)

    
    card.appendChild(h1)
    card.appendChild(hr)
    card.appendChild(h3)
    card.appendChild(p)
    card.appendChild(button)
    card.appendChild(read)       
}


// Local Storage

function updateLocal() {
    localStorage.setItem('library', JSON.stringify(library));
}


//SUBMIT BOOK FORM AND ADD TO LIBRARY

document.getElementById('addbookform').addEventListener('submit', function(e){
    e.preventDefault();

    const newTitle = document.getElementById('titleinput').value
    const newAuthor = document.getElementById('authorinput').value
    const newPages = document.getElementById('pages').value
    const newId = Math.random()*1000
    const read = document.getElementById('isread').checked

    const newBook = new Book(newTitle, newAuthor, newPages, newId, read);

    addToLibrary(newBook);
    updateLocal();
    updateDisplay(newBook);
    document.getElementById('bookform').style.display = 'none'
    e.target.reset();
   
})

//DELETE BOOK FROM LIBRARY

function deleteBook(book) {
    library.splice(library.indexOf(book),1)
    updateLocal();
    resetDisplay();

}

function resetDisplay() {
    const display = document.getElementById('display');
    const books = document.querySelectorAll('.card');
    books.forEach(book => (display.removeChild(book)));

    render(library)
    
    
}

//OPEN AND CLOSE BOOK FORM MODAL

document.getElementById('addbookbutton').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('bookform').style.display = 'flex'
})


document.getElementById('closemodal').addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById('bookform').style.display = 'none'
})



const app = document.getElementById('root')

const container = document.createElement('div')
    container.setAttribute('id','display')
    container.setAttribute('class','container')

app.appendChild(container)


checkLocal();
console.log(library);
console.log(localStorage);