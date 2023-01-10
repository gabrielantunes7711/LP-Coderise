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

// Scroll Animation
function compareImages(obj) {
  let slideUpAnimation;
  let slideDownAnimation;
  let windowWidth = window.innerWidth;
  let slideOpacity = 1;
  let slidePosition = 0;
  let pauseSlide = true;
  let fullOpacity = true;
  let mustScrollOnTransition = false;

  let speed = obj.speed || 4;
  let transitionSpeed = obj.transitionSpeed || 5;
  let delay = obj.delay || 500;
  let mobileBreakpoint = obj.mobileBreakpoint || 991;
  let mobileSpeed = obj.mobileSpeed || 2;

  const siteImage = document.getElementById(obj.image);
  const firstImage = obj.firstImageSrc;
  const secondImage = obj.secondImageSrc;
  const versionButtons =
    siteImage.parentNode.previousElementSibling.querySelectorAll("button");

  for (const button of versionButtons) {
    button.addEventListener("click", () => {
      window.cancelAnimationFrame(slideUpAnimation);
      window.cancelAnimationFrame(slideDownAnimation);

      if (windowWidth <= mobileBreakpoint) {
        mustScrollOnTransition = true;
      }

      slideTransition();
    });
  }

  function slideDown(speed) {
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
      slidePosition -= speed;

      siteImage.style.marginTop = `${slidePosition}px`;
      slideDownAnimation = window.requestAnimationFrame(function () {
        slideDown(speed);
      });
    } else {
      slideTransition();
      console.log(20000 * `0.0${parseFloat(transitionSpeed)}`);

      setTimeout(() => {
        slideDown(speed);
      }, (2 / `0.0${parseFloat(transitionSpeed)}`) * 20 + delay);
    }
  }

  function slideUp(speed) {
    if (slidePosition < 0) {
      slidePosition += speed;

      siteImage.style.marginTop = `${slidePosition}px`;

      slideUpAnimation = window.requestAnimationFrame(function () {
        slideUp(speed);
      });
    }
  }

  function slideTransition() {
    if (slideOpacity <= 0) {
      const imageSrc = siteImage.getAttribute("src");

      if (imageSrc == firstImage) {
        siteImage.setAttribute("src", secondImage);
      } else {
        siteImage.setAttribute("src", firstImage);
      }

      for (const button of versionButtons) {
        button.classList.toggle("selected");
      }
      slidePosition = 0;
      siteImage.style.marginTop = "0px";
    }
    const slideTransitionAnimate =
      window.requestAnimationFrame(slideTransition);

    if (slideOpacity >= 0 && fullOpacity) {
      slideOpacity -= parseFloat(`0.0${transitionSpeed}`);

      siteImage.style.opacity = slideOpacity;
    } else if (slideOpacity < 1) {
      fullOpacity = false;
      slideOpacity += parseFloat(`0.0${transitionSpeed}`);

      siteImage.style.opacity = slideOpacity;
      if (slideOpacity >= 1) {
        fullOpacity = true;
        window.cancelAnimationFrame(slideTransitionAnimate);
      }
    }
    if (windowWidth <= mobileBreakpoint && mustScrollOnTransition) {
      window.cancelAnimationFrame(slideDownAnimation);
      slideDown(mobileSpeed);
      mustScrollOnTransition = false;
    }
  }

  siteImage.parentNode.addEventListener("mouseenter", () => {
    window.cancelAnimationFrame(slideUpAnimation);
    slideDown(speed);
  });

  siteImage.parentNode.addEventListener("mouseleave", () => {
    window.cancelAnimationFrame(slideDownAnimation);
    slideUp(speed);
    pauseSlide = true;
  });

  siteImage.parentNode.addEventListener("click", () => {
    if (pauseSlide) {
      window.cancelAnimationFrame(slideUpAnimation);
      window.cancelAnimationFrame(slideDownAnimation);
      pauseSlide = false;
    } else {
      slideDown(speed);
      pauseSlide = true;
    }
  });

  if (windowWidth <= mobileBreakpoint) {
    siteImage.parentNode.style.pointerEvents = "none";
    slideDown(mobileSpeed);
  }

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
    if (windowWidth == mobileBreakpoint) {
      siteImage.parentNode.style.pointerEvents = "none";
      slideDown(mobileSpeed);
    }
    if (windowWidth > mobileBreakpoint) {
      siteImage.parentNode.style.pointerEvents = "all";
      window.cancelAnimationFrame(slideDownAnimation);
    }
  });
}

compareImages({
  speed: 4,
  transitionSpeed: 5,
  delay: 500,
  image: "compareSiteImage",
  firstImageSrc:
    "/wp-content/themes/coderise-lp/assets/img/polo-central-cursos-before.png",
  secondImageSrc:
    "/wp-content/themes/coderise-lp/assets/img/polo-central-cursos-after.png",
  mobileBreakpoint: 991,
  mobileSpeed: 2,
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

let wpcf7Elm = document.querySelector(".wpcf7");
console.log(wpcf7Elm);

wpcf7Elm.addEventListener("wpcf7mailsent", function () {
  Swal.fire({
    icon: "success",
    title: "Inscrição Realizada!",
    text: "Agora você passará a receber em seu e-mail nossas atualizações.",
    width: "50rem",
    padding: "3rem 0",
  });
});

wpcf7Elm.addEventListener(
  "wpcf7invalid",
  function () {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Ops! Ocorreu um erro ao realizar sua inscrição, tente novamente mais tarde.",
      width: "50rem",
      padding: "3rem 0",
    });
  },
  false
);
