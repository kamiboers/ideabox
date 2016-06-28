$(document).ready(function() {

	getIdeas();

  	$('#create_idea').click(function() {
  		var title = $('#idea_title').val();
  		var body = $('#idea_body').val();
  		var ideaAttributes = { idea: { title: title, body: body } }
  	 	$.ajax({
	        type: 'POST',
	        url: '/api/v1/ideas',
	        data: ideaAttributes,
	        success: function(idea) {
	        	$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td>" + idea.title + "</td><td>"  + idea.body + "</td><td><button class='btn btn-primary disabled'>" + idea.quality +"</button></td></tr>");
	        }
  		});

	});
});

function getIdeas(){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/ideas',
	        success: function(ideas) {
	        	console.log(ideas);
	        }
  		});
}

// $("tr#idea_<%= @idea.id %>").fadeOut('slow');


  //must change to allow to re render index with updated idea

// $("tr#idea_<%= @idea.id %>").remove();
// $('.idea-box').prepend('<%= j render partial: 'idea', locals: {idea: @idea} %>');
