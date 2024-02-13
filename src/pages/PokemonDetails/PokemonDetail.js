import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoadingPokeball from '../../components/Loading/loading';
import ListGroup from 'react-bootstrap/ListGroup';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setTimeout(() => { 
          setPokemonData(data);
          setIsLoading(false);
        }, 3000); 
      } catch (error) {
        console.error('Error fetching pokemon detail:', error);
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return (
      <LoadingPokeball/>
    );
  }
  const { sprites, abilities, height, species, stats } = pokemonData;

  return (
    <div className='container'>
      <h1 className='text-center' style={{ fontFamily:'Sixtyfour', fontSize:'5vw' }}>Pokemon Detail</h1>
      <Card style={{ width: '100%', height: 'auto' }}>
        <div className='row g-0'>
          <div className='col-4'>
            <Card.Img
            src={sprites.front_default || sprites.front_shiny || 'https://via.placeholder.com/'}
            alt={name}
            />
          </div>
          <div className='col-8'>
          <Card.Body>
            <Card.Title><h2>{name}</h2></Card.Title>
            <Card.Text>
            <h2>Abilities</h2>
            <ListGroup>
            {abilities.map((ability, index) => (
                <ListGroup.Item key={index}>{ability.ability.name}</ListGroup.Item>
              ))}
                <ListGroup.Item><ProgressBar striped variant="danger" now={height} />Height: {height}</ListGroup.Item>
            </ListGroup>
            <h2>Species: {species.name}</h2>
            <h2>Stats</h2>
            <ListGroup>
            {stats.map((stat, index) => (
              <ListGroup.Item key={index}>
                <ProgressBar striped variant="danger" now={(stat.base_stat / 200) * 100} />
                {stat.stat.name}: {stat.base_stat}
              </ListGroup.Item>
              ))}
                <ListGroup.Item><ProgressBar striped variant="danger" now={height} />Height: {height}</ListGroup.Item>
            </ListGroup>
            </Card.Text>
          </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PokemonDetail;
