console.log("Js file added");

// search by name

function searchByName() {
  console.log("search by name function called");

//   making body and main clear
  document.getElementById("body-content").innerHTML = "";
  document.getElementById("main").innerHTML = "";

//   making http request
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
    // response meals

    if (resJson.meals == null) {
      document.getElementById("main").innerHTML = `
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
 
        `;
      window.scrollTo(0, 0);
      return;
    }
    // manipulate dom
    let startingString = `
        <section class="text-gray-600 body-font ">
        <div class="container px-5 py-12 mx-auto">


            <!-- latest meal heading -->
            <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"> Meals</h1>
                <div class="h-1 w-20 bg-indigo-500 rounded"></div>

                <!-- <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon
                    brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p> -->
            </div>

            <!-- latest meal cards -->
            <div class="flex flex-wrap -m-4 justify-around" id="latest-meal-cards">

            `;

    let middleString = "";
    for (let i = 0; i < resJson.meals.length; i++) {

      middleString += `
                    
                <!-- meal details come from api request -->
                <!-- id denote to meal id -->
                <div class="xl:w-1/4 md:w-1/2 p-4" >
                    <div class="bg-gray-100 p-3 rounded-lg">
                        <img class="h-40 rounded w-full object-cover object-center mb-6"
                            src="${resJson.meals[i].strMealThumb}" alt="content" id="${resJson.meals[i].idMeal}" onclick="searchById(this);">

                        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>
                    </div>

                </div>


                `;
    }

    let lastString = `
               
                </div>
            </div>
        </section>



        `;

    document.getElementById("body-content").innerHTML = "";

    document.getElementById("main").innerHTML = startingString + middleString + lastString;

  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // indian meals search by area name

  let meal = document.getElementById("search-box").value;
  console.log(meal);

  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

// fetch data for latest meal section
function latestMealCards() {
  console.log("latest meal card function called");

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
  
    // manipulate dom
    let cardParent = document.getElementById("latest-meal-cards");

    for (let i = 0; i < 8; i++) {
      cardParent.innerHTML += `
            <div class="xl:w-1/4 md:w-1/2 p-4">
                <div class="bg-gray-100 p-3 rounded-lg">
                    <img class="h-40 rounded w-full object-cover object-center mb-6"
                        src="${resJson.meals[i].strMealThumb}" alt="content" id="${resJson.meals[i].idMeal}" onclick="searchById(this);">
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>
                   
                </div>

            </div>
            `;
    }
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // indian meals search by area name
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=indian`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

// fetch data for popular ingradients section
function popularIngradients() {
  console.log("Popular ingradients function called");

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
   
    // manipulate dom
    let cardParent = document.getElementById("popular-ingradients");

    for (let i = 0; i < 8; i++) {
      cardParent.innerHTML += `
            <div class="xl:w-1/4 md:w-1/2 p-4">
                <div class="bg-gray-100 p-3 rounded-lg">
                    <img class="h-40 rounded w-full object-cover object-center mb-6"
                        src="https://www.themealdb.com/images/ingredients/${resJson.meals[i].strIngredient}.png" alt="content" id="${resJson.meals[i].strIngredient}" onclick="searctByIngredients(this);">
                    <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">${resJson.meals[i].strIngredient}</h3>
                
                </div>

            </div>
            `;
    }
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // fetch ingradients list
  let url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

// fetch data for random meal section
function randomMeal1() {
  console.log("Random Meal function called");

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
  
    // manipulate dom
    let cardParent = document.getElementById("random-meal");

    cardParent.innerHTML += `
        <div class="xl:w-1/4 md:w-1/2 p-4">
            <div class="bg-gray-100 p-3 rounded-lg">
                <img class="h-40 rounded w-full object-cover object-center mb-6"
                    src="${resJson.meals[0].strMealThumb}" alt="content" id="${resJson.meals[0].idMeal}" onclick="searchById(this);">
                <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">${resJson.meals[0].strCategory}</h3>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[0].strMeal}</h2>
            
            </div>

        </div>


        `;
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // fetch random one meal
  let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

function randomMeal() {
  for (let i = 0; i < 8; i++) {
    randomMeal1();
  }
}

function searchByCountry(e) {
  console.log(e.id);

//   making body-content and main clear
  document.getElementById("body-content").innerHTML = "";
  document.getElementById("main").innerHTML = "";

  console.log("Search by Area function called");

//   making http request
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
 
    // manipulate dom
    // if result is null
    if (resJson.meals == null) {
      document.getElementById("main").innerHTML = `
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
 
        `;
      window.scrollTo(0, 0);
      return;
    }

    let startingString = `
        <section class="text-gray-600 body-font ">
        <div class="container px-5 py-12 mx-auto">


            <!-- latest meal heading -->
            <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">${e.id} Meals</h1>
                <div class="h-1 w-20 bg-indigo-500 rounded"></div>

                <!-- <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon
                    brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p> -->
            </div>

            <!-- latest meal cards -->
            <div class="flex flex-wrap -m-4 justify-around" id="latest-meal-cards">

            `;

    let middleString = "";
    for (let i = 0; i < resJson.meals.length; i++) {

      middleString += `
                    
                <!-- meal details come from api request -->
                <!-- id denote to meal id -->
                <div class="xl:w-1/4 md:w-1/2 p-4" >
                    <div class="bg-gray-100 p-3 rounded-lg">
                        <img class="h-40 rounded w-full object-cover object-center mb-6"
                            src="${resJson.meals[i].strMealThumb}" alt="content" id="${resJson.meals[i].idMeal}" onclick="searchById(this);">

                        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>
                    </div>

                </div>


                `;
    }

    let lastString = `
               
                </div>
            </div>
        </section>



        `;

    document.getElementById("body-content").innerHTML = "";
    document.getElementById("main").innerHTML = startingString + middleString + lastString;
    window.scrollTo(0, 0);
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // fetch one meal by country name
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.id}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

function searchByFirstLetter(e) {
  event.preventDefault();

  console.log(e);
  console.log(e.innerHTML);

  console.log("Search by first letter function called");

//   making http request
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
   
    // manipulate dom
    document.getElementById("body-content").innerHTML = "";
    document.getElementById("main").innerHTML = "";

    if (resJson.meals == null) {
      document.getElementById("main").innerHTML = `
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
 
        `;
      window.scrollTo(0, 0);
      return;
    }

    let startingString = `
    
    <section class="text-gray-600 body-font ">
        <div class="container px-5 py-12 mx-auto">


            <!-- latest meal heading -->
            <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Meals with first Letter "${e.innerHTML}"</h1>
                <div class="h-1 w-20 bg-indigo-500 rounded"></div>

                
            </div>

            <!-- latest meal cards -->
            <div class="flex flex-wrap -m-4 justify-around" id="latest-meal-cards">


            `;

    let middleString = "";
    for (let i = 0; i < resJson.meals.length; i++) {
      middleString += `
                <!-- meal details come from api request -->
                <!-- id denote to meal id -->
                <div class="xl:w-1/4 md:w-1/2 p-4" id="${resJson.meals[i].idMeal}">
                    <div class="bg-gray-100 p-3 rounded-lg">
                    <img class="h-40 rounded w-full object-cover object-center mb-6"
                                src="${resJson.meals[i].strMealThumb}" alt="content" id="${resJson.meals[i].idMeal}" onclick="searchById(this);">
                                <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">${resJson.meals[i].strCategory}</h3>
                                
                                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>
                        </div>
                            
                    </div>
                    
                    `;
    }
    let lastString = `

                
                    </div>

                </div>
            </section>

            `;

    document.getElementById("body-content").innerHTML = "";
    document.getElementById("main").innerHTML = startingString + middleString + lastString;
    window.scrollTo(0, 0);
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // fetch one meal by country name
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${e.innerHTML}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

function searchById(e) {
  console.log(e.id);
  console.log("Search by meal ID letter function called");

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
  
    document.getElementById("main").innerHTML = "";

    if (resJson.meals == null) {
      document.getElementById("main").innerHTML = `
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
 
        `;
      window.scrollTo(0, 0);
      return;
    }

    localStorage.setItem("mealDetails", JSON.stringify(resJson));
    location.href = "/mealDetails.html";
  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // fetch one meal by country name
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${e.id}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}

function update() {
  let temp = localStorage.getItem("mealDetails");
  // console.log('temp vlaue', temp);
  let resJson = JSON.parse(temp);


//   if result is null
  if (resJson.meals == null) {
    document.getElementById("main").innerHTML = `
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
 
        `;
    window.scrollTo(0, 0);
    return;
  }

  console.log(resJson.meals);

//   create 8 variable to store 8 ingredient data to display on screen
  let ingredient1 = "";
  let ingredient2 = "";
  let ingredient3 = "";
  let ingredient4 = "";
  let ingredient5 = "";
  let ingredient6 = "";
  let ingredient7 = "";
  let ingredient8 = "";

  // check from fav list and then update isFav
  let isFav = false;

  let listRes = JSON.parse(localStorage.getItem("favMeals"));
 

//   checking this meal is favorite or not
  const indexOfObject = listRes.meals.findIndex((object) => {

    if (object.idMeal === resJson.meals[0].idMeal) {
      isFav = true;
      return;
    }
  });

//   changing heart icon to favorite or not
  let heart = `<i class="far fa-heart"id="favorite0" onclick="toggleFav(this);
    "></i>`;
  if (isFav) {
    heart = `<i class="fas fa fa-heart"id="favorite1" onclick="toggleFav(this);"></i>`;
  }


//   breaking content in 3 parts and then add then in one to change dom
  let startingString = `
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-12 mx-auto flex flex-wrap flex-col">

            <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"> <span id="strMeal">${resJson.meals[0].strMeal}</span> ${heart} </h1>

                

                <div class="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>


            
            <img class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded" alt="hero" src="${resJson.meals[0].strMealThumb}" id="${resJson.meals[0].idMeal}" onclick="searchById(this);">
            
            <div class="flex flex-col text-center w-full">
                <h1 class="text-xl font-medium title-font mb-4 text-gray-900">How to Cook</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-justify">${resJson.meals[0].strInstructions}</p>
            </div>
            </div>
        </section>






        <!-- ingredients -->
        <section class="text-gray-600 body-font my-10">

            <div class="container px-5 mx-auto">
                <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">${resJson.meals[0].strMeal} Ingredients</h1>
                    <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                </div>

                <div class="flex justify-around flex-wrap -m-4">


       
                `;



        // fetching 8 ingradients value 

  if (
    resJson.meals[0].strIngredient1 != null &&
    resJson.meals[0].strIngredient1 != ""
  ) {
    ingredient1 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient1}.png" id="${resJson.meals[0].strIngredient1}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient1}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure1}</p>
                        </div>
                    </div>`;
  }
  if (
    resJson.meals[0].strIngredient2 != null &&
    resJson.meals[0].strIngredient2 != ""
  ) {
    ingredient2 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient2}.png" id="${resJson.meals[0].strIngredient2}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient2}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure2}</p>
                        </div>
                    </div>`;
  }
  if (
    resJson.meals[0].strIngredient3 != null &&
    resJson.meals[0].strIngredient3 != ""
  ) {
    ingredient3 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient3}.png" id="${resJson.meals[0].strIngredient3}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient3}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure3}</p>
                        </div>
                    </div>`;
  }

  if (
    resJson.meals[0].strIngredient4 != null &&
    resJson.meals[0].strIngredient4 != ""
  ) {
    ingredient4 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient4}.png"  id="${resJson.meals[0].strIngredient4}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient4}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure4}</p>
                        </div>
                    </div>`;
  }

  if (
    resJson.meals[0].strIngredient5 != null &&
    resJson.meals[0].strIngredient5 != ""
  ) {
    ingredient5 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient5}.png" id="${resJson.meals[0].strIngredient5}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient5}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure5}</p>
                        </div>
                    </div>`;
  }

  if (
    resJson.meals[0].strIngredient6 != null &&
    resJson.meals[0].strIngredient6 != ""
  ) {
    ingredient6 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient6}.png" id="${resJson.meals[0].strIngredient6}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient6}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure6}</p>
                        </div>
                    </div>`;
  }

  if (
    resJson.meals[0].strIngredient7 != null &&
    resJson.meals[0].strIngredient7 != ""
  ) {
    ingredient7 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient7}.png" id="${resJson.meals[0].strIngredient7}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient7}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure7}</p>
                        </div>
                    </div>`;
  }

  if (
    resJson.meals[0].strIngredient8 != null &&
    resJson.meals[0].strIngredient8 != ""
  ) {
    ingredient8 = `  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                                src="https://www.themealdb.com/images/ingredients/${resJson.meals[0].strIngredient8}.png" id="${resJson.meals[0].strIngredient8}" onclick="searctByIngredients(this);">
                        </a>
                        <div class="mt-4 text-center">

                            <h2 class="text-gray-900 title-font text-lg font-medium">${resJson.meals[0].strIngredient8}</h2>
                            <p class="mt-1">${resJson.meals[0].strMeasure8}</p>
                        </div>
                    </div>`;
  }

 

  let lastString = `
                
                
                </div>
            </div>
        </section>
        `;

  // manipulate dom
  let main = document.getElementById("main");

  main.innerHTML =
    startingString +
    ingredient1 +
    ingredient2 +
    ingredient3 +
    ingredient4 +
    ingredient5 +
    ingredient6 +
    ingredient7 +
    ingredient8 +
    lastString;

}

// to display all fav meal to favmeal page
function favoriteMeals() {

 //get list of all favorite meals from local storage
  let resJson = JSON.parse(localStorage.getItem("favMeals"));

//   if there is no favoriteMeals display alert and return from this function
  if (resJson.meals.length == 1) {
    document.getElementById("latest-meal-cards").innerHTML += `
        <h2 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h2>
        
        `;
    swal("Oops!", "No Meal Found!", "warning");
    return;
  }
  let string = "";

  for (let i = 1; i < resJson.meals.length; i++) {
    string += `
        <div class="xl:w-1/4 md:w-1/2 p-4">
            <div class="bg-gray-100 p-3 rounded-lg">
                <img class="h-40 rounded w-full object-cover object-center mb-6"
                    src="${resJson.meals[i].strMealThumb}" alt="content"
                    id="${resJson.meals[i].idMeal}" onclick="searchById(this);">
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>

            </div>

        </div> 
        `;
  }

  document.getElementById("latest-meal-cards").innerHTML = string;
}

// to toggle favoriteMeals from list
function toggleFav(e) {
  // add to list
  console.log("Toggle Fav Called.");

//   if current meal is not favorite meal
  if (e.id == "favorite0") {

    let mealName = document.getElementById("strMeal").innerText;
    let mealId = document.getElementsByTagName("img")[0].id;
    let mealImg = document.getElementsByTagName("img")[0].src;

   
    let mealList = JSON.parse(localStorage.getItem("favMeals"));

    // add to result array and set updated value to local storage
    console.log("->", mealList);
    console.log(mealList.meals[0].idMeal);
    mealList.meals.push({
      idMeal: mealId,
      strMeal: mealName,
      strMealThumb: mealImg,
    });
    console.log(mealList.meals);

    localStorage.setItem("favMeals", JSON.stringify(mealList));
    swal(
      "Congratulations!",
      "Successfully Added to Favorites!",
      "success"
    ).then(() => {
      location.reload();
    });
  }
  // remove from list
  else {
    let mealName = document.getElementById("strMeal").innerText;
    let mealId = document.getElementsByTagName("img")[0].id;
    let mealImg = document.getElementsByTagName("img")[0].src;

    
    let mealList = JSON.parse(localStorage.getItem("favMeals"));

    // removing
    const indexOfObject = mealList.meals.findIndex((object) => {
      return object.idMeal === mealId;
    });

    console.log(indexOfObject);

    mealList.meals.splice(indexOfObject, 1);

    console.log(mealList.meals);

    localStorage.setItem("favMeals", JSON.stringify(mealList));
    swal(
      "Congratulations!",
      "Successfully Removed From Favorites!",
      "error"
    ).then(() => {
      location.reload();
    });
  }

}

// for the first time to setup favMeals local storage schema
if (localStorage.getItem("favMeals") == null) {
  localStorage.setItem(
    "favMeals",
    JSON.stringify({
      meals: [
        {
          idMeal: 0,
          strMeal: "Test meal name",
          strMealThumb:
            "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
        },
      ],
    })
  );
}


// search by ingredient
function searctByIngredients(e) {
  console.log(e.id);

  // document.getElementById("body-content").innerHTML = "";
  document.getElementById("main").innerHTML = "";

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    console.log("rquest successfull fetched");
    var resJson = JSON.parse(xhrRequest.response);
    // response meals

    if (resJson.meals == null) {
      document.getElementById("main").innerHTML = `
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center">Oops! No Meal Found.</h1>
   
          `;
      window.scrollTo(0, 0);
      return;
    }

    console.log(resJson.meals);

    // manipulate dom
    let startingString = `
          <section class="text-gray-600 body-font ">
          <div class="container px-5 py-12 mx-auto">
  
  
              <!-- latest meal heading -->
              <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                  <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">${e.id} in Meals</h1>
                  <div class="h-1 w-20 bg-indigo-500 rounded"></div>
  
                  <!-- <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon
                      brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p> -->
              </div>
  
              <!-- latest meal cards -->
              <div class="flex flex-wrap -m-4 justify-around" id="latest-meal-cards">
  
              `;

    let middleString = "";
    for (let i = 0; i < resJson.meals.length; i++) {

      middleString += `
                      
                  <!-- meal details come from api request -->
                  <!-- id denote to meal id -->
                  <div class="xl:w-1/4 md:w-1/2 p-4" >
                      <div class="bg-gray-100 p-3 rounded-lg">
                          <img class="h-40 rounded w-full object-cover object-center mb-6"
                              src="${resJson.meals[i].strMealThumb}" alt="content" id="${resJson.meals[i].idMeal}" onclick="searchById(this);">
  
                          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${resJson.meals[i].strMeal}</h2>
                      </div>
  
                  </div>
  
  
                  `;
    }

    let lastString = `
                 
                  </div>
              </div>
          </section>
  
  
  
          `;

    document.getElementById("main").innerHTML =
      startingString + middleString + lastString;
    window.scrollTo(0, 0);

  };

  xhrRequest.onerror = function () {
    console.log("http request error occurs");
  };

  // serach by ingredient
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.id}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
}




