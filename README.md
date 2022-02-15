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

Åpne filen `src/index.html`. Skjemaet har noen forbedringspotensialer når det gjelder semantikk.

✍️ Skriv om koden til å bruke semantiske tags som `h1`, `form`, `label` osv.

💡 Obs! Hvis du har submit-knappen inni et `<form>`-element vil et trykk på knappen automatisk sende inn skjemaet og laste inn siden på nytt. Du kan unngå denne oppførselen ved å legge til `event.preventDefault();` i knappens event-listener i `index.ts`.

<details>
<summary>🗝 Løsningsforslag</summary>

I `src/index.html`:
```html
<h1 class="title">Pokédex</h1>
<h2 class="subtitle">Submit a new pokémon</h2>

<form>
    <label for="name-input" class="field">Name</label>
    <input id="name-input" type="text" placeholder="Enter name" />

    <label for="type-select" class="field">Type</label>
    <select id="type-select">
        <option value="">-- Choose a type --</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
    </select>

    <label class="field">Description</label>
    <textarea id="desc-input" placeholder="Write a short description" />

    <button id="submit-button">Submit pokemon</button>
</form>
```
</details>

## Oppgave 2: Fallback

📖 ["Sending form data" hos MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)

Skru av JavaScript i nettleseren din. I Firefox kan du gå til innstillinger i konsollen, så huke av "Disable JavaScript". I Chrome ligger den samme innstillingen under "Debugger" nederst i konsollinnstillingene.

✍️ Få skjemaet til å fungere med JavaScript skrudd av.

<details>
<summary>🗝 Løsningsforslag</summary>

Her holder det å bruke `<form>` sine method- og action-attributter i `src/index.html`:

```html
<form method="POST" action="/api/pokemon">
    ...
</form>
```

## Oppgave 3: Enhance!

Skru på JavaScript igjen.

Vi ønsker ikke at brukeren blir videresendt til en ny side når man sender inn et skjema. Samtidig vil vi at kjernefunksjonaliteten skal beholdes selv om JavaScript ikke ble kjørt.

✍️ Skriv JavaScript-kode som bruker `fetch` til å sende inn skjemaet uten at siden laster inn. Du skal ikke behøve å endre på HTML nå.

<details>
<summary>🗝 Løsningsforslag</summary>

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
