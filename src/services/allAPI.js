import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

export const getAllRecipeAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/recipes`,{})
}

export const saveUserRecipeAPI = async (recipeDetails)=>{
    return await commonAPI("POST",`${serverURL}/userRecipe`,recipeDetails)
}

export const getAllUserRecipeAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/userRecipe`,{})
}

export const removeUserRecipeAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/userRecipe/${id}`,{})
}

export const addToFavouritesAPI = async (recipeDetails)=>{
    return await commonAPI("POST",`${serverURL}/favourites`,recipeDetails)
}