// Select DOM elements
let form = document.querySelector("form");
let input = document.querySelector("input");
let temp = document.querySelector('.temp');
let place = document.querySelector('.time_location p');
let timeDate = document.querySelector('.time_location span');
let conditionText = document.querySelector('.weather_condition span');
let conditionImage = document.querySelector('.weather_condition img');

// Add event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page refresh on form submission

  let value = input.value; // Get input value
  console.log(value);

  // Construct API URL with input value
  let apiUrl = 'http://api.weatherapi.com/v1/current.json?key=882f1adb930a45d7852160114232705&q=' + value + '&aqi=no';

  // Fetch weather data from API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        // Throw error if response is not okay
        throw new Error('Network response was not ok');
      }
      // Parse JSON from response
      return response.json();
    })
    .then(data => {
      // Log data for debugging
      console.log(data);

      // Update DOM elements with fetched data
      temp.innerText = data.current.temp_c;
      place.innerText = data.location.name;
      timeDate.innerText = data.location.localtime;
      conditionText.innerText = data.current.condition.text;

      // Construct image source URL and update image
      let imgSrc = data.current.condition.icon;
      conditionImage.src = "https:" + imgSrc;
    })
    .catch(error => {
      // Handle errors and alert user
      alert("Sorry, for the inconvenience, please try again with a correct name");
      console.error('Error:', error);
    });
});
