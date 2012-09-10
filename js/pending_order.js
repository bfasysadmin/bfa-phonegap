var key = "";
var url = "";

$.getScript("js/APIKeyInclude.js");

function emptyCallback() {}

var ready_for_submission = true;

/*function submit_pending() {
    // TODO: disable delete order while submitting pending orders!
    num_pending_submissions = num_pending_orders;
    error = false;
    $("#loading").css("color", "green");
    $("#loading").html("Loading...<img src=\"images/ajax-loader.gif\"/>");
    $("#loading").show();
    var total = localStorage.getItem("orderIndex");
    for(var i = 0; i < total; i++) {
        if(localStorage.getItem("firstname_"+i) != null) {
            submit_pending_order(i);
        }
    }
}*/

function deleteOrder(index) {
    localStorage.removeItem("firstname_" + index);
    localStorage.removeItem("lastname_" + index);
    localStorage.removeItem("email_" + index);
    localStorage.removeItem("phone_" + index);
    localStorage.removeItem("language_" + index);
    localStorage.removeItem("address_" + index);
    localStorage.removeItem("city_" + index);
    localStorage.removeItem("state_" + index);
    localStorage.removeItem("zipcode_" + index);
    localStorage.removeItem("contact_" + index);
    localStorage.removeItem("interestedinbiblestudy_" + index);
    num_pending_orders--;
    localStorage.setItem("numPending", localStorage.getItem("numPending") - 1);
    if(num_pending_orders == 0)
        localStorage.setItem("orderIndex", 0);
}

function orderError(index, notify) {
    // indicate this order was NOT successfully submitted
    $("#" + index).css("color", "red");
    $("#loading" + index).hide();
    if(notify)
        navigator.notification.alert("Order could not be submitted at this time! Please try again later.", emptyCallback, "Pending Orders");
    ready_for_submission = true;
    $("button").removeAttr("disabled");
}

/*function showAddressForm(index) {
    var html = "<br>";
    html += "Street Address: <br><textarea name=\"address_" + index + "\">" + localStorage.getItem("address_" + index) + "</textarea><br>";
    html += "City: <br><input type=\"text\" name=\"city_" + index + "\" value=\"" + localStorage.getItem("city_" + index) + "\"/><br>";
    html += "State: <br><input type=\"text\" name=\"state_" + index + "\" value=\"" + localStorage.getItem("state_" + index) + "\"/><br>";
    html += "Zip Code: <br><input type=\"text\" name=\"zipcode_" + index + "\" value=\"" + localStorage.getItem("zipcode_" + index) + "\"/><br>";
    $("#address_form_" + index).html(html);
    $("#address_form_" + index).show();
    
    $("textarea, input").change(function() {
        localStorage.setItem($(this).attr("name"), $(this).val());
    });
}*/

function submit_pending_order(index) {
    // we only allow one order submitted at a time to avoid a race condition
    // on the localstorage variable numPending.
    if(!ready_for_submission)
        return;
    ready_for_submission = false;
    var firstname = localStorage.getItem("firstname_" + index);
    var lastname = localStorage.getItem("lastname_" + index);
    var email = localStorage.getItem("email_" + index);
    var phone = localStorage.getItem("phone_" + index);
    var language = localStorage.getItem("language_" + index);
    var address = localStorage.getItem("address_" + index);
    var city = localStorage.getItem("city_" + index);
    var state = localStorage.getItem("state_" + index);
    var zipcode = localStorage.getItem("zipcode_" + index);
    var requestedcontact = localStorage.getItem("contact_" + index);
    var interestedinbiblestudy = localStorage.getItem("interestedinbiblestudy_" + index);
    
    $("#loading" + index).css("color", "green");
    $("#loading" + index).html("<br>Loading...<img src=\"images/ajax-loader.gif\"/>");
    $("#loading" + index).show();
    $("button").attr("disabled", "disabled");
    //$("#address_form_" + index).hide();

    /*$.ajax({
           type: "POST"
           
           , url: url + "addresscheck"
           
           , data: { "apikey": key,
           "address1": address, 
           "city": city, 
           "stateabbrv": state,
           "zipcode": zipcode, 
           "status": "5"}
           
           , success: function(check) {
           if (check.success == true) {
               // Ideally, would use the check data but for some reason it is undefined
               var address = check.data.Address1 + ", " + check.data.City + " " + check.data.StateAbbrv + " " + check.data.Zipcode;
               $.ajax({
                      type: "POST"
                      
                      , url: url + "addresscheck"
                      
                      , data: { "apikey": key, 
                      "firstname": firstname, 
                      "lastname": lastname,
                      "email": email,
                      "phone": phone, 
                      "language": language, 
                      "deliveryaddress.address1": address, 
                      "deliveryaddress.city": city, 
                      "deliveryaddress.stateabbrv": state, 
                      "deliveryaddress.zipcode": zipcode, 
                      "deliveryaddress.status": "1", 
                      "howrequest": "8", 
                      "requestedcontact": (requestedcontact == 1 ? "true" : "false"), 
                      "interestedinbiblestudy": (interestedinbiblestudy == 1 ? "true" : "false")}
                      
                      , success: function(create) {
                          if(create.success == true) {
                              // indicate this order was successfully submitted
                              $("#" + index).css("color", "green");
                          
                              deleteOrder(index);
                          
                              num_pending_submissions--;
                              if(num_pending_submissions == 0)
                                  $("#loading").html("Successfully submitted all pending orders!");
                              $("#loading" + orderIndex).hide();
                              localStorage.setItem("numPending", localStorage.getItem("numPending")-1);
                          } else {
                              orderError(index);
                          }
                      }
                      
                      , error: function() {
                          orderError(index);
                      }
                      
                      , dataType: "json"
                      , async: false
                });
           } else {
               navigator.notification.alert("USPS did not recognize the address you provided. Please check the address and try again.", emptyCallback, "Order Form");
               orderError(index);
           }
           }
                  
           , error: function() {
               orderError(index);
           }
                  
           , dataType: "json"
           , async: false
    });*/
    
	$.post(url+"addresscheck", 
           
           { "apikey": key, 
             "address1": address, 
             "city": city, 
             "stateabbrv": state,
             "zipcode": zipcode, 
             "status": "5"},
           
           function(check){
           if (check.success == true) {
           // Ideally, would use the check data but for some reason it is undefined
           var address = check.data.Address1 + ", " + check.data.City + " " + check.data.StateAbbrv + " " + check.data.Zipcode;
           
           $.post(url+"createbibleorder", 
                  { "apikey": key, 
                    "firstname": firstname, 
                    "lastname": lastname,
                    "email": email,
                    "phone": phone, 
                    "language": language, 
                    "deliveryaddress.address1": address, 
                    "deliveryaddress.city": city, 
                    "deliveryaddress.stateabbrv": state, 
                    "deliveryaddress.zipcode": zipcode, 
                    "deliveryaddress.status": "1", 
                    "howrequest": "8", 
                    "requestedcontact": (requestedcontact == 1 ? "true" : "false"), 
                    "interestedinbiblestudy": (interestedinbiblestudy == 1 ? "true" : "false")},
                  
                  function(create){
                  if(create.success == true) {
                      // indicate this order was successfully submitted
                      $("#" + index).css("color", "green");
                      
                      deleteOrder(index);
                      
                      $("#loading" + index).html(" <b>Successfully submitted!</b>");
                      $("#delete_button_" + index).hide();
                      $("#submit_button_" + index).hide();
                      $("button").removeAttr("disabled");
                      ready_for_submission = true;
                  }
                  else {
                      orderError(index, true);
                  }
                  }, "json").error(function() {
                     orderError(index, true);
               });
           }
           else {
               navigator.notification.alert("USPS did not recognize the address you provided. Please check the address and try again.", emptyCallback, "Pending Orders");
               orderError(index, false);
               //showAddressForm(index);
           }
        }, "json").error(function() {
                orderError(index, true);
    });
}

