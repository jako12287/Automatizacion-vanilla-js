const container = document.querySelector("#container");

const msg = (message) => {
  const log = document.querySelector("#log");
  log.textContent += message + "\n";
};

container.addEventListener("click", (ev) => {
  const target = ev.target;
  if (target.matches("#btnA")) {
    msg("A clicked");
  }
  if (target.matches("#btnB")) {
    msg("B cliked pero sin propagacion");
    ev.stopPropagation();
    return;
  }

  msg("container clicked");
});
