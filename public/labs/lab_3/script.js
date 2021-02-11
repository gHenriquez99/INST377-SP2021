// function doTheThing(event) {
//   alert(event.type);
// }

// document.querySelector('#div1').onclick = doTheThing;

// .foreach and .map are the array methods we should be using

const width = 130;
const count = 3;

const list = carousel.querySelector('ul');
const listElems = carousel.querySelectorAll('li');

let position = 0;

carousel.querySelector('.back').onclick = function() {
  // shift left
  position += width * count;
  // can't move to the left too much, end of images
  position = Math.min(position, 0);
  list.style.marginLeft = `${position}px`;
};

carousel.querySelector('.fwd').onclick = function() {
  // shift right
  position -= width * count;
  // can only shift the ribbbon for (total ribbon length - visible count) images
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = `${position}px`;
};