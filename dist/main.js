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

eval("/* eslint-disable no-param-reassign */\n/* eslint-disable operator-linebreak */\n/* eslint-disable max-classes-per-file */\nfunction getDimensions(target = '#slider-container') {\n  const sliderContainer = document.querySelector(target);\n  const slideScreenDimensions = {\n    left: sliderContainer.offsetLeft,\n    width: sliderContainer.offsetWidth,\n    right: sliderContainer.offsetLeft +\n      sliderContainer.offsetWidth,\n    height: sliderContainer.offsetHeight,\n  };\n  return slideScreenDimensions;\n}\n\nclass RoundSliderButtons {\n  constructor(\n    {\n      target,\n      buttonsContainerClass,\n      buttonClass,\n      buttonActiveClass,\n      slides,\n    },\n  ) {\n    this.target = target;\n    this.buttonsContainerClass = buttonsContainerClass;\n    this.buttonClass = buttonClass;\n    this.buttonActiveClass = buttonActiveClass;\n    this.slides = slides;\n  }\n\n  createButtons() {\n    const buttonsContainer = document.createElement('div');\n    buttonsContainer.classList.add(this.buttonsContainerClass);\n\n    const buttons = [...this.slides]\n      .map((el, index) => `<div class=\"${this.buttonClass}\"`\n        + 'onclick=\"buttonClick(event)\"'\n        + `data-id=\"${index}\"></div>`)\n      .join('');\n\n    buttonsContainer.innerHTML = buttons;\n\n    return buttonsContainer;\n  }\n\n  showButtons(createButtonsFunc = this.createButtons.bind(this)) {\n    document.querySelector(this.target)\n      .append(\n        createButtonsFunc(),\n      );\n  }\n\n  makeButtonActive(index) {\n    try {\n      document.querySelector(`.button.${this.buttonActiveClass}`)\n        .classList.remove('active');\n    // eslint-disable-next-line no-empty\n    } catch {\n      document.querySelector('[data-id=\"0\"]')\n        .classList.add('active');\n    } finally {\n      document.querySelector(`[data-id=\"${index}\"]`)\n        .classList.add(this.buttonActiveClass);\n    }\n  }\n}\n\nclass Slider {\n  constructor(\n    {\n      sliderContainer,\n      slidesSliderClass,\n      slideClass,\n      slideDuration,\n    },\n  ) {\n    this.sliderContainer = sliderContainer;\n    this.slidesArray = [...document.querySelectorAll(slideClass)];\n    this.slidesDiv = document.querySelector(slidesSliderClass);\n    this.buttons = this.addButtons();\n    this.interval = [];\n    this.slideDuration = slideDuration;\n    this.currentSlide = undefined;\n  }\n\n  calculateCurrentSlideIndex(index = this.currentSlide) {\n    this.currentSlide = index;\n\n    if (this.currentSlide === undefined) {\n      this.currentSlide = -1;\n    }\n\n    if (this.currentSlide > this.slidesArray.length - 1) {\n      this.currentSlide = -1;\n    }\n\n    if (this.currentSlide < -1) {\n      this.currentSlide = this.slidesArray.length - 1;\n    }\n  }\n\n  clearAllIntervals() {\n    this.interval =\n      this.interval.reduce(\n        (arr, interval) => {\n          clearInterval(interval);\n          return arr;\n        },\n        [],\n      );\n  }\n\n  addButtons() {\n    return new RoundSliderButtons(\n      {\n        target: '#slider-container',\n        buttonsContainerClass: 'mini-buttons',\n        buttonClass: 'button',\n        buttonActiveClass: 'active',\n        slides: this.slidesArray,\n      },\n    );\n  }\n\n  buttonClick(event) {\n    const id = event.target.getAttribute('data-id');\n    this.newSlide(id);\n    \n  }\n\n  newSlide(id) {\n    this.clearAllIntervals();\n    this.slideOn(id);\n    setTimeout(\n      () => {\n        this.clearAllIntervals();\n        this.slideShow(id);\n      },\n      5000,\n    );\n  }\n\n  addArrows() {\n    const rightSign = String.fromCharCode(0x276F);\n    const leftSign = String.fromCharCode(0x276E);\n    const left = document.createElement('div');\n    left.classList.add('arrows', 'arrow-left');\n    left.innerHTML = leftSign;\n    left.setAttribute('onClick', 'previousSlide()');\n    const right = document.createElement('div');\n    right.classList.add('arrows', 'arrow-right');\n    right.innerHTML = rightSign;\n    right.setAttribute('onClick', 'nextSlide()');\n\n    document.querySelector(this.sliderContainer)\n      .append(left, right);\n  }\n\n  nextSlide() {\n    this.newSlide(this.currentSlide += 1);\n  }\n\n  previousSlide() {\n    this.newSlide(this.currentSlide -= 1);\n  }\n\n  checkButtonIndex(index) {\n    if (index < -1) {\n      index = this.slidesArray.length - 1;\n    } else if (index === -1) {\n      index = 0;\n    } else if (index === this.slidesArray.length) {\n      index = 0;\n    }\n    return index;\n  }\n\n  slideOn(index) {\n    const slideDimensions = this.getDimensions();\n    this.calculateCurrentSlideIndex(index);\n    this.slidesDiv.style = `\n      margin-left: -${slideDimensions.width * this.currentSlide}px;\n    `;\n    this.buttons.makeButtonActive(\n      this.checkButtonIndex(this.currentSlide),\n    );\n  }\n\n  slideShow(start = 0) {\n    this.calculateCurrentSlideIndex(start - 1);\n    this.interval.push(\n      setInterval(\n        () => {\n          this.calculateCurrentSlideIndex();\n\n          this.currentSlide += 1;\n\n          this.slideOn(this.currentSlide);\n        },\n        this.slideDuration,\n      ),\n    );\n  }\n\n  run() {\n    this.slideShow();\n    setTimeout(\n      () => {\n        this.buttons.showButtons();\n        this.addArrows();\n      },\n      this.slideDuration - 10,\n    );\n  }\n\n  getDimensions(target = this.sliderContainer) {\n    const sliderContainer = document.querySelector(target);\n    const slideScreenDimensions = {\n      left: sliderContainer.offsetLeft,\n      width: sliderContainer.offsetWidth,\n      right: sliderContainer.offsetLeft\n            + sliderContainer.offsetWidth,\n      height: sliderContainer.offsetHeight,\n    };\n    return slideScreenDimensions;\n  }\n}\n\ndocument.addEventListener(\n  'DOMContentLoaded',\n  () => {\n    const slider = new Slider(\n      {\n        sliderContainer: '#slider-container',\n        slidesSliderClass: '#slider-slides',\n        slideClass: '.slide',\n        slideDuration: 5000,\n      },\n    );\n    slider.run();\n\n    window.buttonClick = slider.buttonClick.bind(slider);\n    window.nextSlide = slider.nextSlide.bind(slider);\n    window.previousSlide = slider.previousSlide.bind(slider);\n  },\n);\n\n\n//# sourceURL=webpack://dynamic_interface/./src/slider.js?");

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