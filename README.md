# Redesign Informačního systému FAČR (IS FAČR) – Prototyp

Interaktivní webový prototyp vytvořený v rámci bakalářské práce. Cílem projektu je návrh moderního, přehledného a uživatelsky přívětivého rozhraní pro veřejný portál, administraci fotbalových klubů, panel rozhodčích a elektronický zápis o utkání.

Aplikace je postavena na čistém **HTML5, CSS3 a Vanilla JavaScriptu** bez nutnosti backendového serveru. Data jsou spravována centrálně v souboru `js/db.js` a veškeré změny (přihlášení, rozpracované i uzavřené zápisy) se ukládají lokálně do prohlížeče pomocí `localStorage`.

---

## Hlavní funkce prototypu

### 1. Veřejný portál
* **Úvodní rozcestník (`portal.html`):** Globální vyhledávání s živým našeptávačem (autocomplete) napříč soutěžemi, kluby a hráči.
* **Soutěže a tabulky (`public-league.html`):** Aktuální tabulka 9. ligy mužů – skupina B, rozpis utkání a výsledky.
* **Kluby a hráči (`public-clubs.html`, `public-club.html`, `public-players.html`):** Adresář klubů s detaily, soupiskami a databází hráčů.
* **Detail utkání (`public-match.html`):** Veřejný náhled odehraného zápasu včetně časové osy událostí a sestav obou týmů.

### 2. Autentizace a správa rolí (`login.html`)
* **Demo účty:** Přihlášení za 3 rozhodčí (*Tomáš Mutný, Lukáš Král, Petr Novotný*) a 3 administrátory klubů (*TJ Prusinovice, FC Kostelec u Holešova, TJ Sokol Rymice B*).
* **Trvalé přihlášení a ochrana přístupu:** Přihlášený uživatel zůstává přihlášený napříč celým portálem až do odhlášení. Přístup do klubové sekce a sekce rozhodčích je striktně oddělen podle role.

### 3. Administrace klubu (`dashboard.html`, `players.html`)
* Dynamický přehled klubu podle přihlášeného účtu (název, ID, statistiky, pořadí v tabulce).
* Přehled nejbližších i odehraných utkání s přímým proklikem do zápisu.
* Evidence hráčů přihlášeného klubu s vyhledáváním a filtrováním podle stavu členství.

### 4. Panel rozhodčího (`referee.html`)
* Dynamický výpis delegovaných utkání pro konkrétního přihlášeného rozhodčího.
* **Ověření totožnosti hráče:** Vyhledávání v registru hráčů podle jména nebo ID před začátkem utkání.

### 5. Modul Zápis o utkání (`index.html`)
* Řízený průchod fázemi utkání (*Před zápasem → 1. poločas → 2. poločas → Kontrola → Uzavření*).
* Správa sestav a realizačního týmu (pro kluby před zahájením utkání).
* Zaznamenávání událostí (góly, žluté a červené karty, střídání), odměn rozhodčích a zprávy rozhodčího.
* Automatická validace před uzavřením (potvrzené sestavy, vedoucí mužstev, druhá žlutá = červená karta, uložené odměny).
* **Živá synchronizace do veřejné části:** Po uzavření zápisu se výsledek, události, střelci i body automaticky propíší do veřejné tabulky soutěže a detailu utkání.
* Možnost kdykoliv resetovat všechny vyplněné zápisy zpět do výchozího stavu tlačítkem *Resetovat všechny zápisy*.

---

## Struktura projektu

```text
├── portal.html          # Hlavní vstupní stránka veřejného portálu
├── login.html           # Přihlášení, registrace a migrace účtu
├── dashboard.html       # Rozcestník pro administrátora klubu
├── players.html         # Evidence hráčů přihlášeného klubu
├── referee.html         # Panel rozhodčího (delegace a ověření totožnosti)
├── index.html           # Interaktivní modul Zápis o utkání
├── public-league.html   # Veřejná tabulka a rozpis soutěže
├── public-clubs.html    # Veřejný adresář klubů
├── public-club.html     # Veřejný profil klubu
├── public-players.html  # Veřejná databáze hráčů
├── public-match.html    # Veřejný detail odehraného zápasu
├── css/
│   └── styles.css       # Sdílené styly a design systém
└── js/
    ├── db.js            # Centrální testovací databáze, synchronizace a stav přihlášení
    ├── store.js         # Datový model a pravidla zápisu o utkání
    └── match.js         # Vykreslování a interakce v modulu zápisu