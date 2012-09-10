$(document).ready(function()
{
  //hide the all of the element with class msg_body
  $(".msg_body").hide();
  //toggle the componenet with class msg_body
  $(".msg_head").toggle(
      function () {
        $(this).next(".msg_body").slideDown();
      },
      function () {
        $(this).next(".msg_body").slideUp();
      }
    );

});
