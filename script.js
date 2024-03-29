const inputField = document.getElementById('inputField');
const output = document.getElementById('output');
const textList = document.getElementById('textList');
const addBtn = document.getElementById('addBtn');
let currentText = 0;
let currentIndex = 0;
let texts = [];

// ローカルストレージからテキストを取得
const storedTexts = localStorage.getItem('savedTexts');
if (storedTexts) {
  texts = JSON.parse(storedTexts);
  updateList();
  // ローカルストレージからテキストが読み込まれた後、アニメーションを開始する
  showText();
}

addBtn.addEventListener('click', function() {
  if (inputField.value.trim() !== '') {
    texts.push(inputField.value);
    inputField.value = ''; 
    if (texts.length === 1) {
      showText();
    }
    updateList();
    localStorage.setItem('savedTexts', JSON.stringify(texts));
  }
});

function updateList() {
  textList.innerHTML = '';

  texts.forEach((text, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      texts.splice(index, 1); 
      updateList();
      localStorage.setItem('savedTexts', JSON.stringify(texts));
    });

    listItem.appendChild(deleteBtn);

    textList.appendChild(listItem);
  });
}

function showText() {
  output.textContent = texts[currentText];
  output.classList.remove('fade-out');
  output.classList.add('fade-in');

  setTimeout(() => {
    output.classList.remove('fade-in');
    output.classList.add('fade-out');
    currentText = (currentText + 1) % texts.length;
    setTimeout(showText, 1000); 
  }, 3000); 
}
