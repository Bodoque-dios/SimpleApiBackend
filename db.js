const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database("./main.db");

db.serialize(() => {
    db.run(` CREATE TABLE Users (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        FirstName VARCHAR(255) NOT NULL,
        LastName VARCHAR(255) NOT NULL,
        UserType VARCHAR(255) NOT NULL,
        DateCreated DATETIME NOT NULL,
        LastLogin DATETIME NOT NULL,
        Active INTEGER NOT NULL);`);

    db.run(`CREATE TABLE Sessions (
        SessionID INTEGER PRIMARY KEY,
        UserID INTEGER,
        Token VARCHAR(255) NOT NULL,
        DateExpires DATETIME NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
        );
    `)
    db.run(`CREATE TABLE Chats (
        ChatID INTEGER PRIMARY KEY
    );    
    `)
    db.run(`CREATE TABLE UserChats (
        UserChatID INTEGER PRIMARY KEY,
        UserID INTEGER,
        ChatID INTEGER,
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (ChatID) REFERENCES Chats(ChatID)
    );
        
    `)    
    db.run(`CREATE TABLE Messages (
        MessageID INTEGER PRIMARY KEY,
        ChatID INTEGER,
        UserID INTEGER,
        Content TEXT,
        Timestamp DATETIME,
        FOREIGN KEY (ChatID) REFERENCES Chats(ChatID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
        
    `)   
    db.run(`CREATE TABLE UserMovieLiked (
        ID INTEGER PRIMARY KEY,
        UserID INTEGER,
        MovieID INTEGER,
        Liked BOOLEAN,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
       
    `)

    /*
    const stmt = db.prepare("INSERT INTEGERO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

   db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });*/
});

db.close();