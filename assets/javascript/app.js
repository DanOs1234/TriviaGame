var firstQuestion = 
{
	'questionNumber': 1,
	'timeRemaining': 30,
	'questionScript': "How many Super Bowls has Tom Brady won?",
	'potentialAnswers':
	[
	'Three',
	'Four',
	'Five',
	'None'
	],
	"correctAnswer":'Five',
	
	img:src="assets/images/tombradyrings.jpg",
}
var secondQuestion = 
{
	'questionNumber': 2,
	'timeRemaining': 30,
	'questionScript': "How many Super Bowls has Tom Brady played in?",
	'potentialAnswers':
	[
	'None',
	'Four',
	'Six',
	'Eight'
	],
	"correctAnswer":'Eight',
	
	img:src = "assets/images/eightsuperbowls.jpg",
}
var thirdQuestion = 
	{
	'questionNumber': 3,
	'timeRemaining': 30,
	'questionScript': "How many Super Bowl MVP's has Tom Brady won?",
	'potentialAnswers':
	[
		'Two',
		'None',
		'Four',
		'One'
	],
	"correctAnswer":'Four',
	img:src = "assets/images/mvptrophy.jpg",
}
var forthQuestion= 
	{
	'questionNumber': 4,
	'timeRemaining': 30,
	'questionScript': "What number does Tom Brady wear?",
	'potentialAnswers':
	[
		'Eleven',
		'Seven',
		'Ten',
		'Twelve'
	],
	"correctAnswer":'Twelve',
	img:src = "assets/images/numbertwelve.jpg",

	}
var fifthQuestion = 
{
	'questionNumber': 5,
	'timeRemaining': 30,
	'questionScript': "Who is the G.O.A.T?",
	'potentialAnswers':
	[
		'Joe Montana',
		'Peyton Manning',
		'Tom Brady',
		'Jon Kitna'
	],
	"correctAnswer":'Tom Brady',
		img:src="assets/images/TBGOAT.jpg",

	}
var myArray = [firstQuestion, secondQuestion, thirdQuestion,forthQuestion, fifthQuestion];
console.log(myArray.length);
console.log(myArray[2]);

var question;
var answer; 
var userInput;  
var counter = 20; 
var intervalID;
 
function displayQuestion(){
	console.log(true);
	var startDiv = $('<div>'); 
		startDiv.html(function(n){
			return "<h1> "+question.questionScript +"</h1>";
		})
		console.log(question.questionScript);
		startDiv.addClass('col-md-12 marker');
		$('#start').append(startDiv);
		

}
function render(){
	var startDiv = $('#start');
		 
		startDiv.html(
			"<h1> "+question.questionScript +"</h1>"
		);
	var length = (question.potentialAnswers.length);

	for (var i = 0; i < length ; i ++){
					var btn = $("<button>");
					btn.addClass('col-md-6  temp btn-primary question'+ i);
					btn.attr('data-let', question.potentialAnswers[i]);
					btn.html(question.potentialAnswers[i]);
					$("#start").append(btn);
		}
}

function changeQuestion(){
	if(myArray.length >0){
		console.log(myArray.length);
		var number = Math.floor(Math.random() * myArray.length);
		question = myArray[number];
		myArray.splice(number, 1);
		console.log(number.length);
		console.log(myArray[number]);
	
		return question;
	}else{
		alert( "The game is over!");
	}
	
}

function displayTimeRunsOut(){
		$('#start').empty();
		displayQuestion(question);
}
function displayImage(){
	var gifUrl = question.imageGif;
	console.log(gifUrl);
	var image = $("<img>");
	image.addClass('img-responsive image')
	image.attr('src', gifUrl);
	$('.marker').append(image);

}
function displayWrongAnswer(){
	var div = $("<div>");
	div.addClass("col-md-12");
	div.html('<h2>' + userInput + " is incorrect! The correctAnswer was " + answer + "! </h2>");
	$('.image').append(div);

	setTimeout(nextQuestion, 8000);

}
function nextQuestion (){
	$('#start').empty();
	changeQuestion();
	render();
}

$(document).ready(function(){
	$('#startGame').on('click',function(){
		 
		question = changeQuestion();
		console.log(question);
		displayQuestion(question);
		render(question);
		 
		intervalID = setInterval(function(){
			 
			counter --; 
			 
			$('#timer').html("<h2>" + counter	+" </h2");
			
			if(counter === 0 ){
				console.log('clearing interval', intervalID);
				displayTimeRunsOut();
				clearInterval(intervalID);
			}
		}, 1000)
		console.log('on start', intervalID);

	})

	$(document).on('click',".temp", function(){

		console.log(question.questionScript);
		$('#timer').html('');
		 
		clearInterval(intervalID);
		
		answer = question.correctAnswer;
		console.log(answer + " answer");
		
		userInput	= $(this).data("let");
		console.log(userInput);
		
		$('#start').empty();

		displayQuestion(question);
	
		console.log(userInput);
		console.log(userInput ===answer);
		console.log(answer);
		if (userInput === answer){
			displayImage();
			console.log("got here");
			var div = $("<div>");
			div.addClass("col-md-12");
			console.log(answer);
			div.html('<h2>'+answer + " is correct! you have won this round.</h2>");
			console.log(div);
			$("#start").append(div); 
			setTimeout(nextQuestion, 8000);

		}else{
			displayImage();
			displayWrongAnswer();
			console.log('wrong')
			}

		})

	
})