const images = carousel.querySelectorAll('li');
const imageArray = Array.from(images);

const newArray = imageArray.map((element) => {
  const listItem = document.createElement('li');
  listItem.innerText = element;
  listItem.style.position = 'relative';
  listItem.insertAdjacentHTML('beforeend', '<span style="position:absolute;left:0;top:0">1</span>');
  return listItem;
});

const width = 130;
const count = 3;

const list = carousel.querySelector('ul');
// const listElems = carousel.querySelectorAll('li');
const listElems = newArray;

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