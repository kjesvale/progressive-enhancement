# Progressive enhancement

En liten workshop om semantikk og progressive enhancement.


## Kom i gang

Klon repoet og installer:
```sh
git clone https://github.com/kjesvale/progressive-enhancement
cd progressive-enhancement
npm install
```

Kjør kommandoene nedenfor i hvert sitt kommandovindu:
```sh
npm run start
cd server && npm run start
```

Nettsiden vil kjøre på [localhost:1234](http://localhost:1234), mens serveren kjører på [localhost:3000](http://localhost:3000).

## Emojiforklaring

```
✍️ = Selve oppgaven
💡 = Nyttig informasjon
📖 = Lesestoff
```

## Oppgave 1: Semantiske skjemaer

📖 ["Form"-elementet hos MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)

Åpne filen `src/index.html`. Skjemaet har noen forbedringspotensialer når det gjelder semantikk.

✍️ Skriv om koden til å bruke semantiske tags som `h1`, `form`, `label` osv.

<details>
<summary>🗝 Løsningsforslag</summary>

I `src/index.html`:
```html
<h1 class="title">Pokédex</h1>
<h2 class="subtitle">Submit a new pokémon</h2>

<form>
    <label for="name-input">Name</label>
    <input id="name-input" type="text" placeholder="Enter name" />

    <label for="type-select">Type</label>
    <select id="type-select">
        <option value="">-- Choose a type --</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
    </select>

    <label for="description-input">Description</label>
    <textarea id="description-input" placeholder="Write a short description" />

    <button id="submit-button">Submit pokemon</button>
</form>
```

Hvis du har submit-knappen inni et `<form>`-element vil et trykk på knappen automatisk sende inn skjemaet og laste inn siden på nytt. Du kan unngå denne oppførselen ved å legge til `event.preventDefault();` i knappens event-listener i `index.ts`:

```ts
submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    ...
}
```

</details>

## Oppgave 2: Fallback

📖 ["Sending form data" hos MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)

📖 ["POST"-metoden hos MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

Skru av JavaScript i nettleseren din. I Firefox kan du gå til innstillinger i konsollen, så huke av "Disable JavaScript". I Chrome ligger den samme innstillingen under "Debugger" nederst i konsollinnstillingene.

✍️ Få skjemaet til å fungere med JavaScript skrudd av.

💡 Endepunktet for å sende inn et skjema ligger under `/api/pokemon`.

<details>
<summary>🗝 Løsningsforslag</summary>

Her bruker vi `<form>` sine method- og action-attributter i `src/index.html` for å bestemme hvor og hvordan skjemaet skal sendes når brukeren trykker på submit-knappen.

Hvis du ikke gjorde det i forrige oppgave, er det også viktig å legge til `name`-attributten på `input`, `select` og `textarea`-elementene. Når skjemaet sendes med "submit"-eventen, er det ikke lenger i JSON-format, men url-formatert form-data.


```html
<form method="POST" action="/api/pokemon">
    <label for="name-input">Name</label>
    <input
        name="name"
        id="name-input"
        type="text"
        placeholder="Enter name"
    />

    <label for="type-select">Type</label>
    <select name="type" id="type-select">
        <option value="">-- Choose a type --</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
    </select>

    <label>Description</label>
    <textarea
        name="description"
        id="description-input"
        placeholder="Write a short description"
    />

    <button id="submit-button">Submit pokemon</button>
</form>
```
</details>

## Oppgave 3: Enhance!

📖 ["Submit event" hos MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)

Nå fungerer skjemaet vårt uten JavaScript. Men det er ganske kjedelig å bli videresendt til en ny side for hver gang vi sender inn skjemaet.

✍️ Skru på JavaScript igjen. Bruk igjen `fetch` til å sende inn skjemaet, uten å ødelegge for brukerne uten JavaScript.

<details>
<summary>🗝 Løsningsforslag</summary>

Her har vi valgt å erstatte "click"-lytteren vi hadde på submit-knappen med en "submit"-lytter på selve skjemaet. Vi endrer også fetch-kallet til å sende form-dataen direkte med "Content-Type" satt til `application/x-www-form-urlencoded`.

I `src/index.ts`:
```ts
pokemonForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new URLSearchParams(
        new FormData(pokemonForm) as URLSearchParams
    );

    try {
        const response = await fetch("/api/pokemon", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        resultDiv.innerText = await response.text();
    } catch (e) {
        resultDiv.innerText = "Error submitting pokemon!";
    }
});
```
</details>
