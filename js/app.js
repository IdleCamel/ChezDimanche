$(document).foundation();

// TABLE OF CONTENTS
// 1. Utility function
// 2. Responsive nav
// 3. Accordions
// 4. Lightbox
// 5. jQuery UI Datepicker
// 6. Google Map


// 1. UTILITY FUNCTION
// ====================

// determines if an event target has a specific parent
// parent can be an ID, a class or a HTML element
// parents is an object comprising all parents; use jQuery's parents() function
var hasParent = function (parents, parent) {
  "use strict";
  var key;
  for (key in parents) {
    if (
      parents[key].tagName === parent.toUpperCase() ||
      parents[key].id === parent ||
      parents[key].className === parent
    ) {
      return true;
    }
  }
  return false;
};

// 2. RESPONSIVE NAV
// =====================

var $menuToggle = $('#menu-toggle');
var $navbar = $('nav ul');
var $navbarAnchors = $('nav a');
var $clickAnywhere = $('body *');

// on small devices, open the nav by clicking the menu button
$menuToggle.click(function (e) {
  "use strict";
  if (!$navbar.hasClass("open")) {
    // stop immediate propagation to avoid triggering other click events
    e.stopImmediatePropagation();
    $navbar.addClass("open");
    $menuToggle.text("close");
  }
});

// close the navbar when it's open by clicking anywhere
// stop immediate propagation AND prevent default in order to:
  // 1) prevent from firing multiple events unnecessarily during the bubbling phase
  // 2) prevent any unintended behavior that could be triggered
  //    by clicking another button or link
$clickAnywhere.click(function (e) {
  "use strict";
  if ($navbar.hasClass("open")) {
    e.stopImmediatePropagation();
    $navbar.removeClass("open");
    $menuToggle.text("menu");
    var $parents = $(this).parents();
    if (!hasParent($parents, "nav")) {
      e.preventDefault();
    }
  }
});

// 3. ACCORDIONS
// ==============

// #testimonials
$('#testimonialsBtn').click(function () {
  "use strict";
  $(this).hide();
  $('#olderTesti').slideDown();
});

// #accommodation
$('h4').click(function () {
  "use strict";
  $(this).next().slideToggle();
});

var $info = $('h4').next();
$info.click(function () {
  "use strict";
  $(this).slideUp();
});


// 4. LIGHTBOX
// =============

var imgs = [
  {
    path: "img/facade_BIG.jpg",
    caption: "Le gite est situé dans une ancienne ferme comtoise (vue depuis la rue) - parking privatif"
  },
  {
    path: "img/salon2_BIG.jpg",
    caption: "Salon/salle à manger - coin TV / WiFi / multimedia"
  },
  {
    path: "img/salon1_BIG.jpg",
    caption: "Salon - coin lecture"
  },
  {
    path: "img/chambre1_BIG.jpg",
    caption: "Chambre avec lit double"
  },
  {
    path: "img/jardin3_BIG.jpg",
    caption: "Chambre - vue sur le jardin privatif plein sud"
  },
  {
    path: "img/cuisine1_BIG.jpg",
    caption: "Cuisine sur mesure neuve - plaques induction"
  },
  {
    path: "img/cuisine2_BIG.jpg",
    caption: "Cuisine - frigo congélo **** four combiné micro-ondes/ traditionnel"
  },
  {
    path: "img/sdb1_BIG.jpg",
    caption: "Salle de bain"
  },
  {
    path: "img/sdb2_BIG.jpg",
    caption: "Salle de bain"
  },
  {
    path: "img/jardin2_BIG.jpg",
    caption: "Vue jardin depuis chambre plein sud juin 2015"
  },
  {
    path: "img/jardin1_HEADER.jpg",
    caption: "Vue jardin depuis chambre plein sud automne 2015"
  }
];

var $lightboxTrigger = $('.lightbox-open');
var $lightbox = $('#lightbox');
var $arrows = $('#lightbox button');
var $ligthboxImg = $('#lightbox img');
var $lightboxCaption = $('#lightbox figcaption');
var $clickAnywhereLightbox = $('#lightbox, #lightbox *');
var imgCounter = 0;
var nbImgs = imgs.length;

// opens the lightbox
$lightboxTrigger.click(function () {
  "use strict";
  $lightbox.addClass("open");
});

// clicking on arrows changes the img source and caption
$arrows.click(function () {
  "use strict";
  if ($(this).hasClass("arrow-prev")) {
    if (imgCounter === 0) {
      imgCounter = nbImgs - 1;
    } else {
      imgCounter -= 1;
    }
  } else {
    if (imgCounter === nbImgs - 1) {
      imgCounter = 0;
    } else {
      imgCounter += 1;
    }
  }
  $ligthboxImg.attr('src', imgs[imgCounter].path);
  $ligthboxImg.attr('alt', imgs[imgCounter].caption);
  var imgRank = imgCounter + 1;
  $lightboxCaption.text(imgRank + "/" + nbImgs + ": " + imgs[imgCounter].caption);
});

