
//Here we will write java script code for DOM related
// "use strict";
let logInUser;
let userRole;
let userId;

window.onload = function () {
    // display home page//
    document.getElementById('login-div').style.display = 'none';
    document.getElementById("signup-div").style.display = 'none';
    document.getElementById("book-container").style.display = 'none';
    document.getElementById("displayTotal").style.display = "none"
    document.getElementById("payment").style.display = "none";
    document.getElementById("ordered").style.display = "none"
    document.getElementById('finalsummary').style.display = 'none';
    document.getElementById("updateInfo-div").style.display = "none"
    document.getElementById("userDiv").style.display = "none"
   //document.getElementById("deleteCartItem-div").style.display = "block"


    //document.getElementById("placeorder").style.display ="none"


    //display login form
    document.getElementById('loginbtn').onclick = (e) => {
        e.preventDefault();
        document.getElementById('login-div').style.display = 'block';
        //document.getElementById('signinupbtn').style.display='none';   

    }
    //display signup form
    document.getElementById('signupbtn').onclick = (e) => {
        e.preventDefault();
        document.getElementById('signup-div').style.display = 'block';
        document.getElementById('signinupbtn').style.display = 'none';

    }
    document.getElementById("logoutBtn").onclick = function () {
        sessionStorage.removeItem("accessToken");
        location.reload()
    };

    //register member -signup submit button click//

    document.getElementById("signupSubmit").onclick = function (event) {
        console.log("-----------------")
        event.preventDefault();
        const username = document.getElementById('username1').value;
        const password = document.getElementById('password1').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        // const email = document.getElementById('inputEmail4').value;
        let role = document.getElementById('role').value;

        role === "1" ? role = "guest" : role = "admin"
        userRole = role;
        console.log(userRole)



        let user = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            zip: zip,
            role: role
        };
        //  console.log(user);
        fetch('http://localhost:5000/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                user
            )
        }).then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    document.getElementById('error-msg').innerHTML = data.error;
                } else {
                    //window .open(login.html)
                    //console.log(document.getElementById("loginbtn"));
                    // document.getElementById("loginbtn").click();
                    document.getElementById('login-div').style.display = 'block'
                    document.getElementById("signup-div").style.display = 'none';
                }
            })
    }

    //login page- login click//

    document.getElementById("loginBtn").onclick = async function (event) {
        event.preventDefault();
        logInUser = document.getElementById("username").value;

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
        console.log(bookId)

        if (bookId) {
            // in submit button if dataset.idexists - edit or updsate book else add book
            console.log("inside update")
            editBookById(bookId);
        } else {
            createNewBook();

        }
    }
    //listing items in cart - click view cart
    document.getElementById('viewCartBtn').onclick = function (event) {
        event.preventDefault();
        viewCartList()



    }

    document.getElementById("total").onclick = async function (event) {
        event.preventDefault();
        document.getElementById("totalBill").style.display = "block"
        let totalDisplay = document.getElementById("displayTotal")
        totalDisplay.style.display = "block"

        const books = await fetch("http://localhost:5000/total/:" + logInUser, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
            }
        }).then(response => {
            console.log(response)
            return response.json()
        });
        console.log(books)
        //const tbody = document.getElementById("book-list-body");
        // console.log(books.Total_Item)

        totalDisplay.textContent = JSON.stringify(books)//JSON.stringify(`Total Item: ${books.Total_Item};  Total Bill Amount : ${books.Total_Amount}`)


    }

    document.getElementById("checkout").onclick = function (event) {
        event.preventDefault();
        document.getElementById("hidetable").style.display = 'none';
        document.getElementById("cartList").style.display = "block";
        document.getElementById("payment").style.display = "block";


    }
    // const placeOrder= `<button id='placeOrder'>Place Order</button>`;
    document.getElementById("accountBtn").onclick = function (event) {
        event.preventDefault();
        const fname = document.getElementById("firstname3").value
        const lname = document.getElementById("lastname3").value
        const address = document.getElementById("address3").value
        const accountNo = document.getElementById("accountno").value
        // const exp = document.getElementById("exp").value
        const zip = document.getElementById("zip").value

        document.getElementById("finalsummary").style.display = "block"
        document.getElementById("l1").innerHTML = `First Name: ${fname}`;
        document.getElementById("l2").innerHTML = `Last Name: ${lname}`;

        document.getElementById("l3").innerHTML = `Address: ${address}`;
        document.getElementById("l4").innerHTML = `Account No: ${accountNo}`;
        document.getElementById("l5").innerHTML = `Zip: ${zip}`;
        //document.getElementById("l6").innerHTML = `Zip: ${zip}`;


        //document.getElementById("finalsummary").style.display ="block"
        //  document.getElementById("summary").innerHTML = ` 

        //document.getElementById("ordered").style.display="block"
        document.getElementById("payment").style.display = "none";
    }
    //const orderbtn=document.getElementById("ordered");
    //orderbtn.onclick=()=>{

    //click last button payment to refresh page
    document.getElementById("finalPayment").onclick = async function (event) {
        event.preventDefault();

        let totalDisplay = document.getElementById("displayTotal")
        totalDisplay.style.display = "block"
        document.getElementById("book-list-body").style.display = "block"
        // document.getElementById("totalBill").style.display = "block"
        // let totalDisplay = document.getElementById("displayTotal")
        // totalDisplay.style.display ="block"/checkout/:username

        const books = await fetch("http://localhost:5000/checkout/:" + logInUser, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
            }
        }).then(response => {

            console.log(response)
            return response.json()
        });
        console.log(books)
        totalDisplay.textContent = JSON.stringify(books)
        document.getElementById("finalsummary").style.display = "none"
        document.getElementById("cartList").style.display = "none"
        //document.getElementById('login-div').style.display = 'block';
        document.getElementById("book-list-body").style.display = "block"
        listBookItems()


        console.log("*%*%")




    }

    //edit information
    document.getElementById("editInfo").onclick = function (event) {
        event.preventDefault()

        document.getElementById("userDiv").style.display = "block"
        editInformation()

    }

    document.getElementById("updateSubmit").onclick = function (event) {
        event.preventDefault()
        const passW = document.getElementById("password9").value;
        const fname = document.getElementById("firstname9").value;
        const lname = document.getElementById("lastname9").value
        const address = document.getElementById("address9").value;
        const city = document.getElementById("city9").value;
        const zip = document.getElementById("zip9").value;
        http://localhost:5000/checkout/:" + logInUser

        fetch("http://localhost:5000/updateUser/" + logInUser, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
            },
            //stringfy changes object to be json REST on server sided understand only json
            body: JSON.stringify({
                id: userId,
                password: passW,
                firstname: fname,
                lastname: lname,
                address: address,
                city: city,
                zip: zip,
                role: userRole
            })

        }).then(data => data.json())
            .then(updata => {
                console.log(updata);
                alert("Information Updated Successfully! Please login.")
                location.reload();

            })



    }



}


//FUNCTIONS THAT ARE CALLED FROM WINDOWS>ONLOAD


async function editInformation() {

    const books = await fetch("http://localhost:5000/userInfo/" + logInUser, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        }
    }).then(response => {
        console.log(response)
        return response.json()
    });
    console.log(books)



    const tbody = document.getElementById("userInformation");
    //books.forEach(element => {
    attachUserInfo(tbody, books);
    //});


}

function attachUserInfo(tbody, element) {

    const tr = document.createElement("tr"); //<tr>

    const titleTd = document.createElement("td"); //<td> Name </td>
    titleTd.textContent = element.password;
    tr.appendChild(titleTd)

    const isbnTd = document.createElement("td");
    isbnTd.textContent = element.firstname;
    tr.appendChild(isbnTd)

    const publishDateTd = document.createElement("td");
    publishDateTd.textContent = element.lastname;
    tr.appendChild(publishDateTd)

    const authorTd = document.createElement("td");
    authorTd.textContent = element.address;
    tr.appendChild(authorTd);

    const priceTd = document.createElement("td");
    priceTd.textContent = element.city;
    tr.appendChild(priceTd);

    const zipTd = document.createElement("td");
    zipTd.textContent = element.zip;
    tr.appendChild(zipTd);

    // const roleTd = document.createElement("td");
    // roleTd.textContent = element.role;
    // tr.appendChild(roleTd);

    const actionId = document.createElement("td");
    const deleteBtn = document.createElement("button");
    //deleteBtn.className = "btn";
    deleteBtn.innerText = "BACK"
    deleteBtn.dataset.id = element.id;
    actionId.appendChild(deleteBtn);
    tr.appendChild(actionId);

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "UPDATE";
    updateBtn.dataset.id = element.id;
    actionId.appendChild(updateBtn);
    tr.appendChild(actionId)
    userId = element.id;
    document.getElementById('guestBtn').style.display = 'none';
    document.getElementById('cartList').style.display = 'none';

    deleteBtn.addEventListener("click", function () {
          const tbodyCart = document.getElementById("userInformation");
        tbodyCart.innerText = "";
        document.getElementById("hidetable").style.display = 'block';
        document.getElementById("guestBtn").style.display = "block";
        document.getElementById("cartList").style.display = "block";
        document.getElementById("book-container").style.display = 'block';
        document.getElementById("userDiv").style.display = 'none';
        document.getElementById("updateInfo-div").style.display = "none"


    });

    updateBtn.addEventListener("click", function () {
        // const tbodyCart = document.getElementById("userInformation");
        // tbodyCart.innerText = "";

        //document.getElementById("book-container").style.display = 'block';
        document.getElementById("hidetable").style.display = 'none';

        document.getElementById("updateInfo-div").style.display = "block"


    })


    tbody.appendChild(tr)

}




//display book tables
function displayBookContent() {
    listBookItems();
    document.getElementById('book-container').style.display = "block";
    document.getElementById("login-div").style.display = "none"
    document.getElementById("signinupbtn").style.display = "none"
    document.getElementById("totalBill").style.display = "none"
   // document.getElementById("deleteCartItem").style.display = "block"

}
//function for listing all books
async function listBookItems() {
    const books = await fetch("http://localhost:5000/books", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        }
    }).then(response => {
        console.log(response)
        return response.json()
    });
    console.log(books)
    const tbody = document.getElementById("book-list-body");
    books.forEach(element => {
        attachBookOnBookList(tbody, element);
    });

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

            //location.reload();

        })
}

//view cart click function//
async function viewCartList() {
    const tbodyCart = document.getElementById("cart-list-body");
    tbodyCart.innerText = "";
    const books = await (await fetch("http://localhost:5000/carts/" + logInUser, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        }
    })).json();

    books.forEach(element => {
        //document.getElementById("cart-list-body") =null;
        attachItemOnCartList(tbodyCart, element);
    });

}


function createNewBook() {
    const title = document.getElementById("title").value;
    const isbn = document.getElementById("isbn").value;
    const publishedDate = document.getElementById("publishDate").value;
    const author = document.getElementById("authorName").value;
    const price = document.getElementById("price").value


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
            author: author,
            price: price

        })


    }).then(data => data.json())
        .then(element => {
            console.log(element);
            document.getElementById("add-book").reset();
            attachBookOnBookList(document.getElementById("book-list-body"), element)
        });

}

function attachBookOnBookList(tbody, element) {
    if (userRole === "admin" || userRole === "Admin") {

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

        const priceTd = document.createElement("td");
        priceTd.textContent = element.price;
        tr.appendChild(priceTd);

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

        document.getElementById('guestBtn').style.display = 'none';
        document.getElementById('cartList').style.display = 'none';


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
            console.log("^^^^^")
            console.log(element)

            fetch("http://localhost:5000/books/" + element.id, {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
                }
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data.id);
                    console.log(data.title)
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

    } else {
        

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

        const priceTd = document.createElement("td");
        priceTd.textContent = element.price;
        tr.appendChild(priceTd);

        const actionId = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn";
        deleteBtn.innerText = "1 Item"
        deleteBtn.dataset.id = element.id;
        actionId.appendChild(deleteBtn);
        tr.appendChild(actionId);

        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Add to Cart";
        updateBtn.dataset.id = element.id;
        actionId.appendChild(updateBtn);
        tr.appendChild(actionId)

        

        document.getElementById('addBook-div').style.display = 'none';
        

        //deleteBtn.addEventListener("click", function () {



        // fetch("http://localhost:5000/books/" + element.id, {
        //  method: "DELETE",
        //  headers: {

        //     "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        // },

        // }).then(data => {
        //  tr.remove();

        // });


        // });

        updateBtn.addEventListener("click", function () {
            const id = element.id;
            const title = element.title;
            const isbn = element.isbn;
            const price = element.price;
            console.log(price);
            //document.getElementById("deleteform").style.display = "block";


            fetch("http://localhost:5000/carts/" + logInUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
                },
                body: JSON.stringify({
                    id: id, title: title, isbn: isbn, price: price,
                })
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data.pid);
                    alert("One Item added to Cart. Click- 'View Cart' to view all items")
                    // document.getElementById("form-title").textContent = "Edit a Book";
                    // document.getElementById("form-title").style = "color:red";
                    // document.getElementById("title").value = data.title
                    // document.getElementById("isbn").value = data.isbn
                    // document.getElementById("publishDate").value = data.publishedDate;
                    // document.getElementById("authorName").value = data.author;
                    // document.getElementById('submitBtn').dataset.id = data.id;

                })

        })


        tbody.appendChild(tr)





    }
}


//attaching item on cart list//

function attachItemOnCartList(tbody, element) {

    const tr = document.createElement("tr"); //<tr>

    const pidTd = document.createElement("td"); //<td> Name </td>
    pidTd.textContent = element.pid;
    tr.appendChild(pidTd)


    const titleTd = document.createElement("td"); //<td> Name </td>
    titleTd.textContent = element.productName;
    tr.appendChild(titleTd)

    const isbnTd = document.createElement("td");
    isbnTd.textContent = element.isbn;
    tr.appendChild(isbnTd)

    const priceTd = document.createElement("td"); //<td> Name </td>
    priceTd.textContent = element.price;
    tr.appendChild(priceTd)

    const qtyTd = document.createElement("td"); //<td> Name </td>
    qtyTd.textContent = element.qty;
    tr.appendChild(qtyTd)



    // const publishDateTd = document.createElement("td");
    // publishDateTd.textContent = element.publishedDate;
    // tr.appendChild(publishDateTd)

    // const authorTd = document.createElement("td");
    // authorTd.textContent = element.author;
    // tr.appendChild(authorTd);

    const actionId = document.createElement("td");
    tbody.appendChild(tr)
}


//displaying user information

async function listBookItems() {
    const books = await fetch("http://localhost:5000/books", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')   // retieve token store in browser session storage
        }
    }).then(response => {
        console.log(response)
        return response.json()
    });
    console.log(books)
    const tbody = document.getElementById("book-list-body");
    books.forEach(element => {
        attachBookOnBookList(tbody, element);
    });

}


////(guest cart functions)












    






