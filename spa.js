$(function(){
	
	var History = window.History;
	
	if (History.enabled) {
		var page = get_url_value('page');
		var path = page ? page : 'home';
		// Load the page
		load_page_content(path);
	} else {
		return false;
	}

	// Content update and back/forward button handler
	History.Adapter.bind(window, 'statechange', function() {
		var State = History.getState();	
		// Do ajax
		load_page_content(State.data.path);
		// Log the history object to your browser's console
		History.log(State);
	});

	// Navigation link handler
	$('body').on('click', 'nav a', function(e) {
		e.preventDefault();
		
		var urlPath = $(this).attr('href');
		var title = $(this).text();	
		
		History.pushState({path: urlPath}, title, './?page=' + urlPath); // When we do this, History.Adapter will also execute its contents. 		
	});
	
	function load_page_content(page) {
		$.ajax({  
			type: 'post',
			url: page + '.html',
			data: {},						
			success: function(response) {
				$('.content').html(response);
			}
		});
	}
	
	function get_url_value(variable) {
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
	   }
	   return(false);
    }
});