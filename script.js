let Form = document.querySelector('.form');
let input = document.querySelector('input');
let mainDisplay = document.querySelector('.recipe-body');
let error = document.querySelector('.error')
let searchResult = '';

const APP_ID = '9e16d1ea';
const APP_KEY ='ddad918f299570dabc32e98ab9dfd1e5';


// add event listener to form

Form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    searchResult = input.value;
    
    console.log(searchResult)
    //fetch ur api data
    fetchData();
    input.value =''
}

async function fetchData() {
const appUrl = `https://api.edamam.com/search?q=${searchResult}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;

    const response = await fetch(appUrl);
    const data = await response.json();
    if(data.hits.length > 0){
        displayRecipes(data.hits)
       
    }
    error.style.visibility = 'visible';
    
   
    console.log(data)
}

function displayRecipes(results) { 
    let recipeGrid ='';
    results.map((item) => {
        recipeGrid +=
        `<div class="recipe">
        <img src="${item.recipe.image}" alt="${item.recipe.label}">
       <div class='recipe-head'>
       <h3>${item.recipe.label}</h3>
      <a href='${item.recipe.url}' target='_blank' class='btn'>details</a>
       </div>
       <p>mealType: ${item.recipe.mealType?item.recipe.mealType : 'not found' }</p>
       <p>totalWeight: ${item.recipe.totalWeight.toFixed(2)}</p>
    </div>
        `
    })
    mainDisplay.innerHTML = recipeGrid;
}