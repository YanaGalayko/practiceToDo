import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const input = document.querySelector('.input-js');
const buttonAdd = document.querySelector('.btn-add');
const buttonDelete = document.querySelector('.btn-delete');
const list = document.querySelector('.todo-list');
const LS_KEY = "todo";
const toDoArray = JSON.parse(localStorage.getItem(LS_KEY))??[];

buttonAdd.addEventListener('click', createObject);
list.addEventListener('click', onDoneChange);
buttonDelete.addEventListener('click', deleteToDo);


function createObject() {
    if (!input.value.trim()) {
        return
    }
    const toDo = {
        id: uuidv4(),
        textValue: input.value,
        status: "list-item",
    };
    list.insertAdjacentHTML('beforeend', createMarkup(toDo));
    input.value = " ";
    toDoArray.push(toDo);

    localStorage.setItem(LS_KEY, JSON.stringify(toDoArray));
}
 if (toDoArray.length) {
      list.insertAdjacentHTML('beforeend', toDoArray.map(createMarkup).join(""));  
    }

function createMarkup({id, textValue, status}) {
    return `<li class='${status}' id='${id}'>${textValue}</li>`;
}

function onDoneChange(event) {
    if (event.target.nodeName !== "LI") {
        return;
    }

    if (event.target.classList.contains("list-item")) {
        event.target.classList.replace("list-item","list-item-complete")
    } else {
        event.target.classList.replace("list-item-complete","list-item")
    }

    const storageData = JSON.parse(localStorage.getItem(LS_KEY))
    const newStorageData = storageData.map((item) => 
        (item.id === event.target.id ? {...item, status: event.target.classList[0]}:item)
    )
    // console.log(newStorageData);
    localStorage.setItem(LS_KEY, JSON.stringify(newStorageData));
}

function deleteToDo() {
    const storageData = JSON.parse(localStorage.getItem(LS_KEY));
    const newStorageData = storageData.filter(item => item.status === "list-item");
    localStorage.setItem(LS_KEY, JSON.stringify(newStorageData));

    list.innerHTML = newStorageData.map(createMarkup).join("");
    
    console.log(newStorageData);
}