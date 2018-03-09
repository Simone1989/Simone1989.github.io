window.addEventListener('load', function(event)
{
    //TEMP CLEAR AV LOCAL STORAGE - REMOVE!!!!
    //localStorage.clear();

    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = "";

    let statusDiv = document.getElementById('statusDiv');
    let addBookForm = document.getElementById('addBook')
    .addEventListener('submit', addBook);
    let editBookForm = document.getElementById('editBook')
    .addEventListener('submit', editBook);
    let fetchBookBtn = document.getElementById('fetchBookBtn')
    .addEventListener('click', fetchBooks);
    let deleteBookBtn = document.getElementById('deleteBook')
    .addEventListener('submit', deleteBook);
    let showAddBookFormBtn = document.getElementById('showAddBookFormBtn')
    .addEventListener('click', showAddBookForm);
    let showEditFormBtn = document.getElementById('showEditFormBtn')
    .addEventListener('click', showEditBookForm);
    let showDeleteBookFormBtn = document.getElementById('showDeleteBookFormBtn')
    .addEventListener('click', showDeleteBookForm);
  
    //TEST BUTTONS
    let getKeyBtn = document.getElementById('getKeyBtn')
    .addEventListener('click', getRequestKey);
    let getLocalStorage = this.document.getElementById('getLocalStorage')
    .addEventListener('click', getLocalStorageKey);
    
    // Function for adding books
    function addBook(e){
        e.preventDefault();

        let bookTitle = document.getElementById('addBookTitle').value;
        let bookAuthor = document.getElementById('addAuthor').value;
        console.log(bookAuthor + bookTitle);

        let request = new Request(url + 'op=insert&key=' + key + '&title=' + bookTitle + '&author=' + bookAuthor, { method: 'POST'});

            fetch(request)
            .then(response => response.json())
            .then(data => statusDiv.innerText = data.status)
            .catch(function (error){
                console.log(error);
            }
        )}

    // Fetch book function
    function fetchBooks(){
        let request = new Request(url + 'op=select&key=' + key);

        fetch(request)
        .then(response => response.json())
        .then(data => {
            let bookListDiv = '<h3>Books:</h3>';
            console.log('Data: ' , data);
            data.data.forEach(function(book){
                bookListDiv += `
                    <ul>
                        <li>ID: ${book.id}</li>
                        <li>Title: ${book.title}</li>
                        <li>Author: ${book.author}</li>
                    </ul>`;
            });
            statusDiv.innerText = data.status;
            document.getElementById('bookListDiv').innerHTML = bookListDiv;
        })
    }


    // Update book function
    function editBook(e){
        e.preventDefault();
        let editBookTitle = document.getElementById('editBookTitle').value;
        let editBookAuthor = document.getElementById('editAuthor').value;
        let editBookId = document.getElementById('editBookId').value;

        let request = new Request(url + 'op=update&key=' + key + '&id=' + editBookId + '&title=' + editBookTitle + '&author=' + editBookAuthor, { method: 'POST'});
        
        fetch(request)
        .then(response => response.json())
        .then(data => statusDiv.innerText = data.status)
        .catch(function(error){
            console.log(error)
        });

    }

    // Delete book function
    function deleteBook(e){
        e.preventDefault();

        let id = document.getElementById('deleteBookId').value;
        let request = new Request(url + 'op=delete&key=' + key + '&id=' + id, {
            method: 'POST',
        });
        
        fetch(request)
        .then(response => response.json())
        .then(function(data){
            if(data.status === "success"){
                console.log(data);
            }
            else{
                data.status + " " + data.message;
            }
            statusDiv.innerText = data.status;
        })

    }
  
    //Request key function
    function getRequestKey(){
        let request = new Request(url + "requestKey");

        fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            key = data.key;
            localStorage.setItem('LocalStorageKey', key);
            console.log("Key is: " + key);
        })
    }

    //Local Storage
    function getLocalStorageKey(){
        console.log(localStorage);
    }

    // Function to show add book form

    function showAddBookForm(){
        let x = document.getElementById("addBook");
        if (x.style.display === "block") {
            x.style.display = "none";
        } 
        else {
            x.style.display = "block";
        }
    }

    function showEditBookForm(){
        let x = document.getElementById("editBook");
        if (x.style.display === "block") {
            x.style.display = "none";
        } 
        else {
            x.style.display = "block";
        }
    }

    function showDeleteBookForm(){
        let x = document.getElementById("deleteBook");
        if (x.style.display === "block") {
            x.style.display = "none";
        } 
        else {
            x.style.display = "block";
        }
    }

});