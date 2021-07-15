
let userCart = null;

class Cart {
    
     static saveInCart(product){
         if(userCart === null){
             cart = {products:[], totalItem:0, totalPrice:0}
         }
         const itemIndex = userCart.products.findIndex(item =>item.pid == product.pid);
         
         if(itemIndex > -1){
         const cartProduct = cart.products[itemIndex];
           cartProduct.qty +=1;
         } else {
             product.qty =1;
             userCart.products.push(product)
         }
         userCart.totalPrice += product.price;
         userCart.totalItem +=product.qty;

     }
     static getCart(){
         return userCart;
     }
     static deleteItem(pid){
         const product = userCart.products.findIndex(item => item.pid == pid )
         if(product > -1){
             userCart.products.splice(product, 1)
         }
     }
}
