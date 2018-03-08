window.addEventListener('load', function(event)
{
    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let key = "";

    let addBookForm = document.getElementById('addBook');
    let editBookForm = document.getElementById('editBook');
    let addBookBtn = document.getElementById('addBookBtn')
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

});