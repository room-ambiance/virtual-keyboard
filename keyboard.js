const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    //create html for main/keyContainer elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //add class to main/keysContainer elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    //append to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space"
    ];

    const createIcon = icon_name => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    //loop over and create a button element for each key
    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertBr = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      //add key attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--tab");
          keyElement.innerHTML = createIcon("keyboard_backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--tab", "keyboard__key--activatable");
          keyElement.innerHTML = createIcon("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this.toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--tab");
          keyElement.innerHTML = createIcon("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this.triggerEvents("ominput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--spacebar");
          keyElement.innerHTML = createIcon("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this.triggerEvents(oninput);
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--tab");
          keyElement.innerHTML = createIcon("keyboard_hide");
          keyElement.addEventListener("click", () => {
            this.close();
            this.triggerEvents("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvents("oninput");
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertBr) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  triggerEvents(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initValue, onclose, oninput) {
    this.properties.value = initValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", () => Keyboard.init());
