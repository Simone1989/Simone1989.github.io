window.addEventListener('load', function(event){


    // ha en fetch som genererar en lista med 
    // böckerna

    let addBookForm = document.getElementById('addBook');
    let editBookForm = document.getElementById('editBook');
    let addBookBtn = document.getElementById('addBookBtn')
    .addEventListener('submit', addBook);

    let request = new Request({
        url: 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey',
        method: 'GET'
    });


    function addBook(e){
        e.preventDefault();

        let bookTitle = document.getElementById('addBookTitle').value;
        let bookAuthor = document.getElementById('addAuthor').value;

        fetch(request, 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert')
        .then(response => response.json())
        .then(data => console.log(data))
    }

    
});