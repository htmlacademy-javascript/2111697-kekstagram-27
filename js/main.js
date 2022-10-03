function getRandomNum () {
  let min = 1;
  let max = 140;
  let rand = Math.floor (min + Math.random() *  (max + 1 - min));

  console.log (rand);
}
getRandomNum ();
