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

## Oppgave 1: Semantiske skjemaer

Åpne filen `src/index.html`. Skjemaet har noen forbedringspotensialer når det gjelder semantikk.

✍️ Skriv om koden til å bruke semantiske tags som `h1`, `form`, `label`, `legend` osv.

💡 Hvis du har submit-knappen inni et `<form>`-element vil et trykk på knappen automatisk sende inn skjemaet og videresende brukeren til en ny side. Forhindre 

## Oppgave 2: Fallback

Skru av JavaScript i nettleseren din. I Firefox kan du gå til innstillinger i konsollen, så huke av "Disable JavaScript". I Chrome ligger den samme innstillingen under "Debugger" nederst i konsollinnstillingene.

✍️ Få skjemaet til å fungere uten noe som helst JavaScript.

## Oppgave 3: Progressive enhancement

Vi ønsker ikke at brukeren blir videresendt til en ny side når man sender inn et skjema. Samtidig vil vi at kjernefunksjonaliteten skal beholdes selv om JavaScript ikke ble kjørt.

✍️ Skriv JavaScript som bruker `fetch` til å sende inn skjemaet uten at siden laster inn, men sørg for at skjemaet fremdeles fungerer uten JavaScript.