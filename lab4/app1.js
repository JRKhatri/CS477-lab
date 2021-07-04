/**1. Create a npm project and install Express.js (Nodemon if you want)
2. Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”.
3. For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers.
4. Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
5. Customize your 404 page
6. Provide your own error handling
 * 
 */

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port')
app.set('env', 'development');
const envt = app.get('env')
console.log(PORT);
 console.log(envt);
 app.use(express.urlencoded({
     extended :true}))

 app.use('/user', (req, res, next)=>{
     const html =`
     <!DOCTYPE html>
        <html>
            <body style="background-color:red">
            <h2 style="text-align:center">Welcome to Server side Programming </h2>
            <p style="color:blue"> This is lab4 -Node.js - Express framework.</p>
<h2>HTML Forms</h2>
<form action="signup">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="firstname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lastname"><br><br>
  <input type="submit" value="Submit">
</form> 

<p>Click the "Submit" button, the for Sign In.</p>

</body>
</html>`
     res.send(html)
 })

 app.use('/signup', (req, res, next) =>{
     console.log(req.query);
     res.redirect('/')
 })

 app.use('/products', (req, res,next)=>{
    const html =`
    <!DOCTYPE html>
       <html>
           <body style="background-color:green">
           
<h2>Products page</h2>
<form action="product-items" method="post">
 <input type="text" name="title"> </br>
 <input type="submit" value="Submit">
</form> 
<p>Click the "Submit" button.</p>
</body>
</html>`
res.send(html) 
 })

 app.use('/product-items',(req, res, next) =>{
     console.log(req.body);
     res.redirect('/')
 })

 app.use('/', (req, res, next)=>{
   const html =`
    <!DOCTYPE html>
    <html>
        <body style="background-color:pink">
        
<h2>Welcome to main page</h2>
<p style="color:blue"> Use the respective url for retriving the user or prpduct form. </p>
</body>
</html>`
res.send(html)

 })
 
app.listen(PORT, ()=>{console.log('Server is running on port '+ PORT)
})