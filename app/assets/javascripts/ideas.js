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
	        	$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td>" + idea.title + "</td><td>"  + idea.body + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td>"+ "<td><a href='#' class='edit-btn' id='edit_" + idea.id + "'><i class='fa fa-edit fa-2x'></i></a><a href='#' class='up-btn' id='up_" + idea.id + "'><i class='fa fa-thumbs-o-up fa-2x'></i></a><a href='#' class='down-btn' id='down_" + idea.id + "'><i class='fa fa-thumbs-o-down fa-2x'></i></a></td><td><a href='#' class='deleteButton' id='delete_" + idea.id + "'><i class='fa fa-times-circle-o fa-2x deleteButton'></i></a></td></tr>");
	        }
  		});

	});


  // 	$('.deleteButton').click(function(){
		// $.ajax({
	 //        type: 'DELETE',
	 //        url: '/api/v1/idea/:id',
	 //        data: {id: '82'},
	 //        success: function(){
	 //        	$("tr#idea_" + idea.id).fadeOut('slow');
	 //        }
	 //        });  	})

  	// document.getElementsByClassName("deleteButton").addEventListener('click', function(){
  	// 		var value = document.querySelector('tr').id;
  	// 		alert(value); 
	  //   }); 


var classname = document.getElementsByClassName("deleteButton");

var myFunction = function() {
    var attribute = this.getAttribute("id");
    alert(attribute);
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myFunction, false);
}

	});

function getIdeas(){
	$.ajax({
	        type: 'GET',
	        url: '/api/v1/ideas',
	        success: function(ideas) {
	        	ideas.forEach(function(idea){
	        		$('.idea-box').prepend("<tr id='idea_" + idea.id + "'><td>" + idea.title + "</td><td>"  + idea.body + "</td><td><div class='btn btn-primary'>" + idea.quality + "</div></td>"+ "<td><a href='#' class='' id='edit_" + idea.id + "'><i class='fa fa-edit fa-2x'></i></a><a href='#' class='up-btn' id='up_" + idea.id + "'><i class='fa fa-thumbs-o-up fa-2x'></i></a><a href='#' class='down-btn' id='down_" + idea.id + "'><i class='fa fa-thumbs-o-down fa-2x'></i></a></td><td><a href='#' class='deleteButton' id='delete_" + idea.id + "'><i class='fa fa-times-circle-o fa-2x deleteButton' id='dele_" + idea.id + "' ></i></a></td></tr>");
	        	});
	        }
	        });
}

 // alert("Ready");
 //    $(".fa").attr("disabled", "disabled");

 //    $(".deleteButton").click(function(){
 //        alert("Ok clicked");
 //    });

// function deleteIdea(){
// 	debugger;
		
// }




  //must change to allow to re render index with updated idea

// $("tr#idea_<%= @idea.id %>").remove();
// $('.idea-box').prepend('<%= j render partial: 'idea', locals: {idea: @idea} %>');
