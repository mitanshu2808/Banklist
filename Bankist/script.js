import {
  updateObject,
  getUser,
  showErrorToast,
  showSuccessToast,
  findByUsername,
  bankingPage,
  main,
  logout
} from "../script.js";

let transferTo = document.querySelector(".transfer-to");
let transferAmo = document.querySelector(".transfer-amount");
let transfer = document.querySelector(".transfer-btn");
let balance = document.querySelector(".balance");
let request = document.querySelector(".request-btn");
const app = document.querySelector(".app");
const entries = document.querySelector(".entries");
const close = document.querySelector(".close-btn");
const inEntry = document.querySelector(".in");
const outEntry = document.querySelector(".out");
const closeUser = document.querySelector(".closeUser");
const closePin = document.querySelector(".closePin");
const sort = document.querySelector(".sort");
const welcome = document.querySelector(".welcome");
const loan = document.querySelector(".request-amount");
const date = document.querySelector(".date");
const nav = document.querySelector("nav");
const timer = document.querySelector(".timer");
const t = document.querySelector(".t");
const logoutBtn = document.querySelector(".logout-btn");
export let currentAccount;
export function updateAccount(newValue) {
  currentAccount = newValue;
}
let logoutTimer;
const animation = function () {
  app.style.opacity = "0";
  setTimeout(function () {
    app.style.opacity = "1";
  }, 1000);
};
let sorted = false;
sort.addEventListener("click", function () {
  entries.innerHTML = "";
  displayMov(currentAccount.movements, !sorted);
  sorted = !sorted;
  // const arr = currentAccount.movements.concat([]);
  // let temp=arr;
  // if (click === 1) {
  //   temp=temp.sort((a,b)=>a-b);
  //   displayMov(temp);
  //   click++;
  // }else {
  //   displayMov(arr);
  //   click = 1;
  // }
});

export function init() {
  let sec = 60;
  let timerM = 9;
  clearInterval(logoutTimer);
  logoutTimer = setInterval(() => {
    if (sec === 0 && timerM === 0) {
      app.style.display = "none";
      welcome.style.display = "none";
      bankingPage.classList.add("hidden");
      main.classList.remove("hidden");
      gsap.from("body", {
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
        ease: "inOut",
      });
      showErrorToast("You are logged out!", true);
    }
    sec--;
    if (sec < 0) {
      sec = 60;
      timerM--;
      sec--;
      timer.textContent = `${timerM} : ${String(sec).padStart(2, 0)}`;
    }
    timer.textContent = `${timerM} : ${String(sec).padStart(2, 0)}`;
  }, 1000);
  nav.style.marginTop = "initial";
  transferTo.value = "";
  transferAmo.value = "";
  loan.value = "";
  entries.innerHTML = "";
  animation();
  welcome.textContent = `Welcome Back, ${currentAccount.username}`;
  app.style.display = "initial";
  welcome.style.display = "initial";
  timer.style.display = "initial";
  closeUser.value = closePin.value = "";
  // const today = new Date();
  // date.textContent = `${today.getDate()}/${
  //   today.getMonth() + 1
  // }/${today.getFullYear()}, ${today.getHours()}:${String(
  //   today.getMinutes()
  // ).padStart(2, 0)}`;
  const locale = navigator.language;
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  setInterval(() => {
    date.textContent = new Intl.DateTimeFormat(locale, options).format(
      new Date()
    );
  }, 100);
  setTimeout(() => {
    t.style.display = "none";
  }, 3000);
  updateUI(currentAccount);
}

logoutBtn.addEventListener("click", function () {
  logout();
  bankingPage.classList.add("hidden");
  main.classList.remove("hidden");
});

const updateUI = function (arr) {
  displayMov(arr.movements);
  calcStatus(arr.movements);
  calcTotal(arr.movements);
};

const formatter = function (mov) {
  const options = {
    style: "currency",
    currency: currentAccount.currency,
  };
  return new Intl.NumberFormat(currentAccount.locale, options).format(mov);
};
const displayMov = function (movements, sorted = false) {
  let mov = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  mov.forEach((mov, i) => {
    const movDate = new Date(currentAccount.movementsDates[i]);
    const calcDays = (d1, d2) => {
      const d = Math.floor(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));
      if (d === 0) return "Today";
      if (d === 1) return "Yesterday";
      return `${movDate.getDate()}/${
        movDate.getMonth() + 1
      }/${movDate.getFullYear()}`;
    };
    const type = mov > 0 ? "Deposit" : "Withdraw";
    const html = `<div class="row">
  <p>
  <span class="label-${type}">${i + 1} ${type}</span>
  <span>${calcDays(new Date(), movDate)}</span>
  <span>${formatter(mov)}</span>
  </p>
  <hr color="grey">
  </div>`;
    entries.insertAdjacentHTML("afterbegin", html);
  });
};

function calcStatus(arr) {
  const incoming = arr
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  const outgoing = arr
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  inEntry.textContent = formatter(incoming.toFixed(2));
  outEntry.textContent = formatter(Math.abs(outgoing).toFixed(2));
}

function calcTotal(arr) {
  const total = arr.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  balance.textContent = formatter(total.toFixed(2));
  return total.toFixed(2);
}

transfer.addEventListener("click", async function (e) {
  e.preventDefault();
  const to = transferTo.value;
  const amount = Number(transferAmo.value);
  const total = Number(calcTotal(currentAccount.movements));
  let senderObj;
  let senderId;
  let accTo;
  try {
    accTo = await findByUsername(to);
    senderObj = accTo.object;
    senderId = accTo.user;
  } catch (error) {
    showErrorToast("Failed to fetch sender's username");
    return;
  }
  if (
    amount <= total &&
    amount > 0 &&
    currentAccount.username !== senderObj.username
  ) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateObject(currentAccount, await getUser());
    senderObj.movementsDates.push(new Date().toISOString());
    senderObj.movements.push(amount);
    updateObject(senderObj, senderId);
    entries.innerHTML = "";
    updateUI(currentAccount);
    transferTo.value = "";
    transferAmo.value = "";
    showSuccessToast(`Transffered ${amount} To ${to}`);
  } else {
    showErrorToast("Don't have enough balance! or Transfering your self!");
  }
});

close.addEventListener("click", async function (e) {
  e.preventDefault();
  const user = closeUser.value;
  const pass = closePin.value;
  if (user === currentAccount.username && pass === "YES") {
    currentAccount.movements = [];
    currentAccount.movementsDates = [];
    try {
      updateObject(currentAccount, await getUser());
      entries.innerHTML = "";
      updateUI(currentAccount);
      showSuccessToast("History deleted!");
      closeUser.value = "";
      closePin.value = "";
    } catch (error) {
      showErrorToast("Error! check username or YES phrase");
    }
  }
});

request.addEventListener("click", function (e) {
  e.preventDefault();
  let bonus = false;
  let amount = Math.trunc(Number(loan.value));
  if (currentAccount.movements.length == 0) {
    bonus = true;
    amount = 100;
  }
  setTimeout(async () => {
    if (
      (amount > 0 &&
        currentAccount.movements.some((mov) => 0.1 * amount <= mov)) ||
      bonus
    ) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateObject(currentAccount, await getUser());
      entries.innerHTML = "";
      updateUI(currentAccount);
      bonus
        ? showErrorToast("You were on low balance so bonus granted!", true)
        : "";
    }
  }, 5000);
  loan.value = "";
});
