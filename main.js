window.addEventListener('load', function(event)
{
    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = localStorage.getItem('LocalStorageKey');
    let dataStatus = "";
    let numberOfTries = 0;

    let statusDiv = document.getElementById('statusDiv');
    let addBookForm = document.getElementById('addBook')
    .addEventListener('submit', addBook);
    let editBookForm = document.getElementById('editBook')
    .addEventListener('submit', editBook);
    let fetchBookBtn = document.getElementById('fetchBookBtn')
    .addEventListener('click', fetchBooks);
    let deleteBookBtn = document.getElementById('deleteBook')
    .addEventListener('submit', deleteBook);
  
    //TEST BUTTONS - SE ÖVER NÄR VI ÄR KLARA OM VILKA SOM BEHÖVER ÄNDRAS OCH SÅ
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
        .then(function(data){
            if(data.status === "success" && numberOfTries < 10){
            operationFinished(data);
        }
        else if(data.status !== "success" && numberOfTries < 10){
            numberOfTries++;
            console.log(data.status + ": failed attempts " + numberOfTries + "/10");
            return addBook(e);
        }
        else if(numberOfTries >= 10){
            operationFailed(data);
        }
        })
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
            if(data.status === "success" && numberOfTries < 10){
                let bookListDiv = '<h3>Books:</h3>';
                data.data.forEach(function(book){
                    bookListDiv += `
                        <ul>
                            <li>ID: ${book.id}</li>
                            <li>Title: ${book.title}</li>
                            <li>Author: ${book.author}</li>
                        </ul>`;
                });
                document.getElementById('bookListDiv').innerHTML = bookListDiv;
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempts " + numberOfTries + "/10");
                return fetchBooks();
            }
            else if(numberOfTries >= 10){
                operationFailed(data);
            }            
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
        .then(function(data){
            if(data.status === "success" && numberOfTries < 10){
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempts " + numberOfTries + "/10");
                return editBook(e);
            }
            else if(numberOfTries >= 10){
                operationFailed(data);
            }
        })
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
            
            if(data.status === "success" && numberOfTries < 10){
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempt " + numberOfTries + "/10");
                return deleteBook(e);
            }
            else if(numberOfTries >= 10){
                operationFailed(data);    
            }   
        })
    }

    //Operation finished function
    function operationFinished(data){
        numberOfTries++;
        temp = numberOfTries;
        numberOfTries = 0;
        return statusDiv.innerHTML = data.status + "</br>Operation finished after " + temp + " tries.";
    }

    //Operation failed function
    function operationFailed(data){
        temp = numberOfTries;
        numberOfTries = 0;
        console.log("connection failure " + data.status + ": reached maximum attempts: " + temp + "/10");
        return statusDiv.innerHTML = data.status + "</br>Operation failed after " + temp + " tries.</br>" + data.message;
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

    //Local Storage - PRINTAR BARA NYCKELN TILL KONSOLEN. BEHÖVS EJ
    function getLocalStorageKey(){
        console.log(localStorage);
    }
});