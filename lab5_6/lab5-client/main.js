
function displayLoginForm() {
    document.getElementById('book-container').style.display = "none";
    document.getElementById("login-div").style.display = "block"  //block means to show the block
}

function displayBookContent(){
    listBookItems();
        document.getElementById('book-container').style.display = "block";
        document.getElementById("login-div").style.display = "none"

}



window.onload = function () {

    if (sessionStorage.getItem("accessToken")) {
        displayBookContent();
        
    } else {
        displayLoginForm();

    };

    document.getElementById("logoutBtn").onclick = function(){
        sessionStorage.removeItem("accessToken");
        displayLoginForm();
    };


    document.getElementById("loginBtn").onclick = async function (event) {
        event.preventDefault();

        const result = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        }).then(response => response.json());
        console.log(result.jwtToken) // result will be token like : {jwtToken:"eeyJhbGc"} or error send by res
        if (result.jwtToken) {
            sessionStorage.setItem('accessToken', result.jwtToken);
            //hide login form 
            //display logout button
            //load all products
            //display add product form
            displayBookContent();


        } else {
            document.getElementById("error-msg").innerHTML = result.error

        }



    }










    document.getElementById('submitBtn').onclick = function (event) {
        event.preventDefault();
        const bookId = this.dataset.id;

        if (bookId) { // in submit button if dataset.idexists - edit or updsate book else add book
            editBookById(bookId);
        } else {
            createNewBook();

        }



    }

}


function editBookById(bookid) {
    fetch("http://localhost:5000/books/" + bookid, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        },
        //stringfy changes object to be json REST on server sided understand only json
        body: JSON.stringify({
            title: document.getElementById("title").value,
            isbn: document.getElementById("isbn").value,
            publishedDate: document.getElementById("publishDate").value,
            author: document.getElementById("authorName").value
        })

    }).then(data => data.json())
        .then(updata => {
            console.log(updata);
            document.getElementById("form-title").textContent = "Add a Book";
            document.getElementById("submitBtn").dataset.id = "";
            location.reload();

        })
}




function createNewBook() {
    const title = document.getElementById("title").value;
    const isbn = document.getElementById("isbn").value;
    const publishedDate = document.getElementById("publishDate").value;
    const author = document.getElementById("authorName").value;


    //by default fetch ("url") is get method so for post method should have object parameter 
    fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        },
        //stringfy changes object to be json REST on server sided understand only json
        body: JSON.stringify({
            title: title,
            isbn: isbn,
            publishedDate: publishedDate,
            author: author
        })


    }).then(data => data.json())
        .then(element => {
            console.log(element);
            document.getElementById("add-book").reset();
            attachBookOnBookList(document.getElementById("book-list-body"), element)
        });


}


async function listBookItems() {
    const books = await (await fetch("http://localhost:5000/books", {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        }
    })).json();
    console.log(books)
    const tbody = document.getElementById("book-list-body");
    books.forEach(element => {
        attachBookOnBookList(tbody, element);
    });


}

function attachBookOnBookList(tbody, element) {
    const tr = document.createElement("tr"); //<tr>

    const titleTd = document.createElement("td"); //<td> Name </td>
    titleTd.textContent = element.title;
    tr.appendChild(titleTd)

    const isbnTd = document.createElement("td");
    isbnTd.textContent = element.isbn;
    tr.appendChild(isbnTd)

    const publishDateTd = document.createElement("td");
    publishDateTd.textContent = element.publishedDate;
    tr.appendChild(publishDateTd)

    const authorTd = document.createElement("td");
    authorTd.textContent = element.author;
    tr.appendChild(authorTd);

    const actionId = document.createElement("td");
    const deleteBtn = document.createElement("button");
    //deleteBtn.className = "btn";
    deleteBtn.innerText = "DELETE"
    deleteBtn.dataset.id = element.id;
    actionId.appendChild(deleteBtn);
    tr.appendChild(actionId);

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "UPDATE";
    updateBtn.dataset.id = element.id;
    actionId.appendChild(updateBtn);
    tr.appendChild(actionId)


    deleteBtn.addEventListener("click", function () {
        fetch("http://localhost:5000/books/" + element.id, {
            method: "DELETE",
            headers: {

                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
            },

        }).then(data => {
            tr.remove();

        });


    });

    updateBtn.addEventListener("click", function () {
        fetch("http://localhost:5000/books/" + element.id, {

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                document.getElementById("form-title").textContent = "Edit a Book";
                document.getElementById("form-title").style = "color:red";
                document.getElementById("title").value = data.title
                document.getElementById("isbn").value = data.isbn
                document.getElementById("publishDate").value = data.publishedDate;
                document.getElementById("authorName").value = data.author;
                document.getElementById('submitBtn').dataset.id = data.id;

            })

    })


    tbody.appendChild(tr)
}






