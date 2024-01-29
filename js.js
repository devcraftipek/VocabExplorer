let wordList = [];
const wordListContainer = document.getElementById("wordList");
const newWordInput = document.getElementById("newWord");
const newWordTranslationInput = document.getElementById("newWordTranslation");

function addWord() {
    const word = newWordInput.value.trim();
    const translation = newWordTranslationInput.value.trim();
    
    if (word && translation) {
        const newWordObject = {
            word: word,
            translation: translation
        };

        wordList.push(newWordObject);
        displayWordList();
        
        newWordInput.value = '';
        newWordTranslationInput.value = '';
    }
}

function displayWordList() {
    wordListContainer.innerHTML = "<h2>Öğrenilen Kelimeler</h2>";
    
    if (wordList.length === 0) {
        wordListContainer.innerHTML += "<p>Henüz kelime eklenmemiş.</p>";
    } else {
        const list = document.createElement("ul");
        wordList.forEach((wordObject, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>Word ${index + 1}:</strong> ${wordObject.word} - ${wordObject.translation}`;
            list.appendChild(listItem);
        });
        wordListContainer.appendChild(list);
    }
}

//Okuma

function readWords() {
    if ('speechSynthesis' in window) {
        wordList.forEach((wordObject, index) => {
            const utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US';
            utterance.text = `Word ${index + 1}: ${wordObject.word} - ${wordObject.translation}`;
            utterance.addEventListener('end', () => {
                if (index < wordList.length - 1) {
                    const nextUtterance = new SpeechSynthesisUtterance();
                    nextUtterance.lang = 'en-US';
                    nextUtterance.text = `Word ${index + 2}: ${wordList[index + 1].word} - ${wordList[index + 1].translation}`;
                    speechSynthesis.speak(nextUtterance);
                }
            });

            speechSynthesis.speak(utterance);
        });
    } else {
        alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
    }
}


//TEST

function startTest() {
    if (wordList.length < 4) {
        alert("Test başlatmak için en az 4 kelime ekleyin.");
    } else {
        const shuffledWords = shuffleArray(wordList);
        displayTestQuestions(shuffledWords.slice(0, 4));
    }
}

function displayTestQuestions(testWords) {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "<h2>İngilizce Kelime Testi</h2>";

    testWords.forEach((wordObject, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.textContent = `Soru ${index + 1}: ${wordObject.translation}`;

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.id = `answer${index + 1}`;
        answerInput.placeholder = "Cevabınız";

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(answerInput);
    });

    const checkButton = document.createElement("button");
    checkButton.textContent = "Cevapları Kontrol Et";
    checkButton.onclick = checkTestAnswers;

    quizContainer.appendChild(checkButton);
}

function checkTestAnswers() {
    const userAnswers = [];
    
    for (let i = 0; i < 4; i++) {
        const userAnswer = document.getElementById(`answer${i + 1}`).value.trim();
        userAnswers.push(userAnswer);
    }

    displayTestResult(userAnswers);
}


//Enter

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (document.activeElement === newWordInput || document.activeElement === newWordTranslationInput) {
            addWord();
        }
    }
});

//login


function login() {
    const username = document.getElementById("username").value.trim();

    if (username) {
        // Kullanıcı adını local storage'a kaydet
        localStorage.setItem("username", username);

        // Giriş formunu gizle, uygulama içeriğini göster
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("appContainer").style.display = "block";

        // Kullanıcının önceki kelimelerini yükle
        loadUserWords();
    } else {
        alert("Lütfen bir kullanıcı adı girin.");
    }
}

function loadUserWords() {
    const savedWords = JSON.parse(localStorage.getItem("userWords")) || [];
    wordList = savedWords;
    displayWordList();
}

function saveUserWords() {
    localStorage.setItem("userWords", JSON.stringify(wordList));
}

function addWord() {
    const word = document.getElementById("newWord").value.trim();
    const translation = document.getElementById("newWordTranslation").value.trim();

    if (word && translation) {
        const newWordObject = {
            word: word,
            translation: translation
        };

        wordList.push(newWordObject);
        displayWordList();
        saveUserWords();

        document.getElementById("newWord").value = '';
        document.getElementById("newWordTranslation").value = '';
    }
}

function displayWordList() {
    const wordListUl = document.getElementById("wordListUl");
    wordListUl.innerHTML = "";

    if (wordList.length === 0) {
        wordListUl.innerHTML = "<li class='list-group-item'>Henüz kelime eklenmemiş.</li>";
    } else {
        wordList.forEach((wordObject, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `<strong>${wordObject.word}:</strong> ${wordObject.translation}`;
            wordListUl.appendChild(listItem);
        });
    }
}

function startTest() {
    if (wordList.length < 4) {
        alert("Test başlatmak için en az 4 kelime ekleyin.");
    } else {
        const shuffledWords = shuffleArray(wordList);
        displayTestQuestions(shuffledWords.slice(0, 4));
    }
}

function displayTestQuestions(testWords) {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "<h2>İngilizce Kelime Testi</h2>";

    testWords.forEach((wordObject, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.textContent = `Soru ${index + 1}: ${wordObject.translation}`;

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.id = `answer${index + 1}`;
        answerInput.className = "form-control";
        answerInput.placeholder = "Cevabınız";

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(answerInput);
    });

    const checkButton = document.createElement("button");
    checkButton.textContent = "Cevapları Kontrol Et";
    checkButton.className = "btn btn-primary mt-3";
    checkButton.onclick = checkTestAnswers;

    quizContainer.appendChild(checkButton);
}

function checkTestAnswers() {
    const userAnswers = [];
    
    for (let i = 0; i < 4; i++) {
        const userAnswer = document.getElementById(`answer${i + 1}`).value.trim();
        userAnswers.push(userAnswer);
    }

    displayTestResult(userAnswers);
}

//Temizle
function clearWords() {
    const confirmation = confirm("Emin misiniz? Tüm kelimeler silinecek!");

    if (confirmation) {
        wordList = [];
        saveUserWords();
        displayWordList();
    }
}






