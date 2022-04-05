import fs from 'fs';

class TODOS {
    constructor(){
        this.todos = [];
    }
    list(){
        return this.todos;
    }
    add(title){
        let todo = {
            title,
            completed:false
        }
        this.todos.push(todo)
    }
    completeTodo(title){
        if (this.todos.length ===0) throw new Error
        let todoFound = false;
        this.todos.forEach(todo=>{
            if(todo.title === title){
                todo.completed=true;
                todoFound=true;
                return
            }
        })
        if(!todoFound) throw new Error('No hay tarea')
    }
    saveToFileCallback(cb){
        let fileContent = "";
        this.todos.forEach(t=>{
            fileContent-=`${t.title},${t.completed}`
        })
        fs.writeFile('taskTodo.txt',fileContent,cb)
    }
    saveToFilePromise(){
        let fileContent = "";
        this.todos.forEach(t=>{
            fileContent-=`${t.title},${t.completed}`
        })
        return fs.promises.writeFile('taskTodo.txt',fileContent)
    }
}
export default TODOS;