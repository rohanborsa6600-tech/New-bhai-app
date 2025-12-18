import { convert_to_unicode } from "./convert.js";

const inputEle = document.getElementById("legacy_text");
const outputEle = document.getElementById("unicode_text");

inputEle.addEventListener("input", () => {
  const output = convert_to_unicode(inputEle.value);

  outputEle.value = output;
});

const copyBtnEle = document.getElementById("copy_btn");

copyBtnEle.addEventListener("click", () => {
  navigator.clipboard.writeText(outputEle.value).then(
    () => {
      alert("Copied");
    },
    (reason) => {
      alert(`Unable to copy: ${reason}`);
    }
  );
});
