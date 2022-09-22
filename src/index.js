/* eslint-disable no-console */
import sliderModule from './slider';

const configs = {
  dropButtonClass: 'drop-down',
  dropdownClass: 'drop-down-child',
  dropdownNames: [
    'one',
    'two',
    'three',
  ],
  dropdownInterval: 300,
};

class DropDownMenu {
  constructor({
    dropButtonClass,
    dropdownClass,
    dropdownNames,
    dropdownInterval,
  }) {
    this.dropButtonClass = dropButtonClass;
    this.dropdownClass = dropdownClass;
    this.dropdownNames = dropdownNames;
    this.dropdownInterval = dropdownInterval;
    this.interval = 0;
  }

  addListener() {
    const dropdownButton = document.querySelector(`.${this.dropButtonClass}`);
    dropdownButton.addEventListener(
      'click',
      (event) => {
        // eslint-disable-next-line no-console
        const targetProps = {
          left: event.target.offsetLeft,
          top: event.target.offsetTop,
          width: event.target.offsetWidth,
          height: event.target.offsetHeight,
        };

        const dropDownChild = document.createElement('ul');
        dropDownChild.classList.add('drop-down-child');
        dropDownChild.style = `
          top: ${targetProps.top
            + targetProps.height + 1}px;
          left: ${targetProps.left}px;
          width: ${targetProps.width}px;
        `;

        document.querySelector('body').append(dropDownChild);

        this.showSubButtons();

        setTimeout(
          () => {
            this.closeListener.call(this);
          },
          this.dropdownInterval
            * this.dropdownNames.length,
        );
      },
      {
        once: true,
      },
    );
  }

  closeListener() {
    document.addEventListener(
      'click',
      () => {
        // eslint-disable-next-line no-console
        // if target isn't inside a sub-menu
        document.querySelector('.drop-down-child').remove();
        this.addListener();
      },
      {
        once: true,
      },
    );
  }

  showSubButtons() {
    const namesList = [...this.dropdownNames];
    this.setMyInterval(
      this.addSubButton(namesList),
      this.dropdownInterval,
    );
  }

  addSubButton(ddNamesList1) {
    return (ddNamesList = ddNamesList1) => {
      const nextText = ddNamesList.shift();
      const nextLi = document.createElement('li');
      nextLi.innerText = nextText;
      nextLi.style.opacity = 0;
      document.querySelector(`.${this.dropdownClass}`).append(nextLi);

      setTimeout(() => {
        nextLi.style.opacity = '1';
      }, 10);

      if (ddNamesList.length > 0) {
        return true;
      }

      return false;
    };
  }

  setMyInterval(action, time) {
    this.interval = setInterval(
      () => {
        const actionResult = action();
        if (!actionResult) {
          this.clearMyInterval(
            this.interval,
          );
        }
      },
      time,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  clearMyInterval(name) {
    clearInterval(name);
  }

  run() {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        this.addListener();
      },
    );
  }
}

const menu = new DropDownMenu(configs);
menu.run();

sliderModule();
