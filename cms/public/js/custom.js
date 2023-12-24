/*------------------------------------------------------------------
    File Name: custom.js
    ----------------------------*/

/*--------------------------------------
	sidebar
--------------------------------------*/

"use strict";

$(document).ready(function () {
  /*-- sidebar js --*/
  
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

   $('#sidebarCollapse').on('click', function () {
    $('#mainSidebar').toggleClass('active');
  });





  $(document).ready(function(){
  $('.dropdown-toggle').click(function(){
    $(".dropdown-toggle").removeClass("menu-open");
    $(".dropdown-toggle").addClass("closerr");
    $(this).addClass("menu-open");
    $(this).removeClass("closerr");

    });
  });


$(document).ready(function(){
   $('.timesIcon').on('click', function () {
    $('#mainSidebar').removeClass("active");
    $('#sidebar').removeClass("active");
  });
});
  

   
  /*-- calendar js --*/
  // $('#example14').calendar({
  //   inline: true
  // });
  // $('#example15').calendar();
  /*-- tooltip js --*/
  $('[data-toggle="tooltip"]').tooltip();
});



/*--------------------------------------
    scrollbar js
--------------------------------------*/

var ps = new PerfectScrollbar('#sidebar');

