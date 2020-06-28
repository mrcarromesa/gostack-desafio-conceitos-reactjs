import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => { 

    async function loadRepositories() {
      const { data } = await api.get('repositories');
      
      if (data) {
        setRepositories(data);
      }
    }

    loadRepositories();

  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories',{
      title: `title ${new Date().getTime()}`,
      url: 'http://localhost',
      techs: ['Tech1'],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const updatedRepository = repositories.filter((r) => r.id !== id);
      setRepositories(updatedRepository);
    } catch (error) {
      alert('Algo deu errado ao tentar remover o item');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((r) => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
