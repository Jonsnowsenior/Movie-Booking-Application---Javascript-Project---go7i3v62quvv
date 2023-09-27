







    function fetchData(url) {
        
        return fetch(url)
            .then((response) => {
                // Check if the response status is OK (200)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON response and return it
                return response.json();
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Fetch error:', error);
                throw error; // Rethrow the error for further handling
            });
    }
    
    
        
let urltext = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
         const fetchMovie = async (urltext) =>{
            
            let movieDataArray ;
            const discover = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjdhYzFmOTIzYWQwODhiZTkyYWE1NzViNmI2MjdjZSIsInN1YiI6IjY1MTFlMGZkZThkMGI0MDEwY2U0ODc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Zm22Rjyjgzp7Smqf2zXZfPeUQXcYiSg6TaZigqRHB8'
                }
              };

                console.log(urltext);
            let response = await fetch(urltext, discover)

            movieDataArray =  await response.json();
           


           
              console.log(movieDataArray.results)
              
                



//clear child element 

const oldmovieList = document.querySelector(".movie-list");
while (oldmovieList.firstChild) {
  oldmovieList.firstChild.remove();
}


                // Get the container element where you want to render the movie data
const movieListContainer = document.querySelector(".movie-list");

// Iterate through the movieDataArray and create HTML elements for each movie
if(movieDataArray.results.length > 0){
movieDataArray.results.forEach((movie) => {
  // Create a div element for each movie
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // Create an image element for the movie poster
  const posterImage = document.createElement("img");
  posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  posterImage.alt = movie.title;

  
  // Create a heading element for the movie title
  const titleHeading = document.createElement("h2");
  titleHeading.textContent = movie.title;

  // Create a paragraph element for the movie overview
  const overviewParagraph = document.createElement("p");
  overviewParagraph.textContent = movie.overview.substring(0,100);

  const rating = document.createElement("span");
  rating.textContent = "Rating: " + movie.vote_average ;
  rating.classList.add('rating-text');

  const language = document.createElement("s");
  language.textContent = "Language: "+ movie.original_language;
language.classList.add('lang-text');  

//create rating div
const ratingdDiv = document.createElement('div')
ratingdDiv.classList.add('rating-div');
ratingdDiv.appendChild(rating);


//create lang div
const langDiv = document.createElement('div')
langDiv.classList.add('lang-div');
langDiv.appendChild(language);

const bookNowButton = document.createElement("button");
  bookNowButton.textContent = "Book Now";

  // Set attributes for the button (optional)
  bookNowButton.id = "bookNowButton";
  bookNowButton.className = "book-now-btn"; // You can add a CSS class for styling

  // Define the function to execute when the button is clicked
  bookNowButton.addEventListener("click", function() {
    // Replace this with the URL of your booking page
    var bookingURL = "http://127.0.0.1:5500/booknow.html";

    // Open the booking page in a new tab or window
    window.open(bookingURL, "_blank");
  });

  // Get a reference to the container where you want to add the button
  constbookNowContainervar  = document.getElementById("bookNowContainer");

  // Append the button to the container
  

  // Get a reference to the container

  // Append the elements to the movieCard div
  
  movieCard.appendChild(posterImage);
  movieCard.appendChild(titleHeading);
  movieCard.appendChild(overviewParagraph);
  movieCard.appendChild(ratingdDiv);
  movieCard.appendChild(langDiv);
  movieCard.appendChild(bookNowButton);

  

  // Append the movieCard to the movie list container
  if(movie.poster_path != null){
    movieListContainer.appendChild(movieCard);
  }

});;
}else{
  const noresult = document.createElement('h2')
  noresult.textContent = "no result"
  noresult.classList.add('no-result');
  movieListContainer.appendChild(noresult)
}

         }


         fetchMovie(urltext);


  const onClickHandler = (event) => {

    console.log(event.target.id)
    urltext = `https://api.themoviedb.org/3/search/collection?query=${event.target.id}&include_adult=false&;language=en-US&page=1  `
    console.log(urltext)
    fetchMovie(urltext);
  }

  const loadAll = (event) => {
    urltext = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
        
            
    fetchMovie(urltext);
  }


  const onSubmitHandler = (event) => {
   const queryText = document.getElementById('search-input')
  
   urltext = `https://api.themoviedb.org/3/search/collection?query=${queryText.value}&include_adult=false&;language=en-US&page=1  `
   console.log(urltext)
   fetchMovie(urltext);
  }

const searchInput = document.getElementById('search-input')
  searchInput.addEventListener("keydown", function(event) {
    // Check if the "Enter" key (key code 13) was pressed
    if (event.keyCode === 13) {
        // Prevent the default form submission behavior
        event.preventDefault();
        urltext = `https://api.themoviedb.org/3/search/collection?query=${searchInput.value}&include_adult=false&;language=en-US&page=1  `
   console.log(urltext)
   fetchMovie(urltext);
    }
});

    