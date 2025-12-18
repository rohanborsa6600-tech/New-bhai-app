// index.js
import { convertToUnicode, convertToShreeLipi } from "./converter.js";

// DOM Elements Selection
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const toUnicodeBtn = document.getElementById("toUnicodeBtn");
const toLegacyBtn = document.getElementById("toLegacyBtn");
const inputLabel = document.getElementById("inputLabel");
const outputLabel = document.getElementById("outputLabel");
const copyBtn = document.getElementById("copyBtn");

// State: Default mode is 'toUnicode'
let mode = "toUnicode"; 

// Main Conversion Function
function handleConversion() {
  const text = inputText.value;
  
  if (mode === "toUnicode") {
    // Logic: ShreeLipi -> Unicode
    const result = convertToUnicode(text);
    outputText.value = result;
  } else {
    // Logic: Unicode -> ShreeLipi
    const result = convertToShreeLipi(text);
    outputText.value = result;
  }
}

// Event Listener: Real-time typing
inputText.addEventListener("input", handleConversion);

// Switch Mode: To Unicode
toUnicodeBtn.addEventListener("click", () => {
  if (mode === "toUnicode") return; // Already active

  mode = "toUnicode";
  
  // UI Updates
  toUnicodeBtn.classList.add("active");
  toLegacyBtn.classList.remove("active");
  inputLabel.textContent = "ShreeLipi Input";
  outputLabel.textContent = "Unicode Output";

  // Clear inputs for fresh start
  inputText.value = "";
  outputText.value = "";
});

// Switch Mode: To ShreeLipi
toLegacyBtn.addEventListener("click", () => {
  if (mode === "toLegacy") return; // Already active

  mode = "toLegacy";
  
  // UI Updates
  toLegacyBtn.classList.add("active");
  toUnicodeBtn.classList.remove("active");
  inputLabel.textContent = "Unicode Input";
  outputLabel.textContent = "ShreeLipi Output";

  // Clear inputs for fresh start
  inputText.value = "";
  outputText.value = "";
});

// Copy Button Logic
copyBtn.addEventListener("click", () => {
  if (!outputText.value) return;
  
  navigator.clipboard.writeText(outputText.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#ffffff";
    copyBtn.style.color = "#1a1a2e";
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = "";
      copyBtn.style.color = "";
    }, 2000);
  }).catch(err => {
    alert("Failed to copy: " + err);
  });
});
