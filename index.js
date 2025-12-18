import { convertToUnicode, convertToShreeLipi } from "./converter.js";

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const toUnicodeBtn = document.getElementById("toUnicodeBtn");
const toLegacyBtn = document.getElementById("toLegacyBtn");
const inputLabel = document.getElementById("inputLabel");
const outputLabel = document.getElementById("outputLabel");
const copyBtn = document.getElementById("copyBtn");

// State: Default is 'toUnicode'
let mode = "toUnicode"; // 'toUnicode' or 'toLegacy'

// Function to handle conversion
function handleConversion() {
  const text = inputText.value;
  if (mode === "toUnicode") {
    outputText.value = convertToUnicode(text);
  } else {
    outputText.value = convertToShreeLipi(text);
  }
}

// Event Listeners
inputText.addEventListener("input", handleConversion);

// Toggle Mode Logic
toUnicodeBtn.addEventListener("click", () => {
  mode = "toUnicode";
  toUnicodeBtn.classList.add("active");
  toLegacyBtn.classList.remove("active");
  
  // Update Labels
  inputLabel.textContent = "ShreeLipi Input";
  outputLabel.textContent = "Unicode Output";
  
  // Clear and swap text if needed (Optional UX choice)
  // Let's just re-trigger conversion
  handleConversion();
});

toLegacyBtn.addEventListener("click", () => {
  mode = "toLegacy";
  toLegacyBtn.classList.add("active");
  toUnicodeBtn.classList.remove("active");
  
  // Update Labels
  inputLabel.textContent = "Unicode Input";
  outputLabel.textContent = "ShreeLipi Output";
  
  handleConversion();
});

// Copy Button Logic
copyBtn.addEventListener("click", () => {
  if (!outputText.value) return;
  
  navigator.clipboard.writeText(outputText.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
});
