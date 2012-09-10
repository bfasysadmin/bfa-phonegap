function remember( selector ){
	$(selector).each(function(){
		//if this item has been cookied, restore it
		var name = $(this).attr('name');
		
		 $(this).change(function() {
			localStorage[name]= $(this).is(':checked')?true:false;
			//window.localStorage.setItem(name, $(this).is(':checked')?true:false);
		 });
		  // when the page loads
		  if ( localStorage.getItem(name) == 'true') {
			$(this).attr('checked', true); 
		  }
		}
	);
}

$(document).ready( function(){
		remember('[type=checkbox]');
	}
);