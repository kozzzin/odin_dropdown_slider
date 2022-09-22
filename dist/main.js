/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ \"./src/slider.js\");\n/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slider__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable no-console */\n\n\nconst configs = {\n  dropButtonClass: 'drop-down',\n  dropdownClass: 'drop-down-child',\n  dropdownNames: [\n    'one',\n    'two',\n    'three',\n  ],\n  dropdownInterval: 300,\n};\n\nclass DropDownMenu {\n  constructor({\n    dropButtonClass,\n    dropdownClass,\n    dropdownNames,\n    dropdownInterval,\n  }) {\n    this.dropButtonClass = dropButtonClass;\n    this.dropdownClass = dropdownClass;\n    this.dropdownNames = dropdownNames;\n    this.dropdownInterval = dropdownInterval;\n    this.interval = 0;\n  }\n\n  addListener() {\n    const dropdownButton = document.querySelector(`.${this.dropButtonClass}`);\n    dropdownButton.addEventListener(\n      'click',\n      (event) => {\n        // eslint-disable-next-line no-console\n        const targetProps = {\n          left: event.target.offsetLeft,\n          top: event.target.offsetTop,\n          width: event.target.offsetWidth,\n          height: event.target.offsetHeight,\n        };\n\n        const dropDownChild = document.createElement('ul');\n        dropDownChild.classList.add('drop-down-child');\n        dropDownChild.style = `\n          top: ${targetProps.top +\n            targetProps.height + 1}px;\n          left: ${targetProps.left}px;\n          width: ${targetProps.width}px;\n        `;\n\n        document.querySelector('body').append(dropDownChild);\n\n        this.showSubButtons();\n\n        setTimeout(\n          () => {\n            this.closeListener.call(this);\n          },\n          this.dropdownInterval *\n            this.dropdownNames.length,\n        );\n      },\n      {\n        once: true,\n      },\n    );\n  }\n\n  closeListener() {\n    document.addEventListener(\n      'click',\n      () => {\n        // eslint-disable-next-line no-console\n        // if target isn't inside a sub-menu\n        document.querySelector('.drop-down-child').remove();\n        this.addListener();\n      },\n      {\n        once: true,\n      },\n    );\n  }\n\n  showSubButtons() {\n    const namesList = [...this.dropdownNames];\n    this.setMyInterval(\n      this.addSubButton(namesList),\n      this.dropdownInterval,\n    );\n  }\n\n  addSubButton(ddNamesList1) {\n    return (ddNamesList = ddNamesList1) => {\n      const nextText = ddNamesList.shift();\n      const nextLi = document.createElement('li');\n      nextLi.innerText = nextText;\n      nextLi.style.opacity = 0;\n      document.querySelector(`.${this.dropdownClass}`).append(nextLi);\n\n      setTimeout(() => {\n        nextLi.style.opacity = '1';\n      }, 10);\n\n      if (ddNamesList.length > 0) {\n        return true;\n      }\n\n      return false;\n    }\n  }\n\n  setMyInterval(action, time) {\n    this.interval = setInterval(\n      () => {\n        const actionResult = action();\n        if (!actionResult) {\n          this.clearMyInterval(\n            this.interval,\n          );\n        }\n      },\n      time,\n    );\n  }\n\n  // eslint-disable-next-line class-methods-use-this\n  clearMyInterval(name) {\n    clearInterval(name);\n  }\n\n  run() {\n    document.addEventListener(\n      'DOMContentLoaded',\n      () => {\n        this.addListener();\n      },\n    );\n  }\n}\n\nconst menu = new DropDownMenu(configs);\nmenu.run();\n\n\n\n\n//# sourceURL=webpack://dynamic_interface/./src/index.js?");

/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ (() => {

eval("/* eslint-disable operator-linebreak */\n/* eslint-disable max-classes-per-file */\nfunction getDimensions(target = '#slider-container') {\n  const sliderContainer = document.querySelector(target);\n  const slideScreenDimensions = {\n    left: sliderContainer.offsetLeft,\n    width: sliderContainer.offsetWidth,\n    right: sliderContainer.offsetLeft +\n      sliderContainer.offsetWidth,\n    height: sliderContainer.offsetHeight,\n  };\n  return slideScreenDimensions;\n}\n\nclass RoundSliderButtons {\n  constructor(\n    {\n      target,\n      buttonsContainerClass,\n      buttonClass,\n      buttonActiveClass,\n      slides,\n    },\n  ) {\n    this.target = target;\n    this.buttonsContainerClass = buttonsContainerClass;\n    this.buttonClass = buttonClass;\n    this.buttonActiveClass = buttonActiveClass;\n    this.slides = slides;\n  }\n\n  buttonClick(event) {\n    console.log(event.target.getAttribute('data-id'));\n  }\n\n  createButtons() {\n    const buttonsContainer = document.createElement('div');\n    console.log(this.buttonsContainerClass);\n    buttonsContainer.classList.add(this.buttonsContainerClass);\n\n    const buttons = [...this.slides]\n      .map((el, index) => `<div class=\"${this.buttonClass}\"`\n        + 'onclick=\"buttonClick(event)\"'\n        + `data-id=\"${index}\"></div>`)\n      .join('');\n\n    buttonsContainer.innerHTML = buttons;\n\n    return buttonsContainer;\n  }\n\n  showButtons(createButtonsFunc = this.createButtons.bind(this)) {\n    console.log(this.buttonsContainerClass);\n    document.querySelector(this.target)\n      .append(\n        createButtonsFunc(),\n      );\n  }\n\n  makeButtonActive(index) {\n    try {\n      document.querySelector(`.button.${this.buttonActiveClass}`)\n        .classList.remove('active');\n    // eslint-disable-next-line no-empty\n    } catch {\n      document.querySelector('[data-id=\"0\"]')\n        .classList.add('active');\n    } finally {\n      document.querySelector(`[data-id=\"${index}\"]`)\n        .classList.add(this.buttonActiveClass);\n    }\n  }\n}\n\nclass Slider {\n  constructor(\n    {\n      sliderContainer,\n      slidesSliderClass,\n      slideClass,\n    },\n  ) {\n    this.sliderContainer = sliderContainer;\n    this.slidesArray = [...document.querySelectorAll(slideClass)];\n    this.slidesDiv = document.querySelector(slidesSliderClass);\n    this.buttons = this.addButtons();\n    this.interval = undefined;\n  }\n\n  addButtons() {\n    return new RoundSliderButtons(\n      {\n        target: '#slider-container',\n        buttonsContainerClass: 'mini-buttons',\n        buttonClass: 'button',\n        buttonActiveClass: 'active',\n        slides: this.slidesArray,\n      },\n    );\n  }\n\n  buttonClick(event) {\n    const id = event.target.getAttribute('data-id');\n    clearInterval(this.interval);\n    this.slideOn(id);\n    setTimeout(\n      () => {\n        this.slideShow(id);\n      },\n      1000,\n    );\n  }\n\n  addArrows() {\n    const rightSign = String.fromCharCode(0x276F);\n    const leftSign = String.fromCharCode(0x276E);\n    console.log(leftSign);\n    console.log(rightSign);\n\n    const left = document.createElement('div');\n    left.classList.add('arrows', 'arrow-left');\n    const right = document.createElement('div');\n    right.classList.add('arrows', 'arrow-right');\n\n    left.innerHTML = leftSign;\n    right.innerHTML = rightSign;\n\n    document.querySelector(this.sliderContainer)\n      .append(left, right);\n  }\n\n  nextSlide() {\n\n  }\n\n  previousSlide() {\n\n  }\n\n  slideOn(num) {\n    this.buttons.makeButtonActive(num);\n    const slideDimensions = this.getDimensions();\n    this.slidesDiv.style = `\n      margin-left: -${slideDimensions.width * num}px;\n    `;\n  }\n\n  slideShow(start = 0) {\n    let current = start - 1;\n\n    this.interval = setInterval(\n      () => {\n        if (current === this.slidesArray.length - 1) {\n          current = -1;\n        }\n        current += 1;\n\n        this.slideOn(current);\n      },\n      3000,\n    );\n  }\n\n  run() {\n    this.buttons.showButtons();\n    this.addArrows();\n    this.slideShow();\n  }\n\n  getDimensions(target = this.sliderContainer) {\n    const sliderContainer = document.querySelector(target);\n    const slideScreenDimensions = {\n      left: sliderContainer.offsetLeft,\n      width: sliderContainer.offsetWidth,\n      right: sliderContainer.offsetLeft\n            + sliderContainer.offsetWidth,\n      height: sliderContainer.offsetHeight,\n    };\n    return slideScreenDimensions;\n  }\n}\n\ndocument.addEventListener(\n  'DOMContentLoaded',\n  () => {\n    const slider = new Slider(\n      {\n        sliderContainer: '#slider-container',\n        slidesSliderClass: '#slider-slides',\n        slideClass: '.slide',\n      },\n    );\n    slider.run();\n\n    window.buttonClick = slider.buttonClick.bind(slider);\n  },\n);\n\n// document.addEventListener(\n//   'DOMContentLoaded',\n//   () => {\n//     // const slides = document.querySelectorAll('.slide');\n//     const slides = document.querySelectorAll('.slide');\n//     const slidesDiv = document.querySelector('#slider-slides');\n\n//     const slidesArray = [...slides];\n\n//     const buttons = new RoundSliderButtons(\n//       {\n//         target: '#slider-container',\n//         buttonsContainerClass: 'mini-buttons',\n//         buttonClass: 'button',\n//         buttonActiveClass: 'active',\n//         slides: slidesArray,\n//       },\n//     );\n\n//     buttons.showButtons();\n\n//     let current = -1;\n\n//     setInterval(\n//       () => {\n//         if (current === slidesArray.length - 1) {\n//           current = -1;\n//         }\n//         current += 1;\n\n//         buttons.makeButtonActive(current);\n\n//         const slideDimensions = getDimensions();\n//         slidesDiv.style = `\n//           margin-left: -${slideDimensions.width * current}px;\n//         `;\n//       },\n//       3000,\n//     );\n//   },\n// );\n\n// /*\n// Image slider\n// Again, there’s not much instruction needed here - just practice.\n\n// 1) arrows on each side to advance the image forward or backward\n// 2) automatically move forward every 5 seconds.\n// 3) little navigation circles at the bottom that indicate which slide you are on (and they should be click-able to advance to that particular slide).\n\n// Set up a very wide div which will contain the individual “slides” of each image. By appropriately positioning that div inside a container div (which acts like a picture frame), you can choose which slide is visible at any given time.\n\n// Once you have the slider positioned properly, build functions for “next” and “previous” which will advance to the next or previous slide accordingly. Make the transitions smooth using simple effects.\n\n// Set up arrow buttons which activate those functions and play with cycling through the images.\n\n// Add in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are. Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.\n\n// Add a timeout which advances the slides every 5 seconds.\n// Play around with your slideshow!\n\n// */\n\n// console.log('slider v zdanii');\n\n// document.addEventListener('DOMContentLoaded', () => {\n//   function getDimensions(target = '#slider-container') {\n//     const sliderContainer = document.querySelector(target);\n//     const slideScreenDimensions = {\n//       left: sliderContainer.offsetLeft,\n//       width: sliderContainer.offsetWidth,\n//       right: sliderContainer.offsetLeft\n//         + sliderContainer.offsetWidth,\n//       height: sliderContainer.offsetHeight,\n//     };\n//     return slideScreenDimensions;\n//   }\n\n//   const slides = document.querySelectorAll('.slide');\n//   const slidesArray = [...slides];\n\n//   let current = -1;\n//   let previous;\n//   let next;\n//   setInterval(\n//     () => {\n//       current += 1;\n//       const slideScreenDimensions = getDimensions();\n\n//       if (current === slidesArray.length) {\n//         current = 0;\n//       }\n\n//       if (current === slidesArray.length - 1) {\n//         next = 0;\n//       } else {\n//         next = current + 1;\n//       }\n\n//       if (current === 0) {\n//         previous = slidesArray.length - 1;\n//       } else {\n//         previous = current - 1;\n//       }\n\n//       slidesArray[current].style = `\n//           position: absolute;\n//           left: ${slideScreenDimensions.right + slideScreenDimensions.left}px;\n//           opacity: 0;\n//       `;\n\n//       // STRANGE BEHAVIOR,\n//       // WHY ON 2 circle images come from LEFT!!,\n//       // BUT NOT FROM RIGHT\n\n//       setTimeout(\n//         () => {\n//           slidesArray[previous].style = `\n//           position: absolute;\n//           left: ${-slideScreenDimensions.left - slideScreenDimensions.width}px;\n//           opacity: 1;\n//         `;\n\n//           setTimeout(\n//             () => {\n//               slidesArray[previous].style = `\n//                 opacity: 0;\n//               `;\n//             },\n//             1000,\n//           );\n\n//           slidesArray[current].style = `\n//           position: absolute;\n//           left: ${slideScreenDimensions.left}px;\n//           opacity: 1;\n//         `;\n//         },\n//         100,\n//       );\n//     },\n//     2000,\n//   );\n\n//   // setInterval(() => {\n//   //   const slideScreenDimensions = getDimensions();\n\n//   //   if (current === slidesArray.length) {\n//   //     current = 0;\n//   //   } else {\n//   //     if (current === 0) {\n//   //       previous = slidesArray.length - 1;\n//   //     } else {\n//   //       previous = current - 1;\n//   //     }\n\n//   //     // eslint-disable-next-line no-plusplus\n//   //     try {\n//   //       // slidesArray[previous].style.opacity = '1';\n\n//   //     // eslint-disable-next-line no-empty\n//   //     } catch {\n//   //       // slidesArray[slidesArray.length - 1].style.opacity = '0';\n//   //     } finally {\n//   //       // slidesArray[current].style =\n//   //       // `position: absolute; left: ${slideScreenDimensions.right}px`;\n\n//   //       setTimeout(() => {\n//   //         // slidesArray[previous].style = `\n//   //         //   position: absolute;\n//   //         //   left: -${slideScreenDimensions.width}px\n//   //         // `;\n//   //         // slidesArray[current].style.opacity = '1';\n//   //         slidesArray[current].style = `\n//   //           position: absolute;\n//   //           left: ${slideScreenDimensions.left}px\n//   //         `;\n//   //       }, 100);\n//   //     }\n//   //     current += 1;\n//   //   }\n//   // }, 2000);\n// });\n\n\n//# sourceURL=webpack://dynamic_interface/./src/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;