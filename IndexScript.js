//The open request doesn't open the database or start the transaction right away.
 //The call to the open() function returns an IDBOpenDBRequest object with a result (success) or error value that you handle as an event.
let request = indexedDB.open("camera", 1); 
let db; // db is stored in the form of tables
request.onsuccess = function (e) {
    //  if db exists then will get the db from here 
    db = request.result;
}
request.onerror = function (err) { // if error occurs
    console.log(err)
}
request.onupgradeneeded = function () {
    // if db doesn't exist then it will create a new db 
    db = request.result;
    // Creating two tables
    db.createObjectStore("img", { keyPath: "mid" }); // 
    db.createObjectStore("video", { keyPath: "mid" });
}
// To read the records of an existing object store, the transaction can either be in readonly or readwrite mode.
// To make changes to an existing object store, the transaction must be in readwrite mode
// The method returns a transaction object containing the IDBIndex.objectStore method, 
//which you can use to access your object store.

function addMediaToDB(data, table) {
    if (db) {
        // you need to get transaction
        let tx = db.transaction(table, "readwrite");
        // get table refer
        let store = tx.objectStore(table);
        // add
        store.add({ mid: Date.now(), media: data });

    } else {
        alert("db is loading")
    }
}