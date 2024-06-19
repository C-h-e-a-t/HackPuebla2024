function rotateHexagon() {
    const hexagon = document.querySelector('.hexagon');
    hexagon.classList.toggle('rotate');
    
    const rosa = document.querySelector('.rosita');
    const rosaAfter = document.querySelector('.rosita-after');
    
    rosa.classList.toggle('active');
    rosaAfter.classList.toggle('active');
  }
  
  const tolu = document.getElementById('myBox');

  tolu.addEventListener('mouseenter', () => {
      tolu.classList.add('glow');
  });
  
  tolu.addEventListener('mouseleave', () => {
      tolu.classList.remove('glow');
  });