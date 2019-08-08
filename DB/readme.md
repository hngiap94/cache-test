docker exec -it mongodb_container mongo

use BookstoreDb

db.createCollection('Books')

db.Books.insertMany([{'Name':'Design Patterns','Price':54.93,'Category':'Computers','Author':'Ralph Johnson'}, {'Name':'Clean Code','Price':43.15,'Category':'Computers','Author':'Robert C. Martin'}])

db.Books.insertMany([{'Name':'Design Patterns 2nd edition','Price':54.93,'Category':'Computers','Author':'Ralph Johnson'}, {'Name':'Clean Code 2nd edition','Price':43.15,'Category':'Computers','Author':'Robert C. Martin'}])
