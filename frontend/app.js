const BACKEND_URL = 'http://localhost:3000/review';

let selectedFile = null;

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// --- File Selection ---
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const fileInfo = document.getElementById('fileInfo');
const uploadPrompt = document.getElementById('uploadPrompt');
const fileNameEl = document.getElementById('fileName');
const removeFileBtn = document.getElementById('removeFile');
const reviewBtn = document.getElementById('reviewBtn');
const resetBtn = document.getElementById('resetBtn');

fileInput.addEventListener('change', e => {
  if (e.target.files[0]) pickFile(e.target.files[0]);
});

uploadBox.addEventListener('dragover', e => e.preventDefault());
uploadBox.addEventListener('drop', e => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f && f.type === 'application/pdf') pickFile(f);
  else showError('Please upload a PDF file.');
});

function pickFile(f) {
  selectedFile = f;
  fileNameEl.textContent = f.name + ' (' + (f.size / 1024).toFixed(1) + ' KB)';
  uploadPrompt.style.display = 'none';
  fileInfo.style.display = 'flex';
  reviewBtn.disabled = false;
  hideError();
  document.getElementById('results').style.display = 'none';
}

removeFileBtn.addEventListener('click', resetAll);
resetBtn.addEventListener('click', resetAll);

function resetAll() {
  selectedFile = null;
  fileInput.value = '';
  uploadPrompt.style.display = 'block';
  fileInfo.style.display = 'none';
  reviewBtn.disabled = true;
  document.getElementById('results').style.display = 'none';
  document.getElementById('loader').style.display = 'none';
  hideError();
}

// --- Extract Text from PDF ---
async function extractText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }
  return text.trim();
}

// --- Send to Backend ---
reviewBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  reviewBtn.disabled = true;
  document.getElementById('loader').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  hideError();

  try {
    const resumeText = await extractText(selectedFile);

    if (!resumeText || resumeText.length < 50) {
      throw new Error('Could not extract text. Use a text-based PDF (not a scanned image).');
    }

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Server error: ' + response.status);
    }

    const data = await response.json();
    showResults(data);

  } catch (err) {
    showError(err.message || 'Something went wrong. Please try again.');
    reviewBtn.disabled = false;
  } finally {
    document.getElementById('loader').style.display = 'none';
  }
});

// --- Display Results ---
function showResults(data) {
  document.getElementById('scoreCircle').textContent = data.score + '/10';
  document.getElementById('summaryText').textContent = data.summary;

  fillList('strengthsList', data.strengths);
  fillList('improvementsList', data.improvements);
  fillList('missingList', data.missing);
  fillList('tipsList', data.tips);

  document.getElementById('results').style.display = 'block';
  reviewBtn.disabled = false;
}

function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  (items || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

function showError(msg) {
  const el = document.getElementById('errorBox');
  el.textContent = msg;
  el.style.display = 'block';
}

function hideError() {
  document.getElementById('errorBox').style.display = 'none';
}