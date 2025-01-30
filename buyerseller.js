document.addEventListener("DOMContentLoaded", () => {
    const buyerBtn = document.getElementById("buyerBtn");
    const sellerBtn = document.getElementById("sellerBtn");
    const buyerSection = document.querySelector(".buyer-section");
    const sellerSection = document.querySelector(".seller-section");
    const userNameDisplay = document.getElementById("userName");

    // Simulate logged-in user's name
    const loggedInUser = "John Doe"; // Replace with actual login logic
    userNameDisplay.textContent = loggedInUser;

    // Toggle between Buyer and Seller views
    buyerBtn.addEventListener("click", () => {
        buyerSection.classList.add("active");
        sellerSection.classList.remove("active");
    });

    sellerBtn.addEventListener("click", () => {
        sellerSection.classList.add("active");
        buyerSection.classList.remove("active");
    });
});
