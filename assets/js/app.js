// Details Section Benefits
const allBenefitHeader = document.querySelectorAll(".benefit .top");

for (const benefitHeader of allBenefitHeader) {
  benefitHeader.addEventListener("click", (el) => {
    el = el.target;
    const benefitText = el.nextElementSibling;

    for (const benefitHeader of allBenefitHeader) {
      const benefitText = benefitHeader.nextElementSibling;
      if (benefitHeader != el) {
        benefitText.style.height = null;
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
      benefitText.style.height = null;
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
  button.addEventListener("click", (el) => {
    window.cancelAnimationFrame(slideUpAnimation);
    window.cancelAnimationFrame(slideDownAnimation);

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
