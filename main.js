window.addEventListener('load', function(event)
{
    //TEMP CLEAR AV LOCAL STORAGE - REMOVE!!!!
    //localStorage.clear();

    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = "";

    let addBookBtn = document.getElementById('addBook')
    .addEventListener('submit', addBook);
    let fetchBookBtn = document.getElementById('fetchBookBtn')
    .addEventListener('click', fetchBooks);
    let deleteBookBtn = document.getElementById('deleteBook')
    .addEventListener('submit', deleteBook);
  
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
            .then(data => console.log(data))
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
            let bookListDiv = '<h3>List of Jones</h3>';
            console.log('Data: ' , data);
            data.data.forEach(function(book){
                bookListDiv += `
                    <ul>
                        <li>ID: ${book.id}</li>
                        <li>Title: ${book.title}</li>
                        <li>Author: ${book.author}</li>
                    </ul>`;
            });
            document.getElementById('bookListDiv').innerHTML = bookListDiv;
        })
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
});