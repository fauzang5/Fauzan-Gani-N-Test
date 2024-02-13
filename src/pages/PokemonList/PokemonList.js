import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import './PokemonList.css';
const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.error('Error fetching pokemons:', error));
  }, []);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
      setCurrentPage(1); 
    };
  
    const filteredPokemonList = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

  const indexOfLastPokemon = currentPage * postPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - postPerPage;
  const currentPokemon = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const startIndex = (currentPage - 1) * postPerPage + 1;


  return (
    <div className='container'>
      <h1 className='text-center' style={{ fontFamily:'Sixtyfour', fontSize:'8vw' }}>Pokemon</h1>
      <Form>
        <InputGroup>
          <Form.Control 
             onChange={handleSearchChange} 
             value={search}
             placeholder='Search pokemon'
          />
        </InputGroup>
      </Form>
      <Table className='mt-4'>
        <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Deskirpsi</th>
            </tr>
        </thead>
        <tbody>
        {currentPokemon.map((pokemon, index) => (
            <tr key={pokemon.name}>
              <td>{startIndex + index}</td>
              <td>{pokemon.name}</td>
              <td><a href={`/pokemon/${pokemon.name}`}>Lihat Detail</a></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='d-flex justify-content-end'>
        <Pagination>
          <Pagination.Prev 
            disabled={currentPage === 1} 
            onClick={() => handlePageChange(currentPage - 1)} 
          />
          {[...Array(Math.ceil(filteredPokemonList.length / postPerPage)).keys()].map((number) => (
            <Pagination.Item 
              key={number + 1} 
              active={number + 1 === currentPage} 
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            disabled={currentPage === Math.ceil(filteredPokemonList.length / postPerPage)} 
            onClick={() => handlePageChange(currentPage + 1)} 
          />
        </Pagination>
      </div>

    </div>
  );
};

export default PokemonList;
