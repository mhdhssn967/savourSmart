import React, { useEffect, useState } from 'react';
import { getAllRecipeAPI } from '../services/allAPI';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RecipeModal = ({ recipe, onHide }) => (
  <Modal
    show={!!recipe}
    onHide={onHide}
    size="lg"
    centered
  >
    {recipe && (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{recipe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex' }}>
            <img src={recipe.image} alt={recipe.name} style={{ width: '50%', borderRadius: '10px' }} />
            <div className="ms-3">
              <h5>Ingredients:</h5>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h5>Time: {recipe.time}</h5>
              <h5>Instructions:</h5>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">Close</Button>
        </Modal.Footer>
      </>
    )}
  </Modal>
);

const SearchRecipe = () => {
  const [ingredientFetched, setIngredientFetched] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getAllRecipe = async () => {
    try {
      const result = await getAllRecipeAPI();
      if (result.status >= 200 && result.status < 300) {
        setIngredientFetched(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

  const displaySearchedIngredients = () => {
    if (searchIngredients) {
      setIngredientList([...ingredientList, searchIngredients]);
      setSearchIngredients('');
    }
  };

  const searchForRecipe = () => {
    const results = ingredientFetched.filter(recipe =>
      ingredientList.every(ingredient => recipe.ingredients.includes(ingredient))
    );
    setMatchedRecipes(results);
    setIngredientList('')
  };

  return (
    <>
      <div className="d-flex flex-column m-3 align-items-center">
        <div>
          <input
            placeholder="Input your available ingredients"
            value={searchIngredients}
            onChange={e => setSearchIngredients(e.target.value)}
            className="border rounded me-3"
            style={{ height: '50px', width: '350px' }}
            type="text"
          />
          <button
            style={{
              height: '48px',
              width: '110px',
              backgroundColor: 'rgb(21, 150, 21)',
              border: 'solid 0.5px',
              borderRadius: '10px',
              color: 'white',
              fontWeight: '800',
            }}
            onClick={displaySearchedIngredients}
          >
            Add
          </button>
        </div>

        <h4 style={{ marginTop: '50px', marginBottom: '-2%' ,color:'white'}}>Available Ingredients</h4>
        <div className="mt-5 d-flex flex-wrap justify-content-center" style={{ width: '1000px' }}>
          {ingredientList &&
          ingredientList?.map((ingredient, index) => (
            <div
              key={index}
              className="m-1"
              style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '10px' }}
            >
              {ingredient}
            </div>
          ))}
        </div>
        <button
          className="btn fw-bolder"
          style={{
            height: '40px',
            width: '250px',
            border: 'solid 0.5px',
            borderRadius: '10px',
            marginTop: '10px',
            backgroundColor:'white'
          }}
          onClick={searchForRecipe}
        >
          Search For Recipe
        </button>
      </div>

      <div
  className="d-flex flex-wrap justify-content-center"
  style={{ gap: '20px', padding: '20px' }}
>
  {matchedRecipes.map((recipe) => (
    <div
      key={recipe.id}
      className="card"
      style={{
        width: '250px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #f0f0f0',
          margin: '10px auto 15px',
        }}
      >
        <img
          src={recipe.image}
          className="card-img-top"
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="card-body text-center">
        <h5
          className="card-title"
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          {recipe.name}
        </h5>
        <button
          className="btn btn-warning"
          onClick={() => setSelectedRecipe(recipe)}
          style={{
            width: '150px',
            fontSize: '14px',
            fontWeight: '600',
            padding: '10px',
          }}
        >
          View Recipe
        </button>
      </div>
    </div>
  ))}
</div>


      <RecipeModal
        recipe={selectedRecipe}
        onHide={() => setSelectedRecipe(null)}
      />
    </>
  );
};

export default SearchRecipe;

