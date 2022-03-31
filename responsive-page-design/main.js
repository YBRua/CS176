const MAX_SWIPER_ITEMS = 7;

function updateSwiper() {
  let newWidth = window.innerWidth;
  let itemsToDisplay;
  for (let i = MAX_SWIPER_ITEMS; i > 0; --i) {
    let tryWidth = newWidth / i;
    if (tryWidth >= 180) {
      itemsToDisplay = i;
      break;
    }
  }
  let itemWidth = (newWidth / itemsToDisplay);

  let items = document.getElementsByClassName('swiper-item');
  for (const item of items) {
    item.style.width = itemWidth.toString() + 'px';
  }
}

updateSwiper();
window.onresize = updateSwiper;
