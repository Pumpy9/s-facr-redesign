# Zápis o utkání – redesign IS FAČR (ukázkový prototyp)

Funkční front-end prototyp desktopové verze elektronického zápisu (bakalářská práce).
Bez knihoven a bez instalace: otevři `index.html` v prohlížeči.

## Struktura
- `index.html`: sémantická kostra stránky a dialogy (`<dialog>`)
- `css/styles.css`: design tokeny (barvy, velikost dotykového prvku 48 px), rozložení, responzivita, tisk
- `js/app.js`: stav → pravidla → vykreslení → ukládání

## Co je naprogramováno
- postup po fázích (před zápasem → 1. poločas → 2. poločas → kontrola → uzavření)
- přidání, úprava a odebrání události (gól, ŽK, ČK, střídání), výběr hráče podle čísla dresu
- skóre a poločasový výsledek se počítají z událostí (včetně vlastní branky)
- kontrola před uzavřením (např. druhá ŽK musí mít ČK) blokuje uzavření zápisu
- automatické ukládání (`localStorage`) a stavový údaj „Uloženo“
- vlastní potvrzovací dialog místo `confirm()` prohlížeče, přístupnost (štítky, focus, `aria-*`)

## Jak to funguje
Čisté funkce `score()` a `validate()` nepracují s DOM. Stav se mění jen v obslužných funkcích a vždy se
volá `render()`. DOM se skládá funkcí `h()` bez `innerHTML`, takže data nelze vložit jako HTML.

## Co zatím chybí
Mobilní rozložení pro dotyk, sestavy a jejich potvrzení, odměny rozhodčích, zpráva rozhodčího a napojení na server.
Data jsou vymyšlená, žádné reálné osobní údaje.
