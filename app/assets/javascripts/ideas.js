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
	        		$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td></tr>");
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



// $('.idea-box').delegate('.editable', 'keydown', function(event){
// 		  var esc = event.which == 27,
// 		      nl = event.which == 13,
// 		      el = event.target,
// 		      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
// 		      data = {};

// 	if (input) {
//     if (esc) {
//       // restore state
//       document.execCommand('undo');
//       el.blur();
//     } else if (nl) {
//       // save
//       data[el.getAttribute('data-name')] = el.innerHTML;
//       // we could send an ajax request to update the field

//       $.ajax({
//       	type: 'patch',
//         url: '/api/v1/save/' + el.getAttribute('id'),
//         data: data
//       });
      
//       log(JSON.stringify(data));

//       el.blur();
//       event.preventDefault();
//     }
//   }
// }, true);


document.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
      data = {};

  if (input) {
    if (esc) {
      // restore state
      document.execCommand('undo');
      el.blur();
    } else if (nl) {
      // save
      data['contents'] = el.innerText;
      // we could send an ajax request to update the field
      
        $.ajax({
      	type: 'get',
        url: '/api/v1/save/' + el.id,
        data: data
      });
      
      // log(JSON.stringify(data));

      el.blur();
      event.preventDefault();
    }
  }
}, true);


});

// $('.idea-box').prepend('<%= j render partial: 'idea', locals: {idea: @idea} %>');

// function log(s) {
//   document.getElementById('debug').innerText = 'value changed to: ' + s;
// }


function getIdeas(){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/ideas',
	        success: function(ideas) {
	        	ideas.forEach(function(idea){
	        		$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td></tr>");
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
	        	$("tr#idea_" + idea.id).html("<td class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td>");
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
	        	$("tr#idea_" + idea.id).html("<td class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn upButton'>up</button></td><td><button id='down_" + idea.id + "' class='btn downButton'>down</button></td><td><button id='dele_" + idea.id + "' class='btn deleteButton'>delete</button></td>");
	        	}
	        });
	        }

String.prototype.trimToLength = function(limit) {
  return (this.length > limit) ? jQuery.trim(this).substring(0, limit).split(" ").slice(0, -1).join(" ") + "..." : this;
};

// String.prototype.displayer = function(){
// 	return this.trimToLength(99)
// }
