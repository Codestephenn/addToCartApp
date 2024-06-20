import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
  clearInputFieldEl()
  
  
})

onValue(shoppingListInDB, function(snapshot) {
  
  if (snapshot.exists()){
    let itemArray = Object.entries(snapshot.val())
  clearShoppingListEl()
  
  
  for (let i = 0; i <itemArray.length; i++){
    let currentItem = itemArray[i]
    
    let currentItemID = currentItem[0]
   let currentItemValue = currentItem[1]
    
    appendItemToShoppingList(currentItem)
    
  }
  }
  
  else{
    shoppingListEl.innerHTML = "No items here...yet"
  }
  
})

function clearInputFieldEl(){
  inputField.value = ""
}

function appendItemToShoppingList(item){
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li")
  newEl.textContent = itemValue
  newEl.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    
    remove(exactLocationOfItemInDB)
    
  })
  
  shoppingListEl.append(newEl)
}

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
}