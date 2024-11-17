import React, { useState,useEffect } from 'react'
import { addToFavouritesAPI, getAllRecipeAPI } from '../services/allAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FeaturedCards = () => {


  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h4 style={{fontWeight:'800', margin:'30px',fontSize:'40px',color:"red"}}>{clickedRecipe?.name}</h4>
        <Modal.Body style={{display:'flex'}}>
          
          <img src={clickedRecipe?.image} alt="" width={'50%'}/>
          <div className='ms-3'>
             <h3>Ingredients:</h3>
    <ul>
      {clickedRecipe?.ingredients?.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
    <h4>Time : {clickedRecipe.time}</h4>
    <hr />
    <h4>Instructions</h4>
            <p>
              {clickedRecipe?.instructions}
            </p>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-warning' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

    const [featuredRecipe, setFeaturedRecipe]=useState("")
    const [clickedRecipe,setClickedRecipe]=useState("")
    const [modalShow, setModalShow] = React.useState(false);

  useEffect(()=>{
    getAllRecipe()
    
  },[])

  const getAllRecipe=async()=>{
    try{
      const result=await getAllRecipeAPI()
      console.log(result);
      if(result.status>=200 && result.status<300){
        setFeaturedRecipe(result.data)
      }
    }

    catch(err){
      console.log(err);
      
    }
  }

  const viewRecipe=(recipeClicked)=>{
    setModalShow(true)
    setClickedRecipe(recipeClicked)
    console.log(recipeClicked);
  }





  return (
    <>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
  {featuredRecipe?.length > 0 &&
    featuredRecipe?.map((recipe) => (
      <div
        key={recipe.id}
        style={{
          backgroundColor: 'white',
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          margin: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div
          className="pt-2 d-flex justify-content-center align-items-center"
          style={{ marginBottom: '15px' }}
        >
          <div
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #f0f0f0',
            }}
          >
            <img
              src={`${recipe.image}`}
              alt={recipe.name}
              width="250px"
              height="250px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            {recipe.name}
          </h2>
          <button
            className="btn btn-warning"
            onClick={() => viewRecipe(recipe)}
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


    </>
  )
}

export default FeaturedCards