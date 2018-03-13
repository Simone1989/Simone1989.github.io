window.addEventListener('load', function(event)
{
    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = localStorage.getItem('LocalStorageKey');
    let dataStatus = "";
    let numberOfTries = 0;
    
    //declaration of elements by id and event listeners for buttons
    let statusDiv = document.getElementById('statusDiv');
    let addBookForm = document.getElementById('addBook')
    .addEventListener('submit', addBook);
    let editBookForm = document.getElementById('editBook')
    .addEventListener('submit', editBook);
    let deleteBookBtn = document.getElementById('deleteBook')
    .addEventListener('submit', deleteBook);
    let fetchBookBtn = document.getElementById('fetchBookBtn')
    .addEventListener('click', fetchBooks);
    let showAddBookFormBtn = document.getElementById('showAddBookFormBtn')
    .addEventListener('click', showAddBookForm);
    let showEditFormBtn = document.getElementById('showEditFormBtn')
    .addEventListener('click', showEditBookForm);
    let showDeleteBookFormBtn = document.getElementById('showDeleteBookFormBtn')
    .addEventListener('click', showDeleteBookForm);
    let getKeyBtn = document.getElementById('getKeyBtn')
    .addEventListener('click', getRequestKey);

    //Function for adding books using fetch request
    function addBook(e){
        e.preventDefault();
        let bookTitle = document.getElementById('addBookTitle').value;
        let bookAuthor = document.getElementById('addAuthor').value;
        let request = new Request(url + 'op=insert&key=' + key + '&title=' + bookTitle + '&author=' + bookAuthor, { method: 'POST'});

        fetch(request)
        .then(response => response.json())
        .then(function(data){
            if(data.status === "success" && numberOfTries < 10){
            clearAll();
            operationFinished(data);
        }
        else if(data.status !== "success" && numberOfTries < 10){
            numberOfTries++;
            console.log(data.status + ": failed attempts " + numberOfTries + "/10");
            return addBook(e);
        }
        else if(numberOfTries >= 10){
            clearAll();
            operationFailed(data);
        }
        })
        .catch(function (error){
            console.log(error);
        }
        )}

    // Function that fetches books stored
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
                clearAll();
                document.getElementById('bookListDiv').innerHTML = bookListDiv;
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempts " + numberOfTries + "/10");
                return fetchBooks();
            }
            else if(numberOfTries >= 10){
                clearAll();
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
                clearAll();
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempts " + numberOfTries + "/10");
                return editBook(e);
            }
            else if(numberOfTries >= 10){
                clearAll();
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
                clearAll();
                operationFinished(data);
            }
            else if(data.status !== "success" && numberOfTries < 10){
                numberOfTries++;
                console.log(data.status + ": failed attempt " + numberOfTries + "/10");
                return deleteBook(e);
            }
            else if(numberOfTries >= 10){
                clearAll();
                operationFailed(data);    
            } 
        });
    }

    //Operation finished function - runs if operation succeeds
    function operationFinished(data){
        numberOfTries++;
        temp = numberOfTries;
        numberOfTries = 0;
        return statusDiv.innerHTML = data.status + "</br>Operation finished after " + temp + " tries.";
    }

    //Operation failed function - runs if operation does not succeed
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
            clearAll();
            document.getElementById('keyDiv').innerText = 'Your key is: ' + key;
        })
    }

    // Function to show add form
    function showAddBookForm(){
        clearAll();
        document.getElementById("addBook").style.display = 'block';
    }

    // Function to show edit form
    function showEditBookForm(){
        clearAll();
        document.getElementById("editBook").style.display = 'block';
    }

    // Function to show delete form
    function showDeleteBookForm(){
        clearAll();
        document.getElementById("deleteBook").style.display = 'block';
    }

    //clears all visual data - this function gets called a lot
    function clearAll(){
        let edit = document.getElementById("editBook");
        let add = document.getElementById("addBook");
        let del = document.getElementById("deleteBook");
        del.style.display = 'none';
        add.style.display = 'none';
        edit.style.display = 'none';
        document.getElementById('keyDiv').innerText = '';
        document.getElementById('statusDiv').innerText = '';
        document.getElementById('bookListDiv').innerHTML = '';
    }
});