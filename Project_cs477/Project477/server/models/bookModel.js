
let count =1;


class Book {
    constructor(id, title, ISBN, publishedDate, author, price){
        this.id = id;
        this.title = title;
        this.isbn = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
        this.price = price;
        
    }

    save(){

        this.id = count++;
        collection.push(this);
        console.log(this);
        return this;
    }
    
    update(){
        const index = collection.findIndex(item => item.id == this.id);
        
        if(index > -1){
            collection.splice(index, 1, this);
            return this;
        } else {
            throw new Error('ITEM NOT FOUND')
        }
    }

    static listAll(){
        console.log(collection)
        return collection;
    }

    static findById(bookId){
        const index = collection.findIndex(item => item.id == bookId);
       
        if(index > -1){
            return collection[index];
        } else {
            throw new Error ('ITEM NOT FOUND')
        }

    }
    static  deleteById(bookId){
        const index = collection.findIndex(item => item.id == bookId);
        if(index > -1){
            collection = collection.filter(item => item.id == bookId);
        } else {
            throw new Error('ITEM NOT FOUND')
        }
    }

}
 const collection = [new Book("100","Language", "123", "20-20", "Author", 20), new Book("101","Geography", "12", "20-20", "Author", 20)];
console.log(collection)

module.exports= Book;

