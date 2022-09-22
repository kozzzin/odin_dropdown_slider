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

  buttonClick(event) {
    console.log(event.target.getAttribute('data-id'));
  }

  createButtons() {
    const buttonsContainer = document.createElement('div');
    console.log(this.buttonsContainerClass);
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
    console.log(this.buttonsContainerClass);
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
    },
  ) {
    this.sliderContainer = sliderContainer;
    this.slidesArray = [...document.querySelectorAll(slideClass)];
    this.slidesDiv = document.querySelector(slidesSliderClass);
    this.buttons = this.addButtons();
    this.interval = undefined;
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
    clearInterval(this.interval);
    this.slideOn(id);
    setTimeout(
      () => {
        this.slideShow(id);
      },
      1000,
    );
  }

  addArrows() {
    const rightSign = String.fromCharCode(0x276F);
    const leftSign = String.fromCharCode(0x276E);
    console.log(leftSign);
    console.log(rightSign);

    const left = document.createElement('div');
    left.classList.add('arrows', 'arrow-left');
    const right = document.createElement('div');
    right.classList.add('arrows', 'arrow-right');

    left.innerHTML = leftSign;
    right.innerHTML = rightSign;

    document.querySelector(this.sliderContainer)
      .append(left, right);
  }

  nextSlide() {

  }

  previousSlide() {

  }

  slideOn(num) {
    this.buttons.makeButtonActive(num);
    const slideDimensions = this.getDimensions();
    this.slidesDiv.style = `
      margin-left: -${slideDimensions.width * num}px;
    `;
  }

  slideShow(start = 0) {
    let current = start - 1;

    this.interval = setInterval(
      () => {
        if (current === this.slidesArray.length - 1) {
          current = -1;
        }
        current += 1;

        this.slideOn(current);
      },
      3000,
    );
  }

  run() {
    this.buttons.showButtons();
    this.addArrows();
    this.slideShow();
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
      },
    );
    slider.run();

    window.buttonClick = slider.buttonClick.bind(slider);
  },
);

// document.addEventListener(
//   'DOMContentLoaded',
//   () => {
//     // const slides = document.querySelectorAll('.slide');
//     const slides = document.querySelectorAll('.slide');
//     const slidesDiv = document.querySelector('#slider-slides');

//     const slidesArray = [...slides];

//     const buttons = new RoundSliderButtons(
//       {
//         target: '#slider-container',
//         buttonsContainerClass: 'mini-buttons',
//         buttonClass: 'button',
//         buttonActiveClass: 'active',
//         slides: slidesArray,
//       },
//     );

//     buttons.showButtons();

//     let current = -1;

//     setInterval(
//       () => {
//         if (current === slidesArray.length - 1) {
//           current = -1;
//         }
//         current += 1;

//         buttons.makeButtonActive(current);

//         const slideDimensions = getDimensions();
//         slidesDiv.style = `
//           margin-left: -${slideDimensions.width * current}px;
//         `;
//       },
//       3000,
//     );
//   },
// );

// /*
// Image slider
// Again, there’s not much instruction needed here - just practice.

// 1) arrows on each side to advance the image forward or backward
// 2) automatically move forward every 5 seconds.
// 3) little navigation circles at the bottom that indicate which slide you are on (and they should be click-able to advance to that particular slide).

// Set up a very wide div which will contain the individual “slides” of each image. By appropriately positioning that div inside a container div (which acts like a picture frame), you can choose which slide is visible at any given time.

// Once you have the slider positioned properly, build functions for “next” and “previous” which will advance to the next or previous slide accordingly. Make the transitions smooth using simple effects.

// Set up arrow buttons which activate those functions and play with cycling through the images.

// Add in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are. Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.

// Add a timeout which advances the slides every 5 seconds.
// Play around with your slideshow!

// */

// console.log('slider v zdanii');

// document.addEventListener('DOMContentLoaded', () => {
//   function getDimensions(target = '#slider-container') {
//     const sliderContainer = document.querySelector(target);
//     const slideScreenDimensions = {
//       left: sliderContainer.offsetLeft,
//       width: sliderContainer.offsetWidth,
//       right: sliderContainer.offsetLeft
//         + sliderContainer.offsetWidth,
//       height: sliderContainer.offsetHeight,
//     };
//     return slideScreenDimensions;
//   }

//   const slides = document.querySelectorAll('.slide');
//   const slidesArray = [...slides];

//   let current = -1;
//   let previous;
//   let next;
//   setInterval(
//     () => {
//       current += 1;
//       const slideScreenDimensions = getDimensions();

//       if (current === slidesArray.length) {
//         current = 0;
//       }

//       if (current === slidesArray.length - 1) {
//         next = 0;
//       } else {
//         next = current + 1;
//       }

//       if (current === 0) {
//         previous = slidesArray.length - 1;
//       } else {
//         previous = current - 1;
//       }

//       slidesArray[current].style = `
//           position: absolute;
//           left: ${slideScreenDimensions.right + slideScreenDimensions.left}px;
//           opacity: 0;
//       `;

//       // STRANGE BEHAVIOR,
//       // WHY ON 2 circle images come from LEFT!!,
//       // BUT NOT FROM RIGHT

//       setTimeout(
//         () => {
//           slidesArray[previous].style = `
//           position: absolute;
//           left: ${-slideScreenDimensions.left - slideScreenDimensions.width}px;
//           opacity: 1;
//         `;

//           setTimeout(
//             () => {
//               slidesArray[previous].style = `
//                 opacity: 0;
//               `;
//             },
//             1000,
//           );

//           slidesArray[current].style = `
//           position: absolute;
//           left: ${slideScreenDimensions.left}px;
//           opacity: 1;
//         `;
//         },
//         100,
//       );
//     },
//     2000,
//   );

//   // setInterval(() => {
//   //   const slideScreenDimensions = getDimensions();

//   //   if (current === slidesArray.length) {
//   //     current = 0;
//   //   } else {
//   //     if (current === 0) {
//   //       previous = slidesArray.length - 1;
//   //     } else {
//   //       previous = current - 1;
//   //     }

//   //     // eslint-disable-next-line no-plusplus
//   //     try {
//   //       // slidesArray[previous].style.opacity = '1';

//   //     // eslint-disable-next-line no-empty
//   //     } catch {
//   //       // slidesArray[slidesArray.length - 1].style.opacity = '0';
//   //     } finally {
//   //       // slidesArray[current].style =
//   //       // `position: absolute; left: ${slideScreenDimensions.right}px`;

//   //       setTimeout(() => {
//   //         // slidesArray[previous].style = `
//   //         //   position: absolute;
//   //         //   left: -${slideScreenDimensions.width}px
//   //         // `;
//   //         // slidesArray[current].style.opacity = '1';
//   //         slidesArray[current].style = `
//   //           position: absolute;
//   //           left: ${slideScreenDimensions.left}px
//   //         `;
//   //       }, 100);
//   //     }
//   //     current += 1;
//   //   }
//   // }, 2000);
// });
