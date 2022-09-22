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

eval("/*\nImage slider\nAgain, there’s not much instruction needed here - just practice.\n\n1) arrows on each side to advance the image forward or backward\n2) automatically move forward every 5 seconds.\n3) little navigation circles at the bottom that indicate which slide you are on (and they should be click-able to advance to that particular slide).\n\nSet up a very wide div which will contain the individual “slides” of each image. By appropriately positioning that div inside a container div (which acts like a picture frame), you can choose which slide is visible at any given time.\n\nOnce you have the slider positioned properly, build functions for “next” and “previous” which will advance to the next or previous slide accordingly. Make the transitions smooth using simple effects.\n\nSet up arrow buttons which activate those functions and play with cycling through the images.\n\nAdd in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are. Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.\n\nAdd a timeout which advances the slides every 5 seconds.\nPlay around with your slideshow!\n\n*/\n\nconsole.log('slider v zdanii');\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  function getDimensions(target = '#slider-container') {\n    const sliderContainer = document.querySelector(target);\n    const slideScreenDimensions = {\n      left: sliderContainer.offsetLeft,\n      width: sliderContainer.offsetWidth,\n      right: sliderContainer.offsetLeft\n        + sliderContainer.offsetWidth,\n      height: sliderContainer.offsetHeight,\n    };\n    return slideScreenDimensions;\n  }\n\n  const slides = document.querySelectorAll('.slide');\n  const slidesArray = [...slides];\n\n  let current = -1;\n  let previous;\n  let next;\n  setInterval(\n    () => {\n      current += 1;\n      const slideScreenDimensions = getDimensions();\n\n      if (current === slidesArray.length) {\n        current = 0;\n      }\n\n      if (current === slidesArray.length - 1) {\n        next = 0;\n      } else {\n        next = current + 1;\n      }\n\n      if (current === 0) {\n        previous = slidesArray.length - 1;\n      } else {\n        previous = current - 1;\n      }\n\n      slidesArray[current].style = `\n          position: absolute;\n          left: ${slideScreenDimensions.right + slideScreenDimensions.left}px;\n          opacity: 1;\n      `;\n\n      // STRANGE BEHAVIOR,\n      // WHY ON 2 circle images come from LEFT!!,\n      // BUT NOT FROM RIGHT\n\n      setTimeout(\n        () => {\n          // slidesArray[next].style = `\n          //   position: absolute;\n          //   left: ${\n          //     slideScreenDimensions.left\n          //       - 2 * slideScreenDimensions.width\n          //   }px;\n          //   opacity: 1;\n          // `;\n\n          slidesArray[previous].style = `\n          position: absolute;\n          left: ${-slideScreenDimensions.left - slideScreenDimensions.width}px;\n          opacity: 1;\n        `;\n\n          setTimeout(\n            () => {\n              slidesArray[previous].style = `\n            opacity: 0;\n          `;\n            },\n            1000,\n          );\n\n          slidesArray[current].style = `\n          position: absolute;\n          left: ${slideScreenDimensions.left}px;\n          opacity: 1;\n        `;\n        },\n        100,\n      );\n    },\n    2000,\n  );\n\n  // setInterval(() => {\n  //   const slideScreenDimensions = getDimensions();\n\n  //   if (current === slidesArray.length) {\n  //     current = 0;\n  //   } else {\n  //     if (current === 0) {\n  //       previous = slidesArray.length - 1;\n  //     } else {\n  //       previous = current - 1;\n  //     }\n\n  //     // eslint-disable-next-line no-plusplus\n  //     try {\n  //       // slidesArray[previous].style.opacity = '1';\n\n  //     // eslint-disable-next-line no-empty\n  //     } catch {\n  //       // slidesArray[slidesArray.length - 1].style.opacity = '0';\n  //     } finally {\n  //       // slidesArray[current].style =\n  //       // `position: absolute; left: ${slideScreenDimensions.right}px`;\n\n  //       setTimeout(() => {\n  //         // slidesArray[previous].style = `\n  //         //   position: absolute;\n  //         //   left: -${slideScreenDimensions.width}px\n  //         // `;\n  //         // slidesArray[current].style.opacity = '1';\n  //         slidesArray[current].style = `\n  //           position: absolute;\n  //           left: ${slideScreenDimensions.left}px\n  //         `;\n  //       }, 100);\n  //     }\n  //     current += 1;\n  //   }\n  // }, 2000);\n});\n\n\n//# sourceURL=webpack://dynamic_interface/./src/slider.js?");

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