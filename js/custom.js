$(function () {
    var url = window.location.pathname; //sets the variable "url" to the pathname of the current window
    var activePage = url.substring(url.lastIndexOf('../index.html') + 1); //sets the variable "activePage" as the substring after the last "/" in the "url" variable
        $('.head_top ul li a').each(function () { //looks in each link item within the primary-nav list
            var linkPage = this.href.substring(this.href.lastIndexOf('../index.html') + 1); //sets the variable "linkPage" as the substring of the url path in each &lt;a&gt;
 
            if (activePage == linkPage) { //compares the path of the current window to the path of the linked page in the nav item
                $(this).parent().addClass('active'); //if the above is true, add the "active" class to the parent of the &lt;a&gt; which is the &lt;li&gt; in the nav list
            }
        });
})



$(".testimonails_sec_m_slider").slick({
  dots:true ,
  autoplay:true,
  infinite: true,
  autoplaySpeed:3000,
  arrows: false,
  speed: 3000,
  margin:0,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});



$(".writer_profile_silder").slick({
  dots:true ,
  infinite: true,
  autoplay:true,
  autoplaySpeed:2000,
  arrows: false,
  fade:true,
  speed: 2000,
  margin:0,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$('.testimonial_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    // infinite: true,
    autoplay: true,
    dots: false,
    autoplaySpeed: 0,
    arrows: false,
    speed:15000,
    cssEase: 'linear',
    Swiping: true,
    vertical: true,
    verticalSwiping: true,
    margin: 0,
    responsive: [
      { breakpoint: 1366,
        settings: {
          slidesToShow: 3
        }
      },
      { breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      }]
  });

//  $('.slider-for').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     infinite: true,
//     autoplay:true,
//     autoplaySpeed:2000,
//     arrows: false,
//     speed: 2000,
//     fade: true,
//     asNavFor: '.slider-nav'
//   });

//   $('.slider-nav').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     infinite: true,
//     autoplay:true,
//     autoplaySpeed:2000,
//     asNavFor: '.slider-for',
//     dots: true,
//     speed: 2000,
//     centerMode: false,
//     focusOnSelect: true
//   });

// $('.resume_samples_slider').slick({
//   dots: false,
//   infinite: true,
//   autoplay:true,
//   autoplaySpeed:2000,
//   arrows: true,
//   speed: 2000,
//   margin:5,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });


// $('.resume_inner').slick({
//   dots: true,
//   infinite: true,
//   arrows: false,
//   autoplay:true,
//   autoplaySpeed:2000,
//   speed: 2000,
//   slidesToShow: 6,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });

// $('.resume_inner1').slick({
//   dots: true,
//   infinite: true,
//   arrows: false,
//   autoplay:true,
//   autoplaySpeed:2000,
//   speed: 2000,
//   slidesToShow: 6,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });



// $('.top_services_slider').slick({
//   dots: true,
//   infinite: false,
//   arrows: false,
//   speed: 3000,
//   autoplay:true,
//   autoplaySpeed:3000,
//   slidesToShow: 1,
//   fade:true,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });

// $('.testimonials_box_l').slick({
//   dots: true,
//   infinite: false,
//   arrows: false,
//   autoplay:true,
//   autoplaySpeed:2000,
//   speed: 2000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });


//  $(document).ready(function() {

//     $(".fancybox").fancybox();

// });



//   $.fn.extend({
//     animateCss: function (animationName) {
//         var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//         $(this).addClass('animated ' + animationName).one(animationEnd, function() {
//             $(this).removeClass('animated ' + animationName);
//         });
//     }
// });

//   $(document).ready(function(){
//     $(".nav_bbar .dropdown").hover(function(){
//         var dropdownMenu = $(this).children(".dropdown-menu");
//         if(dropdownMenu.is(":visible")){
//             dropdownMenu.parent().toggleClass("open");
//         }
//     });
// }); 
  
// $(".dropdown-menu li a").click(function () {

 wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();


  