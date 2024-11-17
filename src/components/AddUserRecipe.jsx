import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { saveUserRecipeAPI } from '../services/allAPI';


const AddUserRecipe = ({onRecipeAdded}) => {

    const [show, setShow] = useState(false);
    const [userRecipe,setUserRecipe]=useState({name:"",ingredients:[],time:"",instructions:"",imgURL:""})
    // console.log(userRecipe);
    
    const handleUploadRecipe= async()=>{
      const {name,ingredients,time,instructions,imgURL}=userRecipe
      if(name,ingredients,time,instructions,imgURL){
      try{
        const result=await saveUserRecipeAPI(userRecipe)
        console.log(result);
        if(result.status>=200 && result.status<=300){
          alert("Recipe added successfully!!!")
          onRecipeAdded()
          handleClose()

        }
        else{
          console.log(result);
        }
        
      }
    catch(err){
      console.log(err);
      
    }}
      else{
        alert('Fill Form Completely')
      }
    }
       
    const [ingredientInput, setIngredientInput] = useState("");  
  

    const setImageDisplay=(value)=>{
      setUserRecipe(value)  
    }

    const addIngredient=(value)=>{
      userRecipe.ingredients.push(value)
      console.log(userRecipe);
      setIngredientInput("");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Name */}
            <h5>Name</h5>
            <input onChange={e=>setUserRecipe({...userRecipe,name:e.target.value})} className='border rounded' style={{width:'450px',height:'40px',padding:'10px',marginBottom:'15px'}} type="text" id='name' placeholder='Enter your Recipe Name'/>
            {/* Ingredients */}
            <h5>Ingredients</h5>
            <div className='d-flex'>
            <  input value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} className='border rounded' style={{width:'400px',height:'40px',padding:'10px',marginBottom:'15px'}} type="text" id='ingredients' placeholder='Enter the ingredients'/>
              <button onClick={(e) => addIngredient(ingredientInput)} className='m-1 border rounded btn btn-success p-1 text-center' style={{width:'50px',height:'30px'}}>Add</button>
            </div>
            {/* Time */}
            <h5>Time in minutes</h5>
            <input onChange={e=>setUserRecipe({...userRecipe,time:e.target.value})} className='border rounded' style={{width:'450px',height:'40px',padding:'10px',marginBottom:'15px'}} type="number" id='time' placeholder='Enter the time required'/>
            {/* Instructions */}
            <h5>Instructions</h5>
            <textarea onChange={e=>setUserRecipe({...userRecipe,instructions:e.target.value})} className='border rounded' style={{width:'450px',height:'120px',padding:'10px',marginBottom:'15px'}} type="textarea" id='instruction' placeholder='Provide Instructions'/>
            {/* Image URL */}
            <h5>Image</h5>
            <input onChange={e=>setImageDisplay({...userRecipe,imgURL:e.target.value})} className='border rounded' style={{width:'450px',height:'40px',padding:'10px',marginBottom:'15px'}} type="text" id='image' placeholder='Provide an image URL'/>

            {/* image display */}
            {/* <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="" width={'250px'}/> */}
            <div className='d-flex'>
            <ul>    
        {userRecipe.ingredients.length>0 &&(
        <h5 style={{marginLeft:'-6%'}}>Ingredients</h5>)}
        {
        userRecipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
            <img className='ms-4' src={userRecipe.imgURL} alt="" width={'250px'}/>
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUploadRecipe}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    <div className='pt-2'><button className='btn btn-warning' onClick={handleShow}>Add Recipe</button></div>
    </>
  )
}

export default AddUserRecipe