document.addEventListener("DOMContentLoaded", (event) => {
  const clout_key = "cc-clout";
  const insta_bot_key = "cc-insta-bot-ct";
  const button = document.querySelector("#clicker");
  const instaBotButton = document.querySelector("#insta-bot-button");
  const instaBotTemplate = document.querySelector(".insta-bot-template");
  const instaBotDiv = document.querySelector("#insta-bot-div");
  let clout;
  let counter = document.querySelector("#counter");
  const max_insta_bots = 10;
  let current_insta_bots = 0;
  const insta_bot_cost = 10;

  function dumpData() {
    // store count, number of insta bots
    window.localStorage.setItem(clout_key, clout);
    window.localStorage.setItem(insta_bot_key, current_insta_bots);
  }
  function cloneInstaBot() {
    let new_element = instaBotTemplate.cloneNode(true);
    new_element.id = makeid(4);
    new_element.classList.remove("insta-bot-template");
    //new_element attributes
    new_element.setAttribute("style", "width:50px;height:50px;");
    instaBotDiv.appendChild(new_element);
    // console.log(new_element);
    // console.log(instaBotDiv.querySelectorAll(".insta-bot"));
  }

  function getData() {
    clout = parseInt(window.localStorage.getItem(clout_key));
    if (Number.isNaN(clout)) {
      clout = 0;
      window.localStorage.setItem(clout_key, clout);
      console.log("No stored clout found.");
    }

    current_insta_bots = parseInt(window.localStorage.getItem(insta_bot_key));
    if (Number.isNaN(current_insta_bots)) {
      current_insta_bots = 0;
      window.localStorage.setItem(insta_bot_key, current_insta_bots);
      console.log("No stored insta bots found.");
    }

    for (let i = 0; i < current_insta_bots; i++) {
      cloneInstaBot();
    }
    counter.textContent = "Clout: " + clout;

  }
  function changeCount(i) {
    clout += i;
  }
  function iterate(click = false) {
    if (click) {
      changeCount(1);
    } else {
      for (let i = 0; i < current_insta_bots; i++) {
        changeCount(1);
      }
    }
    counter.textContent = "Clout: " + clout;
  }

  function makeid(length) {
    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let z = 0;
    while (z < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      z += 1;
    }
    return result;
  }

  getData();
  console.log(clout);

  button.addEventListener("click", () => {
    iterate(true);
  });
  instaBotButton.addEventListener("click", () => {
    if (clout < insta_bot_cost) {
      alert("You need " + insta_bot_cost + " clout to pay!");
    } else if (current_insta_bots !== max_insta_bots) {
      // Clone insta-bot and remove template
      cloneInstaBot();
      current_insta_bots += 1;
      clout -= 10;
    } else {
      alert("You cannot buy any more Insta Bots.");
    }
  });

  // Initialize counter display

  window.onbeforeunload = function () {
    dumpData();
  };

  _ = setInterval(iterate, 1000);
});
