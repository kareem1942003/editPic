let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let imag = document.getElementById("imag");

let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");

let canvac = document.getElementById("canvas");
let ctx = canvac.getContext("2d");

function resetValue() {
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    imag.src = file.result;
  };
  imag.onload = function () {
    canvac.width = imag.width;
    canvac.height = imag.height;
    ctx.drawImage(imag, 0, 0, canvac.width, canvac.height);
    imag.style.display = "none";
    canvac.style.maxWidth = "40vw";
  };
  resetValue();
};

let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(imag, 0, 0, canvac.width, canvac.height);
  });
});

download.onclick = function () {
  download.href = canvac.toDataURL("image/jpg");
};
