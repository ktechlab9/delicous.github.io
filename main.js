// GitHub CSV URL
const sheetURL = "https://raw.githubusercontent.com/ktechlab9/delicous.github.io/main/recipes.csv";
const recipeGrid = document.getElementById('recipe-grid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

let allRecipes = [];

// Load recipes from CSV
Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
        allRecipes = results.data.filter(r => r.name && r.image);
        displayRecipes(allRecipes);
    }
});

// Display recipes function
function displayRecipes(recipes) {
    recipeGrid.innerHTML = '';
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <button onclick="viewRecipe('${recipe.name}')">View Recipe</button>
        `;
        recipeGrid.appendChild(card);
    });
}

// Search and filter
searchInput.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);

function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = allRecipes.filter(r => {
        const matchesName = r.name.toLowerCase().includes(searchTerm);
        const matchesCategory = (category === 'All') || (r.category === category);
        return matchesName && matchesCategory;
    });
    displayRecipes(filtered);
}

// Placeholder view recipe
function viewRecipe(name) {
    alert("You clicked to view: " + name + "\n(You can link to a full recipe page here!)");
}
