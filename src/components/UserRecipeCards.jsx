import React, { useState, useEffect } from 'react';
import { getAllUserRecipeAPI, removeUserRecipeAPI } from '../services/allAPI';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddUserRecipe from './AddUserRecipe';

const UserRecipeCards = () => {
  const [userRecipe, setUserRecipe] = useState([]);
  const [clickedRecipe, setClickedRecipe] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  // Fetch user recipes
  const getAllUserRecipe = async () => {
    try {
      const result = await getAllUserRecipeAPI();
      if (result.status >= 200 && result.status < 300) {
        setUserRecipe(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete a user recipe
  const deleteUserRecipe = async (id) => {
    try {
      await removeUserRecipeAPI(id);
      getAllUserRecipe(); // Refresh data after deletion
    } catch (err) {
      console.log(err);
    }
  };

  const viewRecipe = (recipeClicked) => {
    setClickedRecipe(recipeClicked);
    setModalShow(true);
  };

  // Fetch recipes on initial render
  useEffect(() => {
    getAllUserRecipe();
  }, []);

  const MyVerticallyCenteredModal = (props) => (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      {clickedRecipe && (
        <>
          <h4 style={{ fontWeight: '800', margin: '30px', fontSize: '40px', color: 'red' }}>
            {clickedRecipe.name}
          </h4>
          <Modal.Body style={{ display: 'flex' }}>
            <img src={clickedRecipe.imgURL} alt="" width={'350px'} height={'420px'} />
            <div className="ms-3">
              <h3>Ingredients:</h3>
              <ul>
                {clickedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h4>Time: {clickedRecipe.time}</h4>
              <hr />
              <h4>Instructions</h4>
              <p>{clickedRecipe.instructions}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-warning" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );

  return (
    <>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

      <div style={{ display: 'flex' }} className="m-5">
        <h1 style={{ fontWeight: '700', width: '280px', height: '50px' }} className="text-danger">
          Your Recipes
        </h1>
        <AddUserRecipe onRecipeAdded={getAllUserRecipe} />
      </div>

      <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
  }}
>
  {userRecipe.length > 0 &&
    userRecipe.map((recipe) => (
      <div
        key={recipe.id}
        style={{
          backgroundColor: 'white',
          width: '250px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #f0f0f0',
            margin: '15px auto',
          }}
        >
          <img
            src={recipe.imgURL}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div
          className="p-3 d-flex flex-column justify-content-center align-items-center"
          style={{ textAlign: 'center' }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            {recipe.name}
          </h2>
          <div>
            <button
              className="btn btn-warning m-1"
              onClick={() => viewRecipe(recipe)}
              style={{
                width: '120px',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              View Recipe
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteUserRecipe(recipe.id)}
              style={{
                width: '120px',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    ))}
</div>

    </>
  );
};

export default UserRecipeCards;
