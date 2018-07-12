/*
  Please add all Javascript code to this file.
*/


var source1 = 'https://newsapi.org/v2/top-headlines?sources=wired&apiKey=fa7d3f49f100411a9a4e6d2715336428';
var source2 = 'https://newsapi.org/v2/top-headlines?sources=nhl-news&apiKey=fa7d3f49f100411a9a4e6d2715336428';
var source3 = 'https://newsapi.org/v2/top-headlines?sources=entertainment-weekly&apiKey=fa7d3f49f100411a9a4e6d2715336428';



$( document ).ready(function() {
	$("#popUp").addClass( "source1" )
	$("header").css("background-color", "#000");
	var api_url = source1;
	aJ(api_url);
});


 $( "#Feedr" ).click(function() {
	$("#popUp").removeClass();
	$("#popUp").addClass( "source1" )
	$("header").css("background-color", "#000");
	var api_url = source1;
	aJ(api_url);

});

 $( ".closePopUp" ).click(function() {

	$("#popUp").addClass('hidden');
});

 $( "img" ).click(function() {

	$("#search").toggleClass('active');
});

$("#search").on('keyup', function (e) {
    if (e.keyCode == 13) {
        $("#search").toggleClass('active');
    }
});

 $( "li" ).click(function() {

var apiSelect = $(this).attr("id")
		
		var api = apiSelect
		switch (api) {
		case 'source1':
		$("#popUp").removeClass();
		$( "article" ).remove( ".article" );
		$("header").css("background-color", "#000");
		$("#popUp").addClass( "source1" )
		var api_url = source1;
		break;
		case 'source2':
		var api_url = source2;
		$("#popUp").removeClass();
		$( "article" ).remove( ".article" );
		$("header").css("background-color", "#c1c5cc");
		$("#popUp").addClass( "source2" )
		break;
		case 'source3':
		var api_url = source3;
		$("#popUp").removeClass();
		$( "article" ).remove( ".article" );
		$("header").css("background-color", "#4286f4");
		$("#popUp").addClass( "source3" )
		break;
		};	 
	
	
	aJ(api_url);


	
	
});

function aJ (api_url) {$.ajax({
url: api_url,
    method: "GET",
    data: { 
      a: "a"
	}})
  .done(function(data) {
    console.log('success callback 1', data) 
	object = data
	storyWipe(object);
	

  })
  .fail(function(xhr) {
    alert('error', xhr);
	
  });

}
 
 
function storyWipe(object){ 

  $("#popUp").removeClass( "hidden" )
   
	setTimeout(function (){
		$("#popUp").addClass( "hidden" )

	setTimeout(function (){
		
		$( "article" ).remove( ".article" );
		
		loopArticles(object);
		
		
	},100);
	
	},1000);
	
};
 
function modalPop(storyID){
	$("#popUp").removeClass();
	var title = object.articles[storyID].title
	var description = object.articles[storyID].description
	var storyURL = object.articles[storyID].url
$("#popUp").html(` <a href="#" class="closePopUp">X</a>
          <div class="container">
            <h1>${title}</h1>
            <p>
              ${description}
            </p>
<a href="${storyURL}" class="popUpAction" target="_blank">Read more from source</a>
          </div>`);
	 $( ".closePopUp" ).click(function() {
  $("#popUp").addClass( "hidden" )});
	  
  };
  

function loopArticles(object){
	
	
	var objLength = Object.keys(object.articles).length;
	console.log(objLength);
	console.log(object);
		for (var i = 0; i < objLength; i++) {
			
    
	storyFunc(i, object);

}

function storyFunc(i, object){
		const objLoop = object.articles[i]
		var hiDate = new Date(objLoop.publishedAt);
		var realDate = hiDate.getMonth() + '/' + hiDate.getDate() + '/' + hiDate.getFullYear(); + ' -' + hiDate.getHours(); + '/' + hiDate.getMinutes();
		console.log(objLoop.title)
$("#main").append(`<article class="article" >
            <section class="featuredImage">
              <img src="${objLoop.urlToImage}" alt="" />
            </section>
            <section class="articleContent" data-id="${i}">
                <a href="#" class="popClick"><h3>${objLoop.title}</h3></a>
                <h6>${objLoop.author}</h6>
            </section>
            <section class="impressions">
			  ${realDate}          
            </section>
            <div class="clearfix"></div>
          </article>`);
		  
 $( ".articleContent" ).click(function() {
  $("#popUp").removeClass( "hidden" )
  setTimeout(function (){$("#popUp").removeClass( "loader" )},1000);
	var storyID = $(this).attr("data-id")

	modalPop(storyID);
});		  
	

	
}





};


