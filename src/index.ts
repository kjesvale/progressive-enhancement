const submitButton = document.getElementById("submit-button");
const nameInput = document.getElementById("name-input") as HTMLInputElement;
const typeSelect = document.getElementById("type-select") as HTMLSelectElement;
const descInput = document.getElementById("desc-input") as HTMLTextAreaElement;

submitButton.addEventListener("click", () => {
    const pokemon = {
        name: nameInput.value,
        type: typeSelect.value,
        description: descInput.value,
    };

    fetch("/api/pokemon", {
        method: "POST",
        body: JSON.stringify(pokemon),
        headers: {
            "Content-Type": "application/json",
        },
    });
});
