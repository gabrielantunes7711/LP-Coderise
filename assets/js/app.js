// Details Section Benefits
const allBenefitHeader = document.querySelectorAll(".benefit .top");
allBenefitHeader[0].nextElementSibling.style.height =
  allBenefitHeader[0].nextElementSibling.firstElementChild.offsetHeight +
  60 +
  "px";

for (const benefitHeader of allBenefitHeader) {
  benefitHeader.addEventListener("click", (el) => {
    el = el.target;
    const benefitText = el.nextElementSibling;

    for (const benefitHeader of allBenefitHeader) {
      const benefitText = benefitHeader.nextElementSibling;
      if (benefitHeader != el) {
        benefitText.style.height = "0px";
        benefitHeader.parentNode.classList.remove("open");
        benefitHeader.querySelector(".left span").innerText = "+";
      }
    }

    el.parentNode.classList.toggle("open");

    if (el.parentNode.classList.contains("open")) {
      el.querySelector(".left span").innerText = "-";
      const totalHeight = benefitText.firstElementChild.offsetHeight;

      benefitText.style.height = `${totalHeight + 48}px`;
    } else {
      el.querySelector(".left span").innerText = "+";
      benefitText.style.height = "0px";
    }
  });
}

//Add Selected Class For Button And Change Image Src
const siteImage = document.querySelector(".section-demonstration figure > img");
const oldSiteSrc = "./assets/img/polo-central-cursos-after.png";
const newSiteSrc = "./assets/img/polo-central-cursos-before.png";
const versionButtons = document.querySelectorAll(
  ".container-version-select button"
);

for (const button of versionButtons) {
  button.addEventListener("click", () => {
    window.cancelAnimationFrame(slideUpAnimation);
    window.cancelAnimationFrame(slideDownAnimation);

    if (windowWidth <= 991) {
      mustScrollOnTransition = true;
    }

    slideTransition();
  });
}
// Scroll Animation
let slideUpAnimation;
let slideDownAnimation;
let pauseSlide = true;
let slideOpacity = 1;
let slidePosition = 0;

function slideDown() {
  let siteImageBorderTop = window.getComputedStyle(
    siteImage.parentNode
  ).borderTop;
  siteImageBorderTop = parseInt(siteImageBorderTop.split("px")[0]);

  let siteImageBorderBottom = window.getComputedStyle(
    siteImage.parentNode
  ).borderBottom;
  siteImageBorderBottom = parseInt(siteImageBorderBottom.split("px")[0]);

  const totalBorder = siteImageBorderBottom + siteImageBorderTop;
  const containerHeight = siteImage.parentNode.offsetHeight - totalBorder;
  const imageHeight = siteImage.offsetHeight;

  if (slidePosition > -imageHeight + containerHeight) {
    slidePosition -= 4;

    siteImage.style.marginTop = `${slidePosition}px`;
    slideDownAnimation = window.requestAnimationFrame(slideDown);
  } else {
    slideTransition();
    setTimeout(() => {
      slideDown();
    }, 1000);
  }
}

function slideUp() {
  if (slidePosition < 0) {
    slidePosition += 4;

    siteImage.style.marginTop = `${slidePosition}px`;

    slideUpAnimation = window.requestAnimationFrame(slideUp);
  }
}
let fullOpacity = true;
let mustScrollOnTransition = false;

function slideTransition() {
  if (slideOpacity <= 0) {
    const imageSrc = siteImage.getAttribute("src");

    if (imageSrc == newSiteSrc) {
      siteImage.setAttribute("src", oldSiteSrc);
    } else {
      siteImage.setAttribute("src", newSiteSrc);
    }

    for (const button of versionButtons) {
      button.classList.toggle("selected");
    }
    slidePosition = 0;
    siteImage.style.marginTop = "0px";
  }
  const slideTransitionAnimate = window.requestAnimationFrame(slideTransition);

  if (slideOpacity >= 0 && fullOpacity) {
    slideOpacity -= 0.05;

    siteImage.style.opacity = slideOpacity;
  } else if (slideOpacity < 1) {
    fullOpacity = false;
    slideOpacity += 0.05;

    siteImage.style.opacity = slideOpacity;
    if (slideOpacity >= 1) {
      fullOpacity = true;
      window.cancelAnimationFrame(slideTransitionAnimate);
    }
  }
  if (windowWidth <= 991 && mustScrollOnTransition) {
    window.cancelAnimationFrame(slideDownAnimation);
    slideDown();
    mustScrollOnTransition = false;
  }
}
siteImage.parentNode.addEventListener("mouseenter", () => {
  window.cancelAnimationFrame(slideUpAnimation);
  slideDown();
});

siteImage.parentNode.addEventListener("mouseleave", () => {
  window.cancelAnimationFrame(slideDownAnimation);
  slideUp();
  pauseSlide = true;
});

siteImage.parentNode.addEventListener("click", () => {
  if (pauseSlide) {
    window.cancelAnimationFrame(slideUpAnimation);
    window.cancelAnimationFrame(slideDownAnimation);
    pauseSlide = false;
  } else {
    slideDown();
    pauseSlide = true;
  }
});

const phoneMask = IMask(document.getElementById("phone"), {
  mask: "+{55} (00) 00000-0000",
});

//Mobile Configs
let windowWidth = window.innerWidth;
const contactTextarea = document.querySelector(".section-contact textarea");

if (windowWidth <= 450) {
  contactTextarea.setAttribute("placeholder", "");
}
window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  if (windowWidth <= 450) {
    contactTextarea.setAttribute("placeholder", "");
  } else {
    contactTextarea.setAttribute(
      "placeholder",
      "Conte-nos mais sobre seu projeto"
    );
  }
});

if (windowWidth <= 991) {
  siteImage.parentNode.style.pointerEvents = "none";
  slideDown();
}

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  if (windowWidth == 991) {
    siteImage.parentNode.style.pointerEvents = "none";
    slideDown();
  }
  if (windowWidth > 991) {
    siteImage.parentNode.style.pointerEvents = "all";
    window.cancelAnimationFrame(slideDownAnimation);
  }
});

const section = document.querySelectorAll("section");

let initialDelay;

section.forEach((item) => {
  const fadeUpItem = item.querySelectorAll(".fade-left");
  initialDelay = 100;

  fadeUpItem.forEach((item) => {
    initialDelay += 200;
    ScrollReveal().reveal(item, {
      distance: "150%",
      origin: "left",
      opacity: 0,
      delay: initialDelay,
    });
  });
});

section.forEach((item) => {
  const fadeUpItem = item.querySelectorAll(".fade-right");
  initialDelay = 100;

  fadeUpItem.forEach((item) => {
    initialDelay += 200;
    ScrollReveal().reveal(item, {
      distance: "150%",
      origin: "right",
      opacity: 0,
      delay: initialDelay,
    });
  });
});

section.forEach((item) => {
  const fadeUpItem = item.querySelectorAll(".fade-up");
  initialDelay = 100;

  fadeUpItem.forEach((item) => {
    initialDelay += 200;
    ScrollReveal().reveal(item, {
      distance: "150%",
      origin: "bottom",
      opacity: 0,
      delay: initialDelay,
    });
  });
});

section.forEach((item) => {
  const fadeUpItem = item.querySelectorAll(".fade-down");
  initialDelay = 0;

  fadeUpItem.forEach((item) => {
    initialDelay += 150;
    ScrollReveal().reveal(item, {
      distance: "150%",
      origin: "top",
      opacity: 0,
      delay: initialDelay,
    });
  });
});
