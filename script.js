import { currentAccount, init, updateAccount } from "./Bankist/script.js";

const openAccBtn = document.querySelectorAll(".open-acc-btn");
const overlay = document.querySelector(".overlay");
const closeOveraly = document.querySelector("#closeOverlay");
const submit = document.querySelector(".submit");
const password = document.querySelector(".pass");
const email = document.querySelector(".email");
const learnMoreBtn = document.querySelector(".sub-heading2");
const features = document.querySelector("#features");
const testimonials = document.querySelector("#testimonials");
const operations = document.querySelector("#operations");
const featuresNav = document.querySelector(".features-nav");
const testimonialsNav = document.querySelector(".testimonials-nav");
const operationsNav = document.querySelector(".operations-nav");
const tabs = document.querySelectorAll(".tabs");
const tabsContainer = document.querySelector(".buttons");
const tabContent = document.querySelectorAll(".operation-content");
export const main = document.querySelector(".main");
const loaderContainer = document.querySelector(".loader-container");
const navMain = document.querySelector("nav");
const hero = document.querySelector(".hero");
const section = document.querySelectorAll(".section-hidden");
const featureImage = document.querySelectorAll(".lazy-img");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const dots = document.querySelectorAll(".dots span");
const ham = document.querySelector(".hamMenu");
const menu = document.querySelector(".menu");
const loginForm = document.querySelector(".login-form");
const loginBtn = document.querySelector(".login-btn");
const form = document.querySelector(".form");
const registerForm = document.querySelector(".register-form");
const create = document.querySelector(".create");
const regBtn = document.querySelector("#reg-btn");
const firstName = document.querySelector(".first");
const loginEmail = document.querySelector(".email-log");
const loginPass = document.querySelector(".pass-log");
const login = document.querySelector("#login");
export const bankingPage = document.querySelector(".banking-page");
const username = document.querySelector(".last");
const passEye = document.querySelectorAll(".pass-eye");
const authCode = document.querySelector(".auth-code");
const authMail = document.querySelector(".auth-mail");
const authForm = document.querySelector(".auth-form");
const forget = document.querySelector(".forget");
const authBtn = document.querySelector(".auth-btn");
const sendOtp = document.querySelector(".otp");

create.addEventListener("click", function () {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

loginBtn.addEventListener("click", function () {
  registerForm.classList.add("hidden");
  authForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

passEye.forEach((img) => {
  let openEye = true;
  img.addEventListener("click", function () {
    if (openEye) {
      registerForm.classList.contains("hidden")
        ? ""
        : password.setAttribute("type", "text");
      loginForm.classList.contains("hidden")
        ? ""
        : loginPass.setAttribute("type", "text");
      img.setAttribute("src", "close-eye.png");
      openEye = false;
    } else {
      registerForm.classList.contains("hidden")
        ? ""
        : password.setAttribute("type", "password");
      loginForm.classList.contains("hidden")
        ? ""
        : loginPass.setAttribute("type", "password");
      img.setAttribute("src", "open-eye.png");
      openEye = true;
    }
  });
});

ham.addEventListener("click", function () {
  if (ham.classList.contains("closeMenu")) {
    menu.style.display = "none";
    ham.classList.remove("closeMenu");
    // menu.classList.remove('animateMenu');
    navMain.style.backgroundColor = "rgba(255, 255, 255, 0.883)";
    return;
  }
  if (!ham.classList.contains("closeMenu")) {
    ham.classList.add("closeMenu");
    menu.style.display = "initial";
  }
  navMain.style.backgroundColor = "white";
  menu.style.top = `${
    navMain.getBoundingClientRect().height + window.scrollY
  }px`;
  menu.style.left = "0";
  let ti = gsap.timeline();
  ti.from(".menu", {
    x: -400,
    duration: 0.4,
    delay: 0.2,
    ease: "inOut",
  });
  ti.from(".menu ul li,.menu button", {
    x: -100,
    opacity: 0,
    stagger: 0.2,
    ease: "in",
  });
  // menu.classList.add('animateMenu');
});

menu.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav-link")) {
    menu.style.display = "none";
    ham.classList.remove("closeMenu");
  }
});
openAccBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    overlay.classList.remove("hidden");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    authForm.classList.add("hidden");
  });
});
closeOveraly.addEventListener("click", function () {
  overlay.classList.add("hidden");
  clearFields();
});
document.body.addEventListener("keyup", function (e) {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    overlay.classList.add("hidden");
  }
});
overlay.addEventListener("click", function (e) {
  if (e.target.classList.contains("overlay")) {
    overlay.classList.add("hidden");
    clearFields();
  }
});

learnMoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const featuresCords = features.getBoundingClientRect();
  window.scrollTo({
    top:
      featuresCords.top +
      window.scrollY -
      navMain.getBoundingClientRect().height,
    left: featuresCords.left + window.scrollX,
    behavior: "smooth",
  });
});

