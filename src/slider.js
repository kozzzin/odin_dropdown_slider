/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable max-classes-per-file */
function getDimensions(target = '#slider-container') {
  const sliderContainer = document.querySelector(target);
  const slideScreenDimensions = {
    left: sliderContainer.offsetLeft,
    width: sliderContainer.offsetWidth,
    right: sliderContainer.offsetLeft +
      sliderContainer.offsetWidth,
    height: sliderContainer.offsetHeight,
  };
  return slideScreenDimensions;
}

class RoundSliderButtons {
  constructor(
    {
      target,
      buttonsContainerClass,
      buttonClass,
      buttonActiveClass,
      slides,
    },
  ) {
    this.target = target;
    this.buttonsContainerClass = buttonsContainerClass;
    this.buttonClass = buttonClass;
    this.buttonActiveClass = buttonActiveClass;
    this.slides = slides;
  }

  createButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add(this.buttonsContainerClass);

    const buttons = [...this.slides]
      .map((el, index) => `<div class="${this.buttonClass}"`
        + 'onclick="buttonClick(event)"'
        + `data-id="${index}"></div>`)
      .join('');

    buttonsContainer.innerHTML = buttons;

    return buttonsContainer;
  }

  showButtons(createButtonsFunc = this.createButtons.bind(this)) {
    document.querySelector(this.target)
      .append(
        createButtonsFunc(),
      );
  }

  makeButtonActive(index) {
    try {
      document.querySelector(`.button.${this.buttonActiveClass}`)
        .classList.remove('active');
    // eslint-disable-next-line no-empty
    } catch {
      document.querySelector('[data-id="0"]')
        .classList.add('active');
    } finally {
      document.querySelector(`[data-id="${index}"]`)
        .classList.add(this.buttonActiveClass);
    }
  }
}

class Slider {
  constructor(
    {
      sliderContainer,
      slidesSliderClass,
      slideClass,
      slideDuration,
    },
  ) {
    this.sliderContainer = sliderContainer;
    this.slidesArray = [...document.querySelectorAll(slideClass)];
    this.slidesDiv = document.querySelector(slidesSliderClass);
    this.buttons = this.addButtons();
    this.interval = [];
    this.slideDuration = slideDuration;
    this.currentSlide = undefined;
  }

  calculateCurrentSlideIndex(index = this.currentSlide) {
    this.currentSlide = index;

    if (this.currentSlide === undefined) {
      this.currentSlide = -1;
    }

    if (this.currentSlide > this.slidesArray.length - 1) {
      this.currentSlide = -1;
    }

    if (this.currentSlide < -1) {
      this.currentSlide = this.slidesArray.length - 1;
    }
  }

  clearAllIntervals() {
    this.interval =
      this.interval.reduce(
        (arr, interval) => {
          clearInterval(interval);
          return arr;
        },
        [],
      );
  }

  addButtons() {
    return new RoundSliderButtons(
      {
        target: '#slider-container',
        buttonsContainerClass: 'mini-buttons',
        buttonClass: 'button',
        buttonActiveClass: 'active',
        slides: this.slidesArray,
      },
    );
  }

  buttonClick(event) {
    const id = event.target.getAttribute('data-id');
    this.newSlide(id);
    
  }

  newSlide(id) {
    this.clearAllIntervals();
    this.slideOn(id);
    setTimeout(
      () => {
        this.clearAllIntervals();
        this.slideShow(id);
      },
      5000,
    );
  }

  addArrows() {
    const rightSign = String.fromCharCode(0x276F);
    const leftSign = String.fromCharCode(0x276E);
    const left = document.createElement('div');
    left.classList.add('arrows', 'arrow-left');
    left.innerHTML = leftSign;
    left.setAttribute('onClick', 'previousSlide()');
    const right = document.createElement('div');
    right.classList.add('arrows', 'arrow-right');
    right.innerHTML = rightSign;
    right.setAttribute('onClick', 'nextSlide()');

    document.querySelector(this.sliderContainer)
      .append(left, right);
  }

  nextSlide() {
    this.newSlide(this.currentSlide += 1);
  }

  previousSlide() {
    this.newSlide(this.currentSlide -= 1);
  }

  checkButtonIndex(index) {
    if (index < -1) {
      index = this.slidesArray.length - 1;
    } else if (index === -1) {
      index = 0;
    } else if (index === this.slidesArray.length) {
      index = 0;
    }
    return index;
  }

  slideOn(index) {
    const slideDimensions = this.getDimensions();
    this.calculateCurrentSlideIndex(index);
    this.slidesDiv.style = `
      margin-left: -${slideDimensions.width * this.currentSlide}px;
    `;
    this.buttons.makeButtonActive(
      this.checkButtonIndex(this.currentSlide),
    );
  }

  slideShow(start = 0) {
    this.calculateCurrentSlideIndex(start - 1);
    this.interval.push(
      setInterval(
        () => {
          this.calculateCurrentSlideIndex();

          this.currentSlide += 1;

          this.slideOn(this.currentSlide);
        },
        this.slideDuration,
      ),
    );
  }

  run() {
    this.slideShow();
    setTimeout(
      () => {
        this.buttons.showButtons();
        this.addArrows();
      },
      this.slideDuration - 10,
    );
  }

  getDimensions(target = this.sliderContainer) {
    const sliderContainer = document.querySelector(target);
    const slideScreenDimensions = {
      left: sliderContainer.offsetLeft,
      width: sliderContainer.offsetWidth,
      right: sliderContainer.offsetLeft
            + sliderContainer.offsetWidth,
      height: sliderContainer.offsetHeight,
    };
    return slideScreenDimensions;
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const slider = new Slider(
      {
        sliderContainer: '#slider-container',
        slidesSliderClass: '#slider-slides',
        slideClass: '.slide',
        slideDuration: 5000,
      },
    );
    slider.run();

    window.buttonClick = slider.buttonClick.bind(slider);
    window.nextSlide = slider.nextSlide.bind(slider);
    window.previousSlide = slider.previousSlide.bind(slider);
  },
);
