$(document).ready(function() {

	getIdeas();

	$('#create_idea').click(function() {
		var title = $('#idea_title').val();
		var body = $('#idea_body').val();
		var tags = $('#idea_tags').val();
		var ideaAttributes = { idea: { title: title, body: body, tag_names: tags } }
		
		$.ajax({
			type: 'POST',
			url: '/api/v1/ideas',
			data: ideaAttributes,
			success: function(idea) {
				$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>Show Tags</div></td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-primary upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-primary downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-danger deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td></tr>");
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
		});  	
	});


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

	// $('.idea-box').delegate('.get_tags', 'click', function() {
	// 	var ideaId = $(this).attr('id').substr(5);
	// 	returnTags(ideaId);
	// });

	$('.idea-box').on('mouseenter', '.get_tags', function( event ) {
    // do something
    	var ideaId = $(this).attr('id').substr(5);
		returnTags(ideaId);
	}).on('mouseleave', '.get_tags', function( event ) {
    // do something different
        var ideaId = $(this).attr('id').substr(5);
    	$('#tags_'+ ideaId).html('Show Tags')
	});

	document.addEventListener('keydown', function (event) {
		var esc = event.which == 27,
		nl = event.which == 13,
		el = event.target,
		// off-click no worky
		// oc = document.addEventListener('click', function(e) {
		// 	return e.target !== el;
		// }),
		input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
		data = {};

		if (input) {
			if (esc) {
		// restore state
		document.execCommand('undo');
		el.blur();
		// oc no worky
		} else if (nl) {
		// save
		data['contents'] = el.innerText;

		$.ajax({
			type: 'get',
			url: '/api/v1/save/' + el.id,
			data: data
		});

		el.blur();
		event.preventDefault();
		}
		}
	}, true);
});





function getIdeas(){
	$.ajax({
		type: 'GET',
		url: '/api/v1/ideas',
		success: function(ideas) {
			ideas.forEach(function(idea){
				$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>Show Tags</div></td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-primary upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-primary downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-danger deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td></tr>");
			});
		}
	});
}

function returnTags(ideaId){
	$.ajax({
		type: 'GET',
		url: '/api/v1/tags/' + ideaId,
		success: function(tags) {
			// debugger;
			$('#tags_'+ ideaId).html("");
			// if clause for no tags
			if ( tags.tags.length == 0 ) {
				$('#tags_'+ ideaId).html('No Tags')
			} else {
				$('#tags_'+ ideaId).html(tags.tags)
			}	
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
			$("tr#idea_" + idea.id).html("<td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>Show Tags</div></td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-primary upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-primary downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-danger deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td>");
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
			$("tr#idea_" + idea.id).html("<td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>Show Tags</div></td><td><div class='btn btn-primary'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-primary upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-primary downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-danger deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td>");
		}
	});
}

function filter(element) {
        var value = $(element).val();

        $('.idea-box > tr:not(:contains(' + value + '))').hide(); 
		$('.idea-box > tr:contains(' + value + ')').show();	
    }

// editing doesn't display whole body
String.prototype.trimToLength = function(limit) {
	return (this.length > limit) ? jQuery.trim(this).substring(0, limit).split(" ").slice(0, -1).join(" ") + "..." : this;
};

jQuery.expr[':'].Contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};
jQuery.expr[':'].contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};