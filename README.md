# Progressive enhancement-workshop

En workshop for å demonstrere hvordan man kan få et skjema til å fungere både med og uten JavaScript.

Prosjektet bygges med Parcel og består av:

- En frontend med HTML, CSS og JS (TypeScript) (Se `src`-mappen)
- En minimal backend-server i Node (Se `server`-mappen)

## Kom i gang

Klon prosjektet og installer frontend og backend:
```sh
git clone https://github.com/kjesvale/progressive-enhancement
cd progressive-enhancement
npm install
cd server && npm install
```

Det letteste er å kjøre prosjektet i utviklingsmodus med følgende kommandoer i hvert sitt kommandovindu:

```sh
npm run start
cd server && npm run start
```

Prosjektet vil da kjøre på [http://localhost:1234](http://localhost:1234) og proxye `/api` til serveren.

Du kan også lage et produksjonsbygg av frontend-prosjektet og serve det statisk i backend:

```sh
npm run build
cd server && npm run start
```

Du finner da nettsiden på [http://localhost:3000](http://localhost:3000).

## Intro

Du skal ikke trenge å gjøre noen endringer på serveren for å løse oppgavene. Det samme gjelder CSS-en under `src/styles.css`. Men stylingen er temmelig spartansk, så gjør det gjerne penere hvis du vil!

```
📖 = Relevant lesestoff
✍️ = Selve oppgaven
💡 = Nyttig informasjon
```

## Oppgave 1: Semantiske skjemaer

📖 [_Form_-elementet hos MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)

📖 [_Label_-elementet hos MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)

Åpne filen `index.html` inni `src`-mappen. Skjemaet har noen forbedringspotensialer når det gjelder semantikk.

✍️ Skriv om koden til å bruke flere semantiske tags.

<details>
<summary>🗝 Løsningsforslag</summary>

Inni `src/index.html`:
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

📖 [_Sending form data_ hos MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)

📖 [_POST_-metoden hos MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

Skru av JavaScript i nettleseren din. I Firefox kan du gå til innstillinger i konsollen, så huke av "Disable JavaScript". I Chrome ligger den samme innstillingen under "Debugger" nederst i konsollinnstillingene.

✍️ Få skjemaet til å fungere med JavaScript skrudd av.

💡 Endepunktet for å sende inn et skjema ligger under `/api/pokemon`, og støtter forespørsler med både JSON og _form data_. I begge tilfeller forventer den å motta `name`, `type` og `description` på pokemonen.

<details>
<summary>🗝 Løsningsforslag</summary>

Her bruker jeg `<form>` sine method- og action-attributter i `src/index.html` for å bestemme hvor og hvordan skjemaet skal sendes når brukeren trykker på submit-knappen.

Hvis du ikke gjorde det i forrige oppgave, er det også viktig å legge til `name`-attributten på `input`, `select` og `textarea`-elementene. Når skjemaet sendes med "submit"-eventen, er det ikke lenger i JSON-format, men url-formatert _form data_.


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
    <p aria-live="polite" id="result" />
</form>
```
</details>

## Oppgave 3: Enhance!

📖 [_Submit event_ hos MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)

Nå fungerer skjemaet vårt uten JavaScript. Men det er ganske kjedelig å bli videresendt til en ny side for hver gang vi sender inn skjemaet.

✍️ Skru på JavaScript igjen. Bruk `fetch` til å sende inn skjemaet, uten å ødelegge for brukerne uten JavaScript.

<details>
<summary>🗝 Løsningsforslag</summary>

Her har jeg valgt å erstatte "click"-lytteren vi hadde på submit-knappen med en "submit"-lytter på selve skjemaet. Jeg endrer også fetch-kallet til å sende form-dataen direkte med "Content-Type" satt til `application/x-www-form-urlencoded`.

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


## Bonusoppgaver

- 