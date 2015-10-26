# BEKK Arcade-maskin

## Kontroller


### Pong

Begge kontroller må holde `fist` for å starte spillet.
Styr opp og ned eller frem og tilbake.


### Snap

Prøv å knips for å lage en knipselyd.

### BEKK Invaders

- Hold knyttnæve (`fist`) for å starte spillet.
- Hold inne knyttnæve (`fist`) for å skyte. Slipp for å opphøre skyting.
- Styr med å bevege hånden frem og tilbake (venstre og høyre).

Restart orientering (null-punktet for venstre/høyre navigasjon) ved å dobbel-tap
med tommel og pekefinger (`double_tap`).


### Tetris

Hold armen i ro og hånden ut fra kroppen (`wave_out`) for å starte spillet.

- Styr klossen med å bevege hånden frem og tilbake (venstre og høyre).
- Gjør knyttnæve for å rotere klossen.

Restart orientering (null-punktet for venstre/høyre navigasjon) ved å dobbel-tap
med tommel og pekefinger (`double_tap`).


## Bidra og kjør lokalt

En kan selv bidra med spill eller apps til TV-boardet til BEKK. Send en Pull
Request som følger [eksemplet](./apps/example) og i det den blir accepted vil
spillet dukke opp på dashboardet.

For å kjøre løsningen lokalt, må man følge 2 enkle steg:

1. Installer avhengigheter med `npm i`
2. Bygg og start server `npm start`

Steg nummer 2 vil automatisk bygge alle apps og vise de i dashboardet. Dersom
det blir gjort noen endringer i en app (implementasjon eller design) kan
serveren startes på nytt.

Dersom man ikke vil starte serveren på nytt hver gang, kan man lytte på endringer:

```shell
npm run watch
```

Eller bare bygge app-ene manuelt (uten å restarte server):

```shell
npm run build
```
