const MAX_SWIPER_ITEMS = 7;

function updateSwiper() {
  console.log('Called')
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
  console.log(newWidth, itemWidth);

  let items = document.getElementsByClassName('swiper-item');
  console.log(items)
  for (const item of items) {
    item.style.width = itemWidth.toString() + 'px';
    console.log(item.style.width);
  }
}

updateSwiper();
window.onresize = updateSwiper;
