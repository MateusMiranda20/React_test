import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { v4 as uuid } from 'uuid';

interface Task {
  id: string;
  task: string;
  completed: boolean;

}

export default function App() {
  const [list, setList] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  function inputMudou(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function inputClick(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && input.trim() !== '') {
      setList(prevList => [...prevList, { id: uuid(), task: input, completed: false }]);
      setInput(''); // Limpar o input após adicionar a tarefa
    }
  }

  function toggleTaskCompletion(id: string) {
    setList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteItem(id: string) {
    const newList = list.filter(item => item.id !== id)

    setList(newList)
  }

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setList(list.filter(item => !item.completed));
  };

  const filteredList = list.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });


  return (
    <>
      <section>
        <header>
          <h1>Fazeres</h1>
          <div className='container'>
            <input
              onKeyDown={inputClick}
              onChange={inputMudou}
              value={input}
              placeholder="O que precisa ser feito?"
              type="text"
              className="input-with-shadow"
            />
            <main>
              <ul className='t'>
                {filteredList.map(item => (
                  <li key={item.id} className="task-item">
                    <span
                      className={`toggle-ball ${item.completed ? '' : ''}`}
                      onClick={() => toggleTaskCompletion(item.id)}
                    >
                      {item.completed ? '✓' : '⚪'}
                    </span>
                    <span className={`task-text ${item.completed ? 'completed' : ''}`}>
                      {item.task}
                    </span>
                    <button className='deleteItem' onClick={() => deleteItem(item.id)}> X </button>
                  </li>
                ))}
              </ul>
              {list.length > 0 && (
                <div className='button-footer'>
                  <button  className='completeds' onClick={() => handleFilterChange('all')}>All</button>
                  <button  className='completeds' onClick={() => handleFilterChange('active')}>Active</button>
                  <button  className='completeds' onClick={() => handleFilterChange('completed')}>Completed</button>
                  <button  className='completeds' onClick={handleClearCompleted}>Clear Completed</button>
                </div>
              )}
            </main>
          </div>
        </header>
      </section >
      <div className='footer'>
        <p>Criado por Mateus Miranda</p>
        <p>Parte do <a href="https://todomvc.com/">TodoMVC</a></p>
      </div>
    </>
  );
}
