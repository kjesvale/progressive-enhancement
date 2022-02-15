const nameInput = document.getElementById("name-input") as HTMLInputElement;
const typeSelect = document.getElementById("type-select") as HTMLSelectElement;
const descriptionInput = document.getElementById(
    "description-input"
) as HTMLTextAreaElement;

const submitButton = document.getElementById("submit-button");
const resultDiv = document.getElementById("result");

submitButton.addEventListener("click", async () => {
    const pokemon = {
        name: nameInput.value,
        type: typeSelect.value,
        description: descriptionInput.value,
    };

    try {
        const response = await fetch("/api/pokemon", {
            method: "POST",
            body: JSON.stringify(pokemon),
            headers: {
                "Content-Type": "application/json",
            },
        });

        resultDiv.innerText = await response.text();
    } catch (e) {
        resultDiv.innerText = "Error submitting pokemon!";
    }
});
