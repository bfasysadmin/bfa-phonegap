/*
 email (string)(required)
 phone (string)(optional)
 collegeid (int)(options)
 deliveryaddress.address1 (string)(required)
 deliveryaddress.address2 (string)(optional)
 deliveryaddress.city (string)(required)
 deliveryaddress.stateabbrv (string)(required)(needs to be abbreviation)
 deliveryaddress.zipcode (string)(required)(5 numeric digits)
 deliveryaddress.plus4 (string)(optional)(4 numeric digits)
 deliveryaddress.status (int)(optional)(5: not verified, 1: valid, 2: invalid)
 howrequest (int)(required) (7 for android and 8 for iphone)
 requestedcontact (bool)(required)
 interestedinbiblestudy (bool)(required)
 */

var key = "";
var url = "";

$.getScript("js/APIKeyInclude.js");

function emptyCallback() {}

function saveOrder(button) {
    if(button == 1)
    {
        var d = new Date();
        var hours = d.getHours();
        var time = "" + (hours > 12 ? (hours - 12): hours) + ":";
        if(d.getMinutes() < 10)
            time += "0";
        time += d.getMinutes();
        time += (hours >= 12 ? "pm" : "am") + " on ";
        time += (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear();
        localStorage.setItem("time_"+orderIndex, time);
        localStorage.setItem("orderIndex", ++orderIndex);
        var numPending = localStorage.getItem("numPending");
        if(numPending == null)
            numPending = 0;
        else
            numPending = parseInt(numPending);
        localStorage.setItem("numPending", numPending + 1);
        $(":input","#form1")
        .not(":button, :submit, :reset, :hidden, #language")
        .val("")
        .removeAttr("checked")
        .removeAttr("selected");
        show_pending_orders();
        
        // set up next order
        localStorage.setItem("language_"+orderIndex, $("#language").val());
        localStorage.setItem("state_"+orderIndex, "AL");
        localStorage.setItem("contact_"+orderIndex, 0);
        localStorage.setItem("interestedinbiblestudy_"+orderIndex, 0);
    }
}

function submitForm() {
	if($("#form1").valid()) {
        $("#loading").show();
        // show loading popup.
        // TODO: set timeout
		$.post(url+"addresscheck", { "apikey": key, "address1": $('#address').val(), "city": $('#city').val(), "stateabbrv": $('#state').val(), "zipcode": $('#zipcode').val(), "status": "5"},
			   function(check){
               
               //navigator.notification.alert(JSON.stringify(check), emptyCallback, "Order Form");
			   if (check.success == true) {
			   // Ideally, would use the check data but for some reason it is undefined
			   var address = check.data.Address1 + ", " + check.data.City + " " + check.data.StateAbbrv + " " + check.data.Zipcode;
			   
			   $.post(url+"createbibleorder", 
                      { "apikey": key, "firstname": $('#firstname').val(), "lastname": $('#lastname').val(), "email": $('#email').val(), "phone":$('#phone').val(), "language": $('#language').val(), "deliveryaddress.address1": $('#address').val(), "deliveryaddress.city": $('#city').val(), "deliveryaddress.stateabbrv": $('#state').val(), "deliveryaddress.zipcode": $('#zipcode').val(), "deliveryaddress.status": "1", "howrequest": "8", "requestedcontact": ($('#contact').is(":checked") ? "true" : "false"), "interestedinbiblestudy": ($('#interestedinbiblestudy').is(":checked") ? "true" : "false")},
                      
					  function(create){
                      //navigator.notification.alert(JSON.stringify(create), emptyCallback, "Order Form");
                      
                      if(create.success == true) {
                      navigator.notification.alert("Congratulations! We will be shipping a Bible to "+address + ". Please allow 4 weeks for your Bible to ship!", emptyCallback, "Order Form");
                      
                      $("#loading").hide();
                      
                      localStorage.removeItem("firstname_" + orderIndex);
                      localStorage.removeItem("lastname_" + orderIndex);
                      localStorage.removeItem("email_" + orderIndex);
                      localStorage.removeItem("phone_" + orderIndex);
                      localStorage.removeItem("language_" + orderIndex);
                      localStorage.removeItem("address_" + orderIndex);
                      localStorage.removeItem("city_" + orderIndex);
                      localStorage.removeItem("state_" + orderIndex);
                      localStorage.removeItem("zipcode_" + orderIndex);
                      localStorage.removeItem("contact_" + orderIndex);
                      localStorage.removeItem("interestedinbiblestudy_" + orderIndex);
                      
                      $(':input','#form1')
                       .not(':button, :submit, :reset, :hidden, #language')
                       .val('')
                       .removeAttr('checked')
                       .removeAttr('selected');
                      
					  }
					  else {
                      // TODO remove this debug 
                      //navigator.notification.alert(JSON.stringify(create), emptyCallback, "Order Form");
					  navigator.notification.alert("Something went wrong with the order submission. Please try again.", emptyCallback, "Order Form");
                      $("#loading").hide();
					  }
                      }, "json").error(function() {
                                       navigator.notification.confirm("A network error occurred while trying to submit your request. Do you want to save your order to be submitted at a later time?", saveOrder, "Order Form", "Save,Cancel");
                                       $("#loading").hide();
                                       });
			   }
			   else {
               navigator.notification.alert(JSON.stringify(check));
			   navigator.notification.alert("USPS did not recognize the address you provided. Please check the address and try again.", emptyCallback, "Order Form");
               $("#loading").hide();
			   }
               }, "json").error(function() {
                                navigator.notification.confirm("A network error occurred while trying to submit your request. Do you want to save your order to be submitted at a later time?", saveOrder, "Order Form", "Save,Cancel");
                                $("#loading").hide();
                                });
	}
	else {
		navigator.notification.alert("Error: Please make sure all fields are filled out and try again.", emptyCallback, "Order Form");
	}
}

