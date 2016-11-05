"use strict";

const qrcode = require("qrcode-generator");

const data = location.href;
const errorCorrectionLevel = "L";
let qr;
let typeNumber = 1;

while (typeNumber <= 40) {
  qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(data);

  try {
    qr.make();
    break;
  } catch(err) {
    typeNumber += 1;
  }
}

const wrapper = document.createElement("div");
wrapper.innerHTML = qr.createImgTag(8, 8 * 5);
wrapper.style.position = "fixed";
wrapper.style.zIndex = 2147483647;
wrapper.style.top = 0;
wrapper.style.left = 0;
wrapper.style.width = "100%";
wrapper.style.height = "100%";
wrapper.style.backgroundColor = "rgba(255,255,255, 0.5)";
wrapper.style.cursor = "pointer";
wrapper.addEventListener("click", (event) => {
  wrapper.parentNode.removeChild(wrapper);
}, false);

const img = wrapper.getElementsByTagName("img")[0];
img.style.position = "absolute";
img.style.top = "50%";
img.style.left = "50%";
img.style.transform = "translate(-50%, -50%)";

document.body.appendChild(wrapper);
