document.addEventListener("DOMContentLoaded", function () {
    // declared without a keyword (var, let, or const), making it a global variable. It's better to declare it with let or const to limit its scope.
    let listArray = [];
    // avoid using != or ==, unless you are 100% aware of the outcome of the operation, switch to using !== or ===.
    if (JSON.parse(localStorage.getItem("savedList")) !== null) {
        listArray = JSON.parse(localStorage.getItem("savedList"));
        // if a function is used only for the purpose of a call, such as the current filter call, avoid declaring separately, helps in avoiding confusion,
        // it should also increase the readability of the code.
        listArray = listArray.filter(function (each) {
            return each != null;
        });
        for (let item of listArray) {
            let newItem = showTodo(item.text);
            // avoid using != or ==, unless you are 100% aware of the outcome of the operation, switch to using !== or ===.
            if (item.status === "complete") {
                newItem.classList.toggle("complete");
            }
        }
    }

    function TodoItem(text) {
        this.text = text;
        this.status = "not";
    }

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        // use const when value doesn't change within a scope.
        const newValue = event.target.elements.newtodo.value;
        event.target.elements.newtodo.value = "";
        saveTodo(newValue);
        showTodo(newValue);
    });

    function showTodo(text) {
        let newLi = document.createElement("li");
        newLi.innerText = text;
        document.querySelector("ul").append(newLi);
        return newLi;
    }

    function saveTodo(text) {
        let newTodo = new TodoItem(text);
        listArray.push(newTodo);
        localStorage.setItem("savedList", JSON.stringify(listArray));
    }

    document.querySelector("ul").addEventListener("click", function (event) {
        let selectedLi = event.target;
        selectedLi.classList.toggle("complete");
        let index = listArray.findIndex((obj) => obj.text === selectedLi.innerText);
        if (listArray[index].status == "not") {
            listArray[index].status = "complete";
        } else {
            listArray[index].status = "not";
        }
        localStorage.setItem("savedList", JSON.stringify(listArray));
    });

    document.querySelector("ul").addEventListener("dblclick", function (event) {
        let selectedLi = event.target;
        selectedLi.remove();
        listArray = listArray.filter((item) => item.text !== selectedLi.innerText);
        localStorage.setItem("savedList", JSON.stringify(listArray));
    });
});