// close the lightbox when clicking off image
$clickAnywhereLightbox.click(function (e) {
  "use strict";
  e.stopPropagation(); // avoid multiple click events
  var $parents = $(this).parents();
  
  // if user does NOT click inside the #fig-container, close the lightbox
  if (!hasParent($parents, "fig-container")) {
    $('#lightbox').removeClass("open");
  }
});

// 5. JQUERY UI DATEPICKER
// =======================
var bookedDates = [];

// reservations 01/07/2016 -> 30/07/2016 included
var i;
for (i = 1; i < 31; i += 1) {
  var bookedDate = new Date(2016, 6, i).getTime();
  bookedDates.push(bookedDate);
}

// reservations 01/08/2016 -> 27/08/2016 included
for (i = 1; i < 28; i += 1) {
  var bookedDate = new Date(2016, 7, i).getTime();
  bookedDates.push(bookedDate);
}

// reservations 19/09/2016 -> 29/09/2016 included
for (i = 19; i < 30; i += 1) {
  var bookedDate = new Date(2016, 8, i).getTime();
  bookedDates.push(bookedDate);
}

$('#jquery-datepicker').datepicker({
  numberOfMonths: 2,
  beforeShowDay: function (date) {
    if ($.inArray(date.getTime(), bookedDates) > -1) {
      return [false, "not-available", ""];
    } else {
      return [true, "", "disponible"];
    }
  }
});

// 6. GOOGLE MAP
// ===============
var map;
var mapDiv = document.getElementById('map');
var locations = {};

locations.chezDimanche = {
  fullName: "Chez Dimanche",
  pos: {
    lat: 47.63108,
    lng: 6.8168
  },
  info: "Gite et Couvert chez Dimanche <br>"
    + "38 rue de Lattre de Tassigny <br>"
    + "90 850 Essert</p>"
    + "<p>+33 (0) 6 30 02 76 78<br>"
    + "joellemoner@yahoo.fr"
};

// creating a shortcut
var chezDimanche = locations.chezDimanche;

// locations.place MUST match with a checkbox ID
locations.citadelle = {
  fullName: "Citadelle de Belfort",
  pos: {
    lat: 47.636926,
    lng: 6.865575
  }
};
  
locations.ballon = {
  fullName: "Ballon d'Alsace",
  pos: {
    lat: 47.82055,
    lng: 6.83450
  }
};

locations.chapelle = {
  fullName: "chapelle Le Corbusier",
  pos: {
    lat: 47.704181,
    lng: 6.621807399999966
  }
};

locations.ursanne = {
  foo: "bourg médiéval de Sainte-Ursanne",
  pos: {
    lat: 47.364455,
    lng: 7.15395
  }
};

locations.malsaucy = {
  fullName: "Lac du Malsaucy",
  pos: {
    lat: 47.685642,
    lng: 6.8053
  }
};

function initMap() {
  "use strict";
  
  map = new google.maps.Map(
    mapDiv,
    {
      center: chezDimanche.pos,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    }
  );
  
  // creating a marker
  chezDimanche.marker = new google.maps.Marker({
    position: chezDimanche.pos,
    map: map,
    title: chezDimanche.fullName
  });

  // creating an info window
  chezDimanche.infoWindow = new google.maps.InfoWindow({
    content: chezDimanche.info,
    maxWidth: 200
  });
  
  // opening the window when loading the page
  chezDimanche.infoWindow.open(map, chezDimanche.marker);
  
  // opening the window when clicking on marker
  chezDimanche.marker.addListener('click', function () {
    chezDimanche.infoWindow.open(map, chezDimanche.marker);
  });
   
} // initMap()


// display a marker and centers the map when checking checkbox in the legend
$('.checkbox').click(function () {
  "use strict";
  
  // gets clicked element, its id and object
  var checkbox, checkboxId, place;
  checkbox = $(this);
  checkboxId = checkbox.attr("id");
  place = locations[checkboxId];
  
  // centers the map at the coordinates of the place
  if (checkbox["0"].checked) {
    map.setCenter(place.pos);
    map.setZoom(9);
  }
  
  // create a marker and sets it as a property
  if (!place.marker) {
    place.marker = new google.maps.Marker({
      position: place.pos,
      title: place.fullName,
      map: map
    });
  // if the marker already exists, toggle show/hide
  } else if (place.marker.getMap()) {
    place.marker.setMap(null);
  } else {
    place.marker.setMap(map);
  }
});