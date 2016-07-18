$(document).ready(function() {

	getIdeas();
	getTags();



	$('#create_idea').click(function() {
		var title = $('#idea_title');
		var body = $('#idea_body');
		var tags = $('#idea_tags');
		var ideaAttributes = { idea: { title: title.val(), body: body.val(), tag_names: tags.val() } }
		$.ajax({
			type: 'POST',
			url: '/api/v1/ideas',
			data: ideaAttributes,
			success: function(idea) {
				prependFullRow(idea);
				clearInputFields(title, body, tags);
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

	idea_list = $('.idea-box');

	idea_list.delegate('.deleteButton', 'click', function() {
		var ideaId = $(this).attr('id').substr(5);
		deleteIdea(ideaId);
	});

	idea_list.delegate('.upButton', 'click', function() {
		var ideaId = $(this).attr('id').substr(3);
		upvoteIdea(ideaId);
	});


	idea_list.delegate('.downButton', 'click', function() {
		var ideaId = $(this).attr('id').substr(5);
		downvoteIdea(ideaId);
	});


	idea_list.on('mouseenter', '.get_tags', function( event ) {
		var ideaId = $(this).attr('id').substr(5);
	returnTags(ideaId);
	}).on('mouseleave', '.get_tags', function( event ) {
		var ideaId = $(this).attr('id').substr(5);
		$('#tags_'+ ideaId).html('show tags')
	});

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


	$('.dropdown').delegate('.tag_group', 'click', function() {
		var tag_name = $(this).attr('id');
		if (tag_name == "all_ideas") {
			$(".idea-box > tr").remove();	
			getIdeas();
		} else {
			$.ajax({
				type: 'get',
				url: '/api/v1/by_tag',
				data: {
				tag: tag_name
				},
				success: function(data) {
					$(".idea-box > tr").remove();	
					data.forEach(function(idea){ 
						prependFullRow(idea);
					});
				}
			});
		}
	});
});

function getTags(){
	$.ajax({
		type: 'GET',
		url: '/api/v1/get_tags',
		success: function(tags) {
			tags.forEach(function(tag_name){
				$('ul#tag_list').append("<li><a href='#' class='tag_group' id='" + tag_name + "'>" + tag_name + "</a></li>");
			});
		}
	});
}

function getIdeas(){
	$.ajax({
		type: 'GET',
		url: '/api/v1/ideas',
		success: function(ideas) {
			ideas.forEach(function(idea){
				prependFullRow(idea);
 			});
		}
	});
}

function returnTags(ideaId){
	$.ajax({
		type: 'GET',
		url: '/api/v1/tags/' + ideaId,
		success: function(tags) {
			$('#tags_'+ ideaId).html("");
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
			replaceRowContents(idea);
		}
	});
}

function downvoteIdea(ideaId){
	$.ajax({
		type: 'GET',
		url: '/api/v1/downvote/' + ideaId,
		contentType: 'application/json',
		success: function(idea) {
			replaceRowContents(idea);	
		}
	});
}

function filter(element) {
	var value = $(element).val();
	$('.idea-box > tr:not(:contains(' + value + '))').hide(); 
	$('.idea-box > tr:contains(' + value + ')').show();	
}

function prependFullRow(idea){
	idea_list.prepend("<tr id='idea_" + idea.id + "'><td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>show tags</div></td><td><div class='btn btn-primary q-butt'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-success upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-success downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-success deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td></tr>");
}

function replaceRowContents(idea){
	var idea_row = $("tr#idea_" + idea.id);
	idea_row.html("");
	idea_row.html("<td contentEditable='true' class='editable' id='title_" + idea.id + "'>" + idea.title + "</td><td contentEditable='true' class='editable' id='body_" + idea.id + "'>"  + idea.body.trimToLength(99) + "</td><td><div class='btn btn-primary get_tags' id='tags_" + idea.id + "'>show tags</div></td><td><div class='btn btn-primary q-butt'>" + idea.quality + "</div></td><td><button id='up_" + idea.id + "' class='btn btn-success upButton'><i class='fa fa-thumbs-o-up fa-2x'></i></button></td><td><button id='down_" + idea.id + "' class='btn btn-success downButton'><i class='fa fa-thumbs-o-down fa-2x'></i></button></td><td><button id='dele_" + idea.id + "' class='btn btn-success deleteButton'><i class='fa fa-times-circle-o fa-2x'></i></button></td>");
}

function clearInputFields(title, body, tags){
	title.val("");
	body.val("");
	tags.val("");
}


String.prototype.trimToLength = function(limit) {
	return (this.length > limit) ? jQuery.trim(this).substring(0, limit).split(" ").slice(0, -1).join(" ") + "..." : this;
};

jQuery.expr[':'].Contains = function(a, i, m) { 
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};
jQuery.expr[':'].contains = function(a, i, m) { 
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};