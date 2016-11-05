"use strict";

const qrcode = require("qrcode-generator");
const errorCorrectionLevel = "L";

function generateImg(data) {
  let qr;
  let typeNumber = 1;

  while (typeNumber <= 40) {
    qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(data);

    try {
      qr.make();
      return qr.createImgTag(8, 8 * 4).match(/src="(.*?)"/)[1];
    } catch(err) {
      typeNumber += 1;
    }
  }
}

const wrapper = document.createElement("div");
wrapper.style.position = "fixed";
wrapper.style.zIndex = 2147483647;
wrapper.style.top = 0;
wrapper.style.left = 0;
wrapper.style.width = "100%";
wrapper.style.height = "100%";
wrapper.style.backgroundColor = "rgba(255,255,255, 0.5)";
wrapper.style.cursor = "pointer";
wrapper.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    wrapper.parentNode.removeChild(wrapper);
  }
}, false);

const qrBox = document.createElement("div");
qrBox.style.position = "absolute";
qrBox.style.top = "50%";
qrBox.style.left = "50%";
qrBox.style.transform = "translate(-50%, -50%)";
qrBox.style.cursor = "auto";
wrapper.appendChild(qrBox);

const qrImg = document.createElement("img");
qrImg.src = generateImg(location.href);
qrImg.style.display = "block";
qrBox.appendChild(qrImg);

const input = document.createElement("input");
input.type = "text";
input.value = location.href;
input.style.display = "block";
input.style.width = "100%";
input.style.fontSize = "14px";
input.style.boxSizing = "border-box";
input.addEventListener("input", (event) => {
  qrImg.src = generateImg(input.value);
}, false);
qrBox.appendChild(input);

document.body.appendChild(wrapper);
