const task = document.querySelector("#task");
const add = document.querySelector("#add");
const todolist = document.querySelector(".todos");
const form = document.querySelector("form")
const baseUrl = "http://localhost:8080"
let element = null;

const createTodo = (input) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = input;
    li.appendChild(p);

    const editbtn = document.createElement("button");
    editbtn.classList.add("btn", "edit");
    editbtn.innerText = "Edit";
    li.appendChild(editbtn);

    const removebtn = document.createElement("button");
    removebtn.classList.add("btn", "remove");
    removebtn.innerText = "Remove"
    li.appendChild(removebtn);

    todolist.appendChild(li);
}

const updatetodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        const todo = e.target.parentElement.querySelector("p").innerText
        removeTodo(todo)
        task.value = "";
        add.value = "ADD";
        location.reload()
    }
    else if (e.target.innerHTML === "Edit") {
        task.value = e.target.previousElementSibling.innerHTML;
        add.value = "Edit";
        task.focus();
        element = e;
    }
}


const addTodo = async () => {
    const response = await fetch(`${baseUrl}/add-todo`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "id": "123456"
            },
            body: JSON.stringify(
                {
                    "todo": task.value
                }
            )
        }
    )
    createTodo(task.value)
    task.value = ""
}


const getTodos = async () => {
    const response = await fetch(`${baseUrl}/get-todos`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "id": "123456"
            },
        }
    )

    const todos = Array.from((await response.json()).todo)

    todos.forEach(todo => {
        createTodo(todo.todo)
    })
}

const removeTodo = async (todo) => {
    const response = await fetch(`${baseUrl}/remove-todo`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "id": "123456"
            },
            body: JSON.stringify({
                "todo": todo
            })
        }
    )
}

const editTodo = async (oldTodo, newTodo) => {
    const response = await fetch(`${baseUrl}/update-todo`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "id": "123456"
            },
            body: JSON.stringify({
                "oldTodo": oldTodo,
                "newTodo": newTodo,
            })
        }
    )
}

window.onload = getTodos()
todolist.addEventListener('click', updatetodo);
add.addEventListener('click', async () => {
    if (add.value === 'ADD') await addTodo()
    else {
        let oldTodo = element.target.previousElementSibling.innerHTML
        let newTodo = task.value
        task.value="";
        add.value="ADD";
        editTodo(oldTodo,newTodo)
        // return;
        location.reload()
    }
});