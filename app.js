document.addEventListener("DOMContentLoaded", function (){
    listArray = []
    if (JSON.parse(localStorage.getItem("savedList")) != null){
        listArray = JSON.parse(localStorage.getItem("savedList"))
        function removeNull(each){
            return each != null
        }
        listArray = listArray.filter(removeNull)
        for (let item of listArray){
            let newItem = showTodo(item.text)
            if (item.status == "complete"){
                newItem.classList.toggle("complete")
            }
        }
    }

    function TodoItem(text) {
        this.text = text
        this.status = "not"
    }
    
    document.querySelector("form").addEventListener("submit", function (event){
        event.preventDefault()
        let newValue = event.target.elements.newtodo.value
        event.target.elements.newtodo.value = ""
        saveTodo(newValue)
        showTodo(newValue)
    })

    function showTodo(text) {
        let newLi = document.createElement("li")
        newLi.innerText = text
        document.querySelector("ul").append(newLi)
        return newLi
    }

    function saveTodo(text){
        let newTodo = new TodoItem(text)
        listArray.push(newTodo)
        localStorage.setItem("savedList", JSON.stringify(listArray))
    }

    document.querySelector("ul").addEventListener("click", function (event){
        let selectedLi = event.target
        selectedLi.classList.toggle("complete")
        let index = listArray.findIndex((obj => obj.text == selectedLi.innerText))
        if (listArray[index].status == "not"){
            (listArray[index].status = "complete")
        }
        else {
            (listArray[index].status = "not")
        }
        localStorage.setItem("savedList", JSON.stringify(listArray))
    })

    document.querySelector("ul").addEventListener("dblclick", function (event){
        let selectedLi = event.target
        selectedLi.remove()
        listArray = listArray.filter(item => item.text !== selectedLi.innerText)
        localStorage.setItem("savedList", JSON.stringify(listArray))
    })
})