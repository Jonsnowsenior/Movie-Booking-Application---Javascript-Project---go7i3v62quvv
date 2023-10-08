
const movieCards = document.getElementsByClassName('movie-card');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup-button');
const popupTitle = document.getElementById('popup-title');
const popupRating = document.getElementById('popup-rating');
const popupLanguage = document.getElementById('popup-language');
const popupDuration = document.getElementById('popup-duration');
const popupGenre = document.getElementById('popup-genre');
const popupOverview = document.getElementById('popup-overview');
const popupImage = document.getElementById('popup-image');
const popupPrice = document.getElementById('popup-price');



// Function to handle sending data and navigating to 'booknow.html'
const sendDataF = () => {
  localStorage.setItem('parameter', movie.title === undefined ? movie.name : movie.title);
  window.location.href = 'booknow.html';
};

// Function to make a fetch request to a given URL and handle errors
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

// Initial URL for fetching movie data
let urltext =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

// Function to fetch movie data and dynamically create movie cards
const fetchMovie = async (urltext) => {
  let movieDataArray;
  const discover = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjdhYzFmOTIzYWQwODhiZTkyYWE1NzViNmI2MjdjZSIsInN1YiI6IjY1MTFlMGZkZThkMGI0MDEwY2U0ODc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Zm22Rjyjgzp7Smqf2zXZfPeUQXcYiSg6TaZigqRHB8',
    },
  };

  console.log(urltext);
  let response = await fetch(urltext, discover);

  movieDataArray = await response.json();

  console.log(movieDataArray.results);

  // Clear child elements from the movie list container
  const oldmovieList = document.querySelector('.movie-list');
  while (oldmovieList.firstChild) {
    oldmovieList.firstChild.remove();
  }

  // Get the container element where you want to render the movie data
  const movieListContainer = document.querySelector('.movie-list');

  // Iterate through the movieDataArray and create HTML elements for each movie
  if (movieDataArray.results.length > 0) {
    movieDataArray.results.forEach((movie) => {
      // Create a div element for each movie
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      // Create an image element for the movie poster
      const posterImage = document.createElement('img');
      posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      posterImage.alt = movie.title;

      // Function to calculate a random runtime for movies
      const runtime = () => {
        const min = 125;
        const max = 150;
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      movie.runtime = runtime(); // Set the runtime property for the movie

      // Create a heading element for the movie title
      const titleHeading = document.createElement('h2');
      titleHeading.textContent = movie.title === undefined ? movie.name : movie.title;

      // Create a paragraph element for the movie overview
      const overviewParagraph = document.createElement('p');
      overviewParagraph.textContent = movie.overview.substring(0, 100);

      // Create a span element for the movie rating
      const rating = document.createElement('span');
      rating.textContent = 'Rating: ' + movie.vote_average;
      rating.classList.add('rating-text');

      // Create a span element for the movie language
      const language = document.createElement('s');
      language.textContent = 'Language: ' + movie.original_language;
      language.classList.add('lang-text');

      // Create a div for displaying movie rating
      const ratingdDiv = document.createElement('div');
      ratingdDiv.classList.add('rating-div');
      ratingdDiv.appendChild(rating);

      // Create a div for displaying movie language
      const langDiv = document.createElement('div');
      langDiv.classList.add('lang-div');
      langDiv.appendChild(language);

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjdhYzFmOTIzYWQwODhiZTkyYWE1NzViNmI2MjdjZSIsInN1YiI6IjY1MTFlMGFmZThkMGI0MDEwY2E0ODc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Zm22Rjyjgzp7Smqf2zXZfPeUQXcYiSg6TaZigqRHB8',
        },
      };

      // Get a reference to the container where you want to add the "Book Now" button
      const bookNowContainervar = document.getElementById('bookNowContainer');

      // Append the elements to the movieCard div
      movieCard.appendChild(posterImage);
      movieCard.appendChild(titleHeading);
      movieCard.appendChild(overviewParagraph);
      movieCard.appendChild(ratingdDiv);
      movieCard.appendChild(langDiv);

      movieCard.addEventListener('click', (cardClick = () => {
        console.log('popup clicked');
        console.log(movie);
        // Display the movie details in the popup
        popupImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        popupImage.alt = movie.title;
        popupTitle.textContent = movie.title === undefined ? movie.name : movie.title;
        popupRating.textContent = `Rating: ${movie.vote_average}`;
        popupLanguage.textContent = `Language: ${movie.original_language}`;
        // Calculate random runtime
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.genres);
            function findObjectById(id) {
              return data.genres.find((item) => item.id === id);
            }
            const searchId = movie.genre_ids[0];
            movie.genre = findObjectById(searchId);
            console.log(movie.genre.name);
            popupGenre.textContent = `Genre: ${movie.genre.name}`;
          })
          .catch((err) => console.error(err));

        popupPrice.textContent = `Price: ${movie.runtime * 2} INR`;
        popupDuration.textContent = `Duration: ${movie.runtime} minutes`;
        popupOverview.textContent = `Overview: ${movie.overview}`; // Replace with the actual overview

        // Show the popup
        popup.style.display = 'block';
        ////////////////////////////////////
        const backdrop = document.getElementById('backdrop');
        backdrop.style.display = 'block';
        //////////////////////////////////
        const bookNowButton = document.getElementById('booknow-button');

        // Append the button to the container
        bookNowButton.addEventListener('click', () => {
          localStorage.setItem('title', movie.title === undefined ? movie.name : movie.title);
          localStorage.setItem('runtime', movie.runtime);
          localStorage.setItem('title', movie.title === undefined ? movie.name : movie.title);
          localStorage.setItem('title', movie.title === undefined ? movie.name : movie.title);
          window.location.href = 'booknow.html';
        });

        // Function to toggle the backdrop's visibility
        function toggleBackdrop() {
          backdrop.style.display = 'none';
          popup.style.display = 'none';
        }

        // Event listener for clicking anywhere on the backdrop
        backdrop.addEventListener('click', toggleBackdrop);
        ////////////////////////////
      }));

      closePopupButton.addEventListener('click', () => {
        // Close the popup when the close button is clicked
        popup.style.display = 'none';
      });

      // Append the movieCard to the movie list container
      if (movie.poster_path != null) {
        movieListContainer.appendChild(movieCard);
      }
    });
  } else {
    const noresult = document.createElement('h2');
    noresult.textContent = 'no result';
    noresult.classList.add('no-result');
    movieListContainer.appendChild(noresult);
  }
};

// Initial fetch to load movie data
fetchMovie(urltext);

// Function to handle click on a specific movie genre
const onClickHandler = (event) => {
  console.log(event.target.id);
  // Update the URL based on the clicked genre and fetch relevant movie data
  urltext = `https://api.themoviedb.org/3/search/collection?query=${event.target.id}&include_adult=false&;language=en-US&page=1  `;
  console.log(urltext);
  fetchMovie(urltext);
};

// Function to load all movies when the "Load All" button is clicked
const loadAll = (event) => {
  urltext =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  fetchMovie(urltext);
};

// Function to handle form submission when searching for movies
const onSubmitHandler = (event) => {
  const queryText = document.getElementById('search-input');
  urltext = `https://api.themoviedb.org/3/search/collection?query=${queryText.value}&include_adult=false&;language=en-US&page=1  `;
  console.log(urltext);
  fetchMovie(urltext);
};

// Add an event listener to the search input for detecting Enter key press
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', function (event) {
  // Check if the "Enter" key (key code 13) was pressed
  if (event.keyCode === 13) {
    // Prevent the default form submission behavior
    event.preventDefault();
    urltext = `https://api.themoviedb.org/3/search/collection?query=${searchInput.value}&include_adult=false&;language=en-US&page=1  `;
    console.log(urltext);
    fetchMovie(urltext);
  }
});

// Function to handle a click on the "Book Now" button in the popup
const sendDataButton = document.getElementById('booknow-button');
