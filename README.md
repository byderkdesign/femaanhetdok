# FEM aan het Dok — custom code

Custom CSS en JS voor [femaanhetdok.nl](https://www.femaanhetdok.nl) (Webflow). De code staat hier in plaats van in de Webflow-instellingen, zodat hij versiebeheer heeft en buiten Webflow te bewerken is.

## Bestanden

| Bestand | Inhoud |
| --- | --- |
| `css/fem.css` | Osmo-schaal (`--size-font` op de `body`), megamenu-states, openingstijden-indicator |
| `js/fem.js` | Lenis, megamenu (open/dicht, Esc, Lenis stop/start), GSAP-hover van het homepage-menu |

## Laden in Webflow

Site settings → Custom code.

**Head**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/byderkdesign/femaanhetdok@v0.1.0/css/fem.css">
```

**Footer** (na Lenis; GSAP komt uit de Webflow-instellingen)

```html
<script src="https://cdn.jsdelivr.net/gh/byderkdesign/femaanhetdok@v0.1.0/js/fem.js" defer></script>
```

## Een wijziging live zetten

1. Pas de code aan en merge naar `main`.
2. Maak een nieuwe tag, bijvoorbeeld `v0.1.1`.
3. Zet het versienummer in de twee regels hierboven in Webflow op die tag en publiceer.

Werk altijd met een tag in de URL: jsDelivr cachet `@main` tot 12 uur, een tag is direct en vast.

## Data-attributen

| Attribuut | Waar | Doel |
| --- | --- | --- |
| `data-navigation-status="not-active"` | wrapper van het megamenu | open/dicht-status |
| `data-navigation-toggle="toggle"` | hamburger | menu openen/sluiten |
| `data-navigation-toggle="close"` | sluitknop / overlay | menu sluiten |
| `data-menu-hover="list"` | CMS-lijst op de homepage | hovermenu |
| `data-menu-hover="item"` | link per menu-item | hover-trigger |
| `data-menu-hover="image"` | afbeelding in het item | fadet in/uit op desktop |

Classnamen volgen het DONDRS-framework v2.0.
