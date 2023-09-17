function showLoading() {
    document.getElementById("spinner").style.visibility = "visible";
}

function hideLoading() {
    document.getElementById("spinner").style.visibility = "hidden";
}

function addRecentTranslation(translation) {
    const ul = document.getElementById("translationList");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(translation));
    ul.appendChild(li);
}

document.getElementById("translationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    showLoading();
    const formData = new FormData(event.target);
    fetch("/translate", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("output").textContent = data.translated_text;
            addRecentTranslation(data.translated_text);
            hideLoading();
        })
        .catch(error => {
            console.error("Error:", error);
            hideLoading();
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const recentTranslations = JSON.parse(localStorage.getItem("recentTranslations")) || [];
    recentTranslations.forEach(function (translation) {
        addRecentTranslation(translation);
    });
});


if (document.getElementById("output").textContent.trim() !== "") {
    const recentTranslations = JSON.parse(localStorage.getItem("recentTranslations")) || [];
    recentTranslations.push(document.getElementById("output").textContent.trim());
    if (recentTranslations.length > 5) {
        recentTranslations.shift();
    }
    localStorage.setItem("recentTranslations", JSON.stringify(recentTranslations));
}

const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark-mode');
    } else {
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark-mode');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
