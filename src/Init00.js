//Iitialization module v.10.1.3 for bookshop prj
"use strict";
const cnst = {
    d7: document,
    loadDelay: 500,
    cardQuantity: 6,
    buttonClasId: "Btn",
    placeHolderSrc: "img/plcHldr.jpg",
  },
  //goods categories
  siList = [
    "Architecture",
    "Art & Fashion",
    "Biography",
    "Business",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Food & Drink",
    "Health & Wellbeing",
    "History & Politics",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology",
    "Travel & Maps",
  ],
  getProp2 = (DomElement, propertyName) => {
    let prVal = window
      .getComputedStyle(DomElement, null)
      .getPropertyValue(propertyName);
    if (prVal.match(/px/)) {
      prVal = Math.round(prVal.match(/\d+/)[0]);
    }
    return prVal;
  },
  //setting style properties
  setProp = (domEl, propObj) => {
  if (domEl) {
    const elementStyle = domEl.style;
    for (let prop in propObj) {
      elementStyle[prop] = propObj[prop];
    }
  };
  },
  //get header color from body background color
  headerColor = (function () {
    const body = cnst.d7.body,
      bodyColor = getProp2(body, "background-color"),
      headerWrap = cnst.d7.querySelector(".header_wrap");
    if (headerWrap) {
      let headerWrapStyle = headerWrap.style;

      if (bodyColor === "rgba(0, 0, 0, 0)") {
        headerWrapStyle.backgroundColor = "white";
      } else {
        headerWrapStyle.backgroundColor = bodyColor;
      }
    } else {
      return;
    }
  })(),
  //returns DOM element with className
  putEl = (className = "", innerContent = "", altTxt = "") => {
    let aux;
    if (altTxt) {
      aux = cnst.d7.createElement("img");
      aux.src = innerContent;
      aux.alt = altTxt;
    } else {
      if (className.match(cnst.buttonClasId)) {
        aux = cnst.d7.createElement("button");
      } else {
        aux = cnst.d7.createElement("div");
      }
      aux.innerHTML = innerContent;
    }
    if (className) {
      aux.className = className;
    }
    return aux;
  },
  // add 'px' to the input value
  plusPX = (value = 0) => {
    const px = "px ";
    if (isNaN(value)) {
      return "0" + px;
    } else {
      if (value > 1) {
        return Math.round(value) + px;
      } else {
        return value + px;
      }
    }
  },
  //cart to local store bridge
  processCart = (itemID = null, putToCart = false, emptyCart = false) => {
    const keyName = "cart9170436";
    let aux = localStorage.getItem(keyName),
      temp = [],
      putToCartEnable = true;
    if (aux) {
      if (emptyCart) {
        localStorage.setItem(keyName, JSON.stringify([]));
        return true;
      }
      aux = JSON.parse(aux);
    } else {
      aux = [];
    }
    aux.forEach((i) => {
      if (JSON.stringify(itemID) === JSON.stringify(i)) {
        putToCartEnable = false;
      } else {
        temp.push(i);
      }
    });
    //returns cart contents when called with no args
    if (itemID === null) {
      return aux;
    }
    //put an item to the cart if the cart doesn't have it
    if (putToCart) {
      if (putToCartEnable) {
        aux.push(itemID);
      } else {
        return putToCartEnable;
      }
    } else {
      putToCartEnable = true;
      aux = temp;
    }
    localStorage.setItem(keyName, JSON.stringify(aux));
    // returns true if cart operation was successful
    return putToCartEnable;
  },
  //cart_bage element content fill
  cartBage = () => {
    const cart_bage = cnst.d7.querySelector(".cart_bage"),
      cartItemsQuantity = processCart().length;
    if (cartItemsQuantity) {
      cart_bage.style.display = "flex";
      cart_bage.innerHTML = cartItemsQuantity;
    } else {
      cart_bage.style.display = "";
    }
  },
  watchInScope = (function () {
    const none = "none",
      blk = "block",
      optObj = { root: document.querySelector("#scroll"), threshold: 1 },
      cbFunc1 = (entriesArr, observer) => {
        entriesArr.forEach((entry) => {
          let targetImg = entry.target,
            loader = targetImg.previousSibling,
            coverPH = targetImg.nextSibling;
          const showNoCoverMessage = (mode = true) => {
            loader.style.display = none;
            if (mode) {
              coverPH.innerHTML = coverPH.dataset.bText;
            } else {
              coverPH.style.display = none;
              targetImg.style.display = blk;
            }
          };
          if (entry.isIntersecting) {
            observer.unobserve(targetImg);
            targetImg.src = targetImg.dataset.src;
            targetImg.style.display = none;
            coverPH.style.display = blk;
            loader.style.display = blk;
            if (targetImg.src) {
              targetImg.addEventListener("load", () => {
                setTimeout(() => {
                  showNoCoverMessage(false);
                }, cnst.loadDelay);
              });
              targetImg.addEventListener("error", () => {
                setTimeout(() => {
                  showNoCoverMessage();
                }, cnst.loadDelay);
              });
            } else {
              showNoCoverMessage();
            }
          }
        });
      },
      observer = new IntersectionObserver(cbFunc1, optObj);
    function obsyr(img) {
      observer.observe(img);
    }
    return obsyr;
  })();

export {
  cnst,
  siList,
  getProp2,
  setProp,
  putEl,
  plusPX,
  processCart,
  cartBage,
  watchInScope,
};
