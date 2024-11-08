document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-value");
            updateStarRating(selectedRating);
        });

        star.addEventListener("mouseover", function () {
            updateStarRating(this.getAttribute("data-value"));
        });

        star.addEventListener("mouseout", function () {
            updateStarRating(selectedRating);
        });
    });

    document.getElementById("ulasanForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const ulasanText = document.getElementById("ulasanText").value;
        const daftarUlasan = document.getElementById("daftarUlasan");

        const ulasanItem = document.createElement("div");
        ulasanItem.classList.add("ulasan-item");

        ulasanItem.innerHTML = `
            <p>${ulasanText}</p>
            <div class="rating">${getStarDisplay(selectedRating)}</div>
        `;

        daftarUlasan.appendChild(ulasanItem);
        document.getElementById("ulasanText").value = "";
        selectedRating = 0;
        updateStarRating(0);
    });

    function updateStarRating(rating) {
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= rating) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });
    }

    function getStarDisplay(rating) {
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<span class="star ${i <= rating ? 'selected' : ''}">★</span>`;
        }
        return starsHtml;
    }
});
