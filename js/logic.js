// logic.js - Handles .txt and .docx files
const legacyInput = document.getElementById('legacy_text');
const unicodeOutput = document.getElementById('unicode_text');
const convertBtn = document.getElementById('convert_btn');
const copyBtn = document.getElementById('copy_btn');
const statusText = document.getElementById('status');
const fileInput = document.getElementById('file_input');

let worker;

function initWorker() {
    if (worker) worker.terminate();
    worker = new Worker('js/converter.worker.js');
    
    worker.onmessage = function(e) {
        const data = e.data;
        if (data.type === 'progress') {
            statusText.innerText = `Processing... ${Math.round(data.value)}%`;
        } else if (data.type === 'done') {
            unicodeOutput.value = data.result;
            statusText.innerText = "Conversion Complete! ✅";
            convertBtn.disabled = false;
        }
    };
}

// --- फाईल अपलोड लॉजिक ---
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    statusText.innerText = "Reading file...";

    // 1. जर फाईल WORD (.docx) असेल
    if (file.name.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            
            // Mammoth वापरून Word मधून टेक्स्ट बाहेर काढणे
            mammoth.extractRawText({arrayBuffer: arrayBuffer})
                .then(function(result) {
                    legacyInput.value = result.value; // Word मधला मजकूर बॉक्समध्ये टाका
                    statusText.innerText = "Word File Loaded! Click Convert.";
                })
                .catch(function(err) {
                    console.log(err);
                    statusText.innerText = "Error reading Word file!";
                });
        };
        reader.readAsArrayBuffer(file);
    } 
    // 2. जर फाईल TEXT (.txt) असेल
    else {
        const reader = new FileReader();
        reader.onload = function(event) {
            legacyInput.value = event.target.result;
            statusText.innerText = "Text File Loaded! Click Convert.";
        };
        reader.readAsText(file);
    }
});

convertBtn.addEventListener('click', () => {
    const text = legacyInput.value;
    if (!text) { alert("No text found!"); return; }

    convertBtn.disabled = true;
    statusText.innerText = "Converting...";
    if (!worker) initWorker();
    worker.postMessage({ text: text, mode: 'S2U' });
});

copyBtn.addEventListener('click', () => {
    if (!unicodeOutput.value) return;
    navigator.clipboard.writeText(unicodeOutput.value);
    statusText.innerText = "Copied!";
});

initWorker();
