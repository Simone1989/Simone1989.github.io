window.addEventListener('load', function(event)
{
    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = "";

    let addBookForm = document.getElementById('addBook');
    let editBookForm = document.getElementById('editBook');
    let addBookBtn = document.getElementById('addBook')
    .addEventListener('submit', addBook);

    
    let getKeyBtn = document.getElementById('getKeyBtn')
    .addEventListener('click', getRequestKey);
    
    //Request key function
    function getRequestKey(){
        let request = new Request(url + "requestKey");

        fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            key = data.key;
            console.log("Key is: " + key);
        })
    }

    //Local Storage


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


        
});