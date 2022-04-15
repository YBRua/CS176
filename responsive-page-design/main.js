const MAX_SWIPER_ITEMS = 7;
const sidebar = document.getElementById('sidebar');

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

function showSideBar() {
  console.log('showSideBar');
  sidebar.classList.add('sidebar-show');
}

function hideSidebar() {
  sidebar.classList.remove('sidebar-show');
}

updateSwiper();
window.onresize = updateSwiper;

document.getElementById('btn-show-sidebar').onclick = showSideBar;
document.getElementById('btn-hide-sidebar').onclick = hideSidebar;
