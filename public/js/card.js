function cardMouseMoveEffect() {
  const card = document.getElementById("weather-card");
  const { x, y, width, height } = card.getBoundingClientRect();

  const centerPoint = { x: x + width / 2, y: y + height / 2 };

  card.addEventListener("mousemove", (e) => {
    const degreeX = (e.clientY - centerPoint.y) * -0.05;
    const degreeY = (e.clientX - centerPoint.x) * 0.05;

    card.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
  });
}

export { cardMouseMoveEffect };
