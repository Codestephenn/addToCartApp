import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-1ad8c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")

const addBtn = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value
  push(shoppingListInDB, inputValue)
  console.log(inputValue)
  clearInputFieldEl()
  
  
})

onValue(shoppingListInDB, function(snapshot) {
  console.log(snapshot.val())
  let itemArray = Object.entries(snapshot.val())
  console.log(snapshot.val)
  clearShoppingListEl()
  
  
  for (let i = 0; i <itemArray.length; i++){
    let currentItem = itemArray[i]
    
    let currentItemID = currentItem[0]
   let currentItemValue = currentItem[1]
    
    appendItemToShoppingList(currentItemValue)
    
  }
})

function clearInputFieldEl(){
  inputField.value = ""
}

function appendItemToShoppingList(itemValue){
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
}