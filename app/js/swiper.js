
if ($(".tf-swiper").length) {
  $(".tf-swiper").each(function () {
    const $slider = $(this);

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    let configRaw = $slider.attr("data-swiper");
    let config = {};

    try {
      config = JSON.parse(configRaw);
    } catch (e) {
      console.error("Swiper config JSON lỗi:", e);
      return;
    }

    if (config.pagination && config.pagination.el) {
      let $pag = $slider.find(config.pagination.el); 
      if (!$pag.length) $pag = $slider.siblings(config.pagination.el).add($slider.parent().find(config.pagination.el));
      config.pagination.el = $pag[0];
    }

    if (config.navigation) {
      const findElement = (selector) => {
        let $el = $slider.find(selector);
        if (!$el.length) {
          $el = $slider.parent().find(selector);
        }
        return $el[0];
      };

      if (config.navigation.nextEl) {
        config.navigation.nextEl = findElement(config.navigation.nextEl);
      }
      if (config.navigation.prevEl) {
        config.navigation.prevEl = findElement(config.navigation.prevEl);
      }
    }
    new Swiper(this, config);
  });
}

function updateVerticalCounter(swiper) {
  const currentIndex = swiper.realIndex + 1;
  const totalSlides = swiper.slides.length;

  const counter = document.querySelector(".slider-vertical-counter");
  if (!counter) return;
  const topNumEl = counter.querySelector(".number.top");
  const bottomNumEl = counter.querySelector(".number.bottom");
  const lines = counter.querySelectorAll(".line");
  if (topNumEl) {
    topNumEl.textContent = String(currentIndex).padStart(2, "0");
  }

  if (bottomNumEl) {
    bottomNumEl.textContent = String(totalSlides).padStart(2, "0");
  }
  lines.forEach((line, idx) => {
    line.classList.toggle("active", idx === swiper.realIndex);
    if (!line.dataset.binded) {
      line.dataset.binded = "true";
      line.addEventListener("click", () => {
        swiper.slideToLoop(idx);
      });
    }
  });
}
function lockCounterNoNaN(scope = document) {
  scope.querySelectorAll(".slider-vertical-counter").forEach((counter) => {
    const top = counter.querySelector(".number.top");
    const bottom = counter.querySelector(".number.bottom");
    if (!top || !bottom) return;

    const topDefault = top.textContent.trim() || "01";
    const bottomDefault = bottom.textContent.trim() || "01";

    const fixIfNaN = () => {
      const t = top.textContent.trim();
      const b = bottom.textContent.trim();

      if (t === "NaN" || t === "" || t === "00") top.textContent = topDefault;
      if (b === "NaN" || b === "" || b === "00") bottom.textContent = bottomDefault;
    };
    fixIfNaN();
    const mo = new MutationObserver(fixIfNaN);
    mo.observe(top, { childList: true, characterData: true, subtree: true });
    mo.observe(bottom, { childList: true, characterData: true, subtree: true });
  });
}

var mainSlider = new Swiper(".mainslider", {
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  speed: 500,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination5",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => lockCounterNoNaN());

var mainSlider1 = new Swiper(".mainslider1", {
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  speed: 500,
  effect: "fade",
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      updateVerticalCounter(this);
    },
    slideChange: function () {
      updateVerticalCounter(this);
    },
  },
});
var mainslider2 = new Swiper(".mainslider2", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  on: {
    slideChange: function () {
      var currentSlide = this.realIndex + 1;
      var totalSlides = this.snapGrid.length;
      $('.slider-vertical-counter .number.top').text(
        (currentSlide < 10 ? '0' : '') + currentSlide
      );
      $('.slider-vertical-counter .number.bottom').text(
        (totalSlides < 10 ? '0' : '') + totalSlides
      );
    },
    init: function () {
      var totalSlides = this.snapGrid.length;
      $('.slider-vertical-counter .number.bottom').text(
        (totalSlides < 10 ? '0' : '') + totalSlides
      );
    }
  },
});
var carSwiper = new Swiper(".carSwiper", {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  spaceBetween: 15,
  speed: 600,
  navigation: {
    nextEl: ".car-next",
    prevEl: ".car-prev",
  },
  breakpoints: {
    1200: { slidesPerView: 3, spaceBetween: 30 },
  },
});


var mainSwiper = new Swiper(".carousel-testi", {
  observeParents: true,
  spaceBetween: 0,
  slidesPerView: 1,
  pagination: {
    el: ".carousel-testi-pagi",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-testi",
    prevEl: ".swiper-button-prev-testi",
  },

});
var thumbSwiper = new Swiper(".carousel-testi-thumb", {
  slidesPerView: 1,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  spaceBetween: 0,
});
thumbSwiper.controller.control = mainSwiper;
mainSwiper.controller.control = thumbSwiper;
var thumbSwiper2 = new Swiper(".carousel-testi-thumb2", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  loopAdditionalSlides: 3,
  watchSlidesProgress: true,
  speed: 800,
});

var mainSwiper2 = new Swiper(".carousel-testi2", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  loopAdditionalSlides: 3,
  speed: 800,

  navigation: {
    nextEl: ".swiper-button-next-testi",
    prevEl: ".swiper-button-prev-testi",
  },

  pagination: {
    el: ".sw-pagination-categories",
    clickable: true,
  },
});

thumbSwiper2.controller.control = mainSwiper2;
mainSwiper2.controller.control = thumbSwiper2;
const thumbs = document.querySelectorAll(".group-thumb .list-img img");
thumbs.forEach((img, index) => {
  img.addEventListener("click", () => {
    mainSwiper2.slideToLoop(index);
  });
});

mainSwiper2.on("slideChange", function () {
  const realIndex = mainSwiper2.realIndex;

  thumbs.forEach((img) => img.classList.remove("active"));
  if (thumbs[realIndex]) {
    thumbs[realIndex].classList.add("active");
  }
});
var thumbSwiper3 = new Swiper(".carousel-testi-thumb-img", {
  slidesPerView: 3,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  spaceBetween: 12,
});
thumbSwiper2.controller.control = mainSwiper2;
mainSwiper2.controller.control = thumbSwiper2;

var thumbSwiper_home9 = new Swiper(".carousel-testi-thumb-2", {
  slidesPerView: 4,
  spaceBetween: 48,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    991: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  },
});
var mainSwiper_home9 = new Swiper(".carousel-testi-2", {
  slidesPerView: 1,
  spaceBetween: 0,
  observeParents: true,
  observer: true,

  pagination: {
    el: ".carousel-testi-pagi",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next-testi",
    prevEl: ".swiper-button-prev-testi",
  },

  thumbs: {
    swiper: thumbSwiper_home9,
  },
});
var thumbsSwiper = new Swiper(".slider-listing-details1", {
  direction: "horizontal",
  slidesPerView: 4,
  spaceBetween: 8,
  freeMode: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  breakpoints: {
    768: {
      direction: "vertical",
      centeredSlides: false,
      centeredSlidesBounds: true
    }
  }
});


var mainSwiper = new Swiper(".slider-listing-details2", {
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: thumbsSwiper,
  },
});

var thumbsSwiper = new Swiper(".slider-listing-details5", {
  slidesPerView: 4,
  spaceBetween: 8,
  freeMode: true,
  watchSlidesProgress: true,
  grabCursor: true,
});
var mainSwiper = new Swiper(".slider-listing-details3", {
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: thumbsSwiper,
  },
});
var swiper = new Swiper(".slider-listing-details4", {
  slidesPerView: 4,
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagi-details4",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  },
});
var swiper = new Swiper(".slider-listing-details6", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
