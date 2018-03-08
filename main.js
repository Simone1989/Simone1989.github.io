window.addEventListener('load', function(event)
{
    //TEMP CLEAR AV LOCAL STORAGE - REMOVE!!!!
    localStorage.clear();

    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = "";

    let addBookBtn = document.getElementById('addBook')
    .addEventListener('submit', addBook);
    let fetchBookBtn = document.getElementById('fetchBookBtn')
    .addEventListener('click', fetchBooks);
  
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
            let bookListDiv = '<h3></h3>';
            console.log('Data: ' , data);
            data.data.forEach(function(book){
                bookListDiv += `
                    <ul>
                        <li>${book.id}</li>
                        <li>${book.title}</li>
                        <li>${book.author}</li>
                    </ul>`;
            });
            document.getElementById('bookListDiv').innerHTML = bookListDiv;
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