import TODOS from './TODOS.js';
import assert from 'assert';

/*]Bloques de testings */
describe('Probando ToDos',()=>{
    it('Inicio instanciando clase vacia',()=>{
        const todos = new TODOS();
        assert.strictEqual(todos.list().length,0)
    })
    it('Debe agregar un ToDo correctamente',()=>{
        const todos = new TODOS();
        todos.add('taskOne');
        assert.strictEqual(todos.list().length,1)
    })
    it('Creo task y queda sin hacer',()=>{
        const todos = new TODOS();
        todos.add('task1');
        assert.deepStrictEqual(todos.list(),[{title:'task1',completed:false}])
    })
})

describe('Error',()=>{
    it('si no hay nada que hacer, saltara este error',()=>{
        const todos = new TODOS();
        const expected= new Error('No hay nada que hacer')
        assert.throws(()=>{
            todos.completeTodo('nadanadanadinas')
        },expected)
    })
})