// baby_chain.js

function generateNames() {
    var babyNamesList = document.getElementById('babyNamesList');
    babyNamesList.innerHTML = ''; // Clear previous names

    // Generate 30 names
    for (var i = 0; i < 30; i++) {
        var name = markov.generateName();
        var listItem = document.createElement('li');
        listItem.textContent = name;
        babyNamesList.appendChild(listItem);
    }
}
