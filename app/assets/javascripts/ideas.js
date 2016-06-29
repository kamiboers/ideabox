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
	        		$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td>" + idea.title + "</td><td>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td></tr>");
	        }
  		});

	});


  	$('button.deleteButton').click(function(){
		$.ajax({
	        type: 'DELETE',
	        url: '/api/v1/idea/:id',
	        data: {id: '82'},
	        success: function(){
	        	$("tr#idea_" + idea.id).fadeOut('slow');
	        }
	        });  	})



$('.idea-box').delegate('.deleteButton', 'click', function() {
    var ideaId = $(this).attr('id').substr(5);
    	deleteIdea(ideaId);
  });

$('.idea-box').delegate('.upButton', 'click', function() {
    var ideaId = $(this).attr('id').substr(3);
    	upvoteIdea(ideaId);
  });


$('.idea-box').delegate('.downButton', 'click', function() {
    var ideaId = $(this).attr('id').substr(5);
    	downvoteIdea(ideaId);
  });

});



// $('.idea-box').prepend('<%= j render partial: 'idea', locals: {idea: @idea} %>');

function getIdeas(){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/ideas',
	        success: function(ideas) {
	        	ideas.forEach(function(idea){
	        		$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td>" + idea.title + "</td><td>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td></tr>");
	        	});
	        }
	        });
}

function deleteIdea(ideaId){
	$.ajax({
	        type: 'DELETE',
	        url: '/api/v1/ideas/' + ideaId,
	        success: function(idea) {
	        	$("tr#idea_" + idea.id).remove();
	        }
	        });
}

function upvoteIdea(ideaId){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/upvote/' + ideaId,
	        contentType: 'application/json',
	        success: function(idea) {
	        	$("tr#idea_" + idea.id).html("");
	        	$("tr#idea_" + idea.id).html("<td>" + idea.title + "</td><td>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td>");
	        	}
	        });
	        }

function downvoteIdea(ideaId){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/downvote/' + ideaId,
	        contentType: 'application/json',
	        success: function(idea) {
	        	$("tr#idea_" + idea.id).html("");
	        	$("tr#idea_" + idea.id).html("<td>" + idea.title + "</td><td>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td>");
	        	}
	        });
	        }

String.prototype.trimToLength = function(limit) {
  return (this.length > limit) ? jQuery.trim(this).substring(0, limit).split(" ").slice(0, -1).join(" ") + "..." : this;
};