document.querySelectorAll(".nav-link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    const cords = document.querySelector(id).getBoundingClientRect();
    window.scrollTo({
      top: cords.top + window.scrollY - navMain.getBoundingClientRect().height,
      left: cords.left + window.scrollX,
      behavior: "smooth",
    });
  });
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tabs");
  if (!clicked) return;
  if (!clicked.classList.contains("operation-tab-active")) {
    tabs.forEach((t) => {
      if (t.classList.contains("operation-tab-active")) {
        t.classList.remove("operation-tab-active");
      }
    });
    const activeTab = `operation-content-${clicked.getAttribute("data-tab")}`;
    clicked.classList.add("operation-tab-active");
    tabContent.forEach((tab) => {
      if (tab.classList.contains("active-content")) {
        tab.classList.remove("active-content");
      }
      if (tab.classList.contains(activeTab)) {
        tab.classList.add("active-content");
      }
    });
  }
});

window.addEventListener("load", function () {
  main.classList.add("visibleLoading");
  loaderContainer.classList.add("hiddenLoading");
  this.window.scrollTo({ top: 0, behavior: "smooth" });
});

const hoverEffect = function (e, o) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".nav-link");
    const logo = link.closest("nav").querySelector("img");
    logo.style.opacity = o;
    siblings.forEach((ele) => {
      if (ele !== link) {
        ele.style.opacity = o;
      }
    });
  }
};
navMain.addEventListener("mouseover", function (e) {
  hoverEffect(e, "0.6");
});
navMain.addEventListener("mouseout", function (e) {
  hoverEffect(e, "1");
});

// window.addEventListener('scroll',function(){
//   if (this.window.scrollY >= features.getBoundingClientRect().top + window.scrollY) {

//   }
//   else{
//     navMain.classList.remove('sticky');
//   }
// });

const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navMain.classList.add("sticky");
    menu.style.display = "none";
    ham.classList.remove("closeMenu");
    // menu.classList.remove('animateMenu');
  } else {
    navMain.classList.remove("sticky");
  }
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navMain.getBoundingClientRect().height}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(hero);

const secCallback = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  }
};
const secOptions = {
  root: null,
  threshold: 0.1,
};
const secObserver = new IntersectionObserver(secCallback, secOptions);
section.forEach((sect) => {
  secObserver.observe(sect);
});

const featureCallback = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    const newSrc = entry.target.getAttribute("data-src");
    entry.target.classList.remove("lazy-img");
    entry.target.setAttribute("src", newSrc);
    observer.unobserve(entry.target);
  }
};
const featureOptions = {
  root: null,
  threshold: 0.9,
  rootMargin: "200px",
};
const featureObserver = new IntersectionObserver(
  featureCallback,
  featureOptions
);
featureImage.forEach((ele) => featureObserver.observe(ele));

let curSlide = 0;
const maxSlides = slides.length;
const goToSlide = function (curSlide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}vw)`)
  );
};
goToSlide(0);
const activeDot = function (curSlide) {
  dots.forEach((d) => d.classList.remove("active-dot"));
  dots.forEach((d, i) => {
    if (curSlide === i) {
      d.classList.add("active-dot");
    }
  });
};
activeDot(curSlide);
btnRight.addEventListener("click", function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  activeDot(curSlide);
  goToSlide(curSlide);
});

btnLeft.addEventListener("click", function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
  activeDot(curSlide);
  goToSlide(curSlide);
});

dots.forEach((d, i) => {
  d.addEventListener("click", function () {
    activeDot(i);
    goToSlide(i);
    curSlide = i;
  });
});

document.body.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    curSlide === maxSlides - 1 ? (curSlide = 0) : curSlide++;
    activeDot(curSlide);
    goToSlide(curSlide);
  }
  if (e.key === "ArrowLeft") {
    curSlide === 0 ? (curSlide = maxSlides - 1) : curSlide--;
    activeDot(curSlide);
    goToSlide(curSlide);
  }
});

let tl = gsap.timeline();
tl.from(".hero h1", {
  x: -200,
  duration: 0.8,
  delay: 0.5,
  opacity: 0,
});

password.addEventListener("input", function () {
  let temp = password.value;
  if (temp.length < 8 && temp.length !== 0) {
    password.classList.add("error");
  } else {
    password.classList.remove("error");
  }
});

password.addEventListener("click", () => {
  let temp = password.value;
  if (temp.length == 0) password.classList.remove("error");
});

email.addEventListener("input", function () {
  let temp = email.value;
  if (
    !(temp.includes("@") && temp.includes(".")) ||
    (temp.includes(" ") && temp.length !== 0)
  ) {
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }
});

email.addEventListener("click", () => {
  let temp = email.value;
  if (temp.length == 0) email.classList.remove("error");
});

//tostify
export function showErrorToast(msg, warning = false) {
  Toastify({
    text: warning ? "❗ " + msg : "❌ " + msg,
    duration: 3500,
    newWindow: true,
    close: true,
    draggable: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#f3f3f3",
      color: "black",
      borderLeft: "10px solid rgba(184, 18, 18,0.85)",
      borderRadius: "4px",
      fontSize: "1.1rem",
      fontWeight:'500'
    },
  }).showToast();
}

export function showSuccessToast(msg) {
  Toastify({
    text: "✅ " + msg,
    duration: 3500,
    newWindow: true,
    close: true,
    draggable: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#f3f3f3",
      color: "black",
      borderLeft: "10px solid #3ec576",
      borderRadius: "4px",
      fontSize: "1.1rem",
      fontWeight:'500'
    },
  }).showToast();
}

//appwrite

const { Client, Account, Databases, ID } = Appwrite;
const client = new Client();
let user = null;
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6639c79b000a4c603ede");

const account = new Account(client);
const databases = new Databases(client);

async function Register(email, pass, name) {
  user = await account.create(ID.unique(), email, pass, name);
  return user.$id;
}

async function Login(email, password) {
  user = await account.createEmailPasswordSession(email, password);
  return user.userId;
}

async function createObject(userID, obj) {
  let Object = JSON.stringify(obj);
  const doc = await databases.createDocument(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba",
    ID.unique(),
    {
      userID,
      Object,
    }
  );
}

async function getDocId(id) {
  const docs = await databases.listDocuments(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba"
  );
  return docs.documents.filter((obj) => obj.userID == id)[0].$id;
}

async function getObject(id) {
  const docs = await databases.listDocuments(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba"
  );
  return JSON.parse(docs.documents.filter((obj) => obj.userID == id)[0].Object);
}

export async function updateObject(newObject, user) {
  const promise = await databases.updateDocument(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba",
    await getDocId(user),
    { Object: JSON.stringify(newObject) }
  );
}

export async function getUser() {
  const u = await account.get();
  return u.$id;
}

export async function logout() {
  await account.deleteSessions();
}

const currencyMap = {
  "en-US": "USD",
  "en-IN": "INR",
  "hi-IN": "INR",
};
function clearFields() {
  firstName.value = "";
  email.value = "";
  password.value = "";
  username.value = "";
  loginPass.value = "";
  loginEmail.value = "";
  authMail.value = "";
  authCode.value = "";
}
regBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const first = firstName.value;
  const mail = email.value;
  const pass = password.value;
  const locale = navigator.language;
  const uname = username.value;

  if (!(await checkUsername(uname))) {
    return;
  }
  try {
    const user = await Register(mail, pass, first);
    await createObject(user, {
      owner: first,
      username: uname,
      movements: [100],
      movementsDates: [new Date().toISOString()],
      currency: currencyMap[locale],
      locale: locale,
    });
    showSuccessToast("Registration Successful");
    clearFields();
    overlay.classList.add("hidden");
  } catch (error) {
    console.log(error);
    showErrorToast("Email is used or Password is less than 7 characters!");
  }
});

function onLogin() {
  main.classList.add("hidden");
  bankingPage.classList.remove("hidden");
}

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const mail = loginEmail.value;
  const pass = loginPass.value;
  try {
    const user = await Login(mail, pass);
    updateAccount(await getObject(user));
    clearFields();
    showSuccessToast("Login Successful");
    overlay.classList.add("hidden");
    onLogin();
    gsap.from(".banking-page", {
      y: -800,
      duration: 0.5,
      delay: 0.2,
      ease: "inOut",
    });
    init();
  } catch (error) {
    console.log(error);
    showErrorToast("Wrong Credentials!!");
  }
});

export async function findByUsername(user) {
  const obj = await databases.listDocuments(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba"
  );
  const info = {
    user: obj.documents.find((obj) => JSON.parse(obj.Object).username == user)
      .userID,
    object: JSON.parse(
      obj.documents.find((obj) => JSON.parse(obj.Object).username == user)
        .Object
    ),
  };
  return info;
}

async function checkUsername(user) {
  const obj = await databases.listDocuments(
    "6639ea56001aa3f5db00",
    "6639ea6600256ca3e0ba"
  );
  const userId = await obj.documents.find(
    (obj) => JSON.parse(obj.Object).username == user
  );
  console.log(userId);
  if (userId) {
    showErrorToast("This Username is already taken!");
    return false;
  }
  return true;
}
async function getSession() {
  try {
    const s = await account.get();
    if (s) {
      const a = await account.deleteSessions();
    }
  } catch (error) {}
}
getSession();

let userId;
forget.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  authForm.classList.remove("hidden");
});

async function authLogin() {
  const session = await account.createSession(userId, authCode.value);
  return session.userId;
}

sendOtp.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const sessionToken = await account.createEmailToken(
      ID.unique(),
      authMail.value
    );
    showSuccessToast("OTP sent successfully!");
    userId = sessionToken.userId;
  } catch (error) {}
});

authBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const user = await authLogin();
    updateAccount(await getObject(user));
    clearFields();
    showSuccessToast("Login Successful");
    overlay.classList.add("hidden");
    onLogin();
    gsap.from(".banking-page", {
      y: -800,
      duration: 0.5,
      delay: 0.2,
      ease: "inOut",
    });
    init();
  } catch (error) {
    console.log(error);
    showErrorToast("Wrong OTP!");
  }
});
