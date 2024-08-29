if(window.innerWidth > 990){
  const $cards = $(".animated-card");
  const $style = $(".hover");
  
  $cards
    .on("mousemove touchmove", function(e) { 
      // normalise touch/mouse
      const pos = [e.offsetX,e.offsetY];
      e.preventDefault();
      if ( e.type === "touchmove" ) {
        pos = [ e.touches[0].clientX, e.touches[0].clientY ];
      }
      const $card = $(this);
      // math for mouse position
      const l = pos[0];
      const t = pos[1];
      const h = $card.height();
      const w = $card.width();
      const px = Math.abs(Math.floor(100 / w * l)-100);
      const py = Math.abs(Math.floor(100 / h * t)-100);
      const pa = (50-px)+(50-py);
      // math for gradient / background positions
      const lp = (50+(px - 50)/1.5);
      const tp = (50+(py - 50)/1.5);
      const px_spark = (50+(px - 50)/7);
      const py_spark = (50+(py - 50)/7);
      const p_opc = 20+(Math.abs(pa)*1.5);
      const ty = ((tp - 20)/2) * -1;
      const tx = ((lp - 20)/1.5) * .5;
      // css to apply for active card
      const grad_pos = `background-position: ${lp}% ${tp}%;`
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
      const opc = `opacity: ${p_opc/100};`
      const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
      // need to use a <style> tag for psuedo elements
      const style = `
        .card:hover:before { ${grad_pos} }  / gradient /
        .card:hover:after { ${sprk_pos} ${opc} }   / sparkles / 
      `
      // set / apply css class and style
      $cards.removeClass("active");
      $card.removeClass("animated");
      $card.attr( "style", tf );
      $style.html(style);
      if ( e.type === "touchmove" ) {
        return false; 
      }
    }).on("mouseout touchend touchcancel", function() {
      // remove css, apply custom animation on end
      const $card = $(this);
      $style.html("");
      $card.removeAttr("style");
    });
}
document.addEventListener('DOMContentLoaded', function () {
  const cardItems = document.querySelectorAll('[js-card-item]');
  const loadMoreBtn = document.querySelector('[js-load-more-btn]');
  if (cardItems && loadMoreBtn) {
      const itemsToShow = 12;
      for (let i = itemsToShow; i < cardItems.length; i++) {
          cardItems[i].style.display = 'none';
      }
      loadMoreBtn.addEventListener('click', function () {
          for (let i = itemsToShow; i < cardItems.length; i++) {
              cardItems[i].style.display = 'block';
          }
          loadMoreBtn.style.display = 'none';
      });
  } else {
      if (loadMoreBtn) {
          loadMoreBtn.style.display = 'none';
      }
  }
});

// // image shawacase 
// const swiper = new Swiper('[js-image-slider]', {
//   loop: true,
//   // centeredSlides: true,
//   breakpoints: {
//     0: {
//       slidesPerView: 1.9,
//       spaceBetween: 12
//     },
//     768: {
//       slidesPerView: 1.9,
//       spaceBetween: 12
//     },
//     990: {
//       slidesPerView: 3.8,
//       spaceBetween: 20
//     },
//     1280: {
//       slidesPerView: 3.8,
//       spaceBetween: 28
//     }
//   }
// });