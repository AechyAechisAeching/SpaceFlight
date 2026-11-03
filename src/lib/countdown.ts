const countdowns = document.querySelectorAll<HTMLElement>(".countdown, [data-countdown]");
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
    const distance = launchDate - Date.now();

    const remaining = Math.max(0, distance);
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    const dayPart = element.querySelector<HTMLElement>("[data-countdown-days]");
    const hourPart = element.querySelector<HTMLElement>("[data-countdown-hours]");
    const minutePart = element.querySelector<HTMLElement>("[data-countdown-minutes]");
    const secondPart = element.querySelector<HTMLElement>("[data-countdown-seconds]");

    if (dayPart && hourPart && minutePart && secondPart) {
      dayPart.textContent = String(days);
      hourPart.textContent = String(hours).padStart(2, "0");
      minutePart.textContent = String(minutes).padStart(2, "0");
      secondPart.textContent = String(seconds).padStart(2, "0");
      if (distance <= 0) element.setAttribute("aria-label", "Launch time reached");
      return;
    }

    if (distance <= 0) {
      element.closest(".column-card")?.remove();
      return;
    }

    element.textContent = `${days}d ${hours}h ${minutes}m`;
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});

document
  .querySelectorAll<HTMLImageElement>(".launch-image")
  .forEach((image) => {
    image.onerror = () => {
      image.onerror = null;
      image.src = "/images/rocket-placeholder-image.jpg";
    };
  });
