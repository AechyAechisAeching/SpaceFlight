const countdowns = document.querySelectorAll<HTMLElement>(".countdown");
countdowns.forEach((element) => {
  const launchDateValue = element.dataset.launchDate;

  if (!launchDateValue) {
    console.error("Missing launch date on countdown.");
    return;
  }

  const launchDate = new Date(launchDateValue).getTime();

  if (Number.isNaN(launchDate)) {
    console.error("Invalid launch date:", launchDateValue);
    return;
  }

  const updateCountdown = () => {
    const now = Date.now();
    const distance = launchDate - now;

    if (distance <= 0) {
      element.closest(".launch-card")?.remove();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    element.textContent =
      `${days}d ${hours}h ${minutes}m `;
  };
  updateCountdown();

  // Currently been commented out due repeatedly fetching images
  // setInterval(updateCountdown, 1000);
});

document
  .querySelectorAll<HTMLImageElement>(".launch-image")
  .forEach((image) => {
    image.onerror = () => {
      image.onerror = null;
      image.src = "/images/rocket-placeholder-image.jpg";
    };
  });
