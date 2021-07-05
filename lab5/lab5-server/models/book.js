let collection = [];

class Book {
    constructor(id, title, ISBN, publishedDate, author){
        this.id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author
    }
    save(){
        this.id = Math.round((Math.random() * 10000)).toString();
        collection.push(this);
        return this;
    }
    update(){
        const index = collection.findIndex(item => item.id === this.id);
        if(index > -1){
            collection.splice(index, 1, this);
            return this;
        } else {
            throw new Error('ITEM NOT FOUND')
        }
    }

    static listAll(){
        return collection;
    }

    static findById(bookId){
        const index = collection.findIndex(item => item.id === bookId);
        if(index > -1){
            return collection[index];
        } else {
            throw new Error ('ITEM NOT FOUND')
        }

    }
    static  deleteById(bookId){
        const index = collection.findIndex(item => item.id === bookId);
        if(index > -1){
            collection = collection.filter(item => item.id !== bookId);
        } else {
            throw new Error('ITEM NOT FOUND')
        }
    }

}

const newBook = new Book(null, "Node", "1234","12-2-2020", "Tina").save();
console.log(newBook)
console.log(collection)
module.exports= Book;

