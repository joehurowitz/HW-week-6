var animals = ["Cat","Dog","Horse"];

		function displayAnimalInfo(){

		var animal = $(this).attr("data-name");
		//console.log(animal);

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal+ "&api_key=dc6zaTOxFJmzC&limit=10";
	

			
        $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
      		console.log(response);

      	
        for(var i=0; i<response.data.length; i++){
		
      	var animalDiv = $("<div class='animalDiv'>");

        var animalImage = $("<img>");
      	animalDiv.html("<p> Rating " +response.data[i].rating + "</p>");
        animalImage.attr("src",response.data[i].images.original_still.url);
        animalImage.attr("data-still",response.data[i].images.original_still.url);
        animalImage.attr("data-animate",response.data[i].images.original.url);     
      	animalImage.attr("data-state","still");
        animalDiv.append(animalImage);
      	$("#animals").prepend(animalDiv);
    }
      });

}
      function renderButtons() {
 
        
         $("#animalButtons").empty();
 
         
         for (var i = 0; i < animals.length; i++) {
 
           // Then dynamicaly generating buttons for each item in the array
           // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
           var a = $("<button>");
           // Adding a class of movie to our button
           a.addClass("animal");
           // Adding a data-attribute
           a.attr("data-name", animals[i]);
           // Providing the initial button text
           a.text(animals[i]);
           // Adding the button to the buttons-view div
           $("#animalButtons").append(a);
         }
       }

       function changeState(gif){
        var state = gif.attr("data-state");
        if(state === "still"){
          gif.attr("src",gif.attr("data-animate"));
          gif.attr("data-state","animate");
                             }
        else {
          gif.attr("src", gif.attr("data-still"));
          gif.attr("data-state", "still");
              }
       }


       $("#add-animal").on("click", function(event) {
         event.preventDefault();
         
         animal = $("#animal-input").val().trim();
 
       
         animals.push(animal);
 	
         renderButtons();
      
       });


       $("#animals").on("click",'img',function(){
          changeState($(this));
       });

      

	 $(document).on("click", ".animal", displayAnimalInfo);
 
       // Calling the renderButtons function to display the intial buttons
       renderButtons();
       

