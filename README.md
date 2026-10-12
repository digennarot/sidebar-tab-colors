# Sidebar Tab Colors

🇮🇹 [Italiano](#italiano) · 🇬🇧 [English](#english)

---

## Italiano

Modulo per Foundry VTT che colora i pulsanti delle schede della barra laterale (Chat, Combattimenti, Scene, Attori, Oggetti, Diari, ecc.), con un colore diverso per ogni scheda. Colora anche i pulsanti dei controlli scena nella barra a sinistra (Token, Template, Tile, Disegni, Muri, Luci, Suoni, Regioni, Note). Funziona anche con le schede e i pulsanti aggiunti da altri moduli (per esempio Dice So Nice, FA Nexus o Art Browser).

**Compatibilità:** Foundry VTT v13 e v14.

### Installazione

Nella finestra **Installa modulo** di Foundry, incolla questo URL del manifest:

```
https://github.com/digennarot/sidebar-tab-colors/releases/latest/download/module.json
```

Poi attiva il modulo nel mondo da **Gestisci moduli**.

### Opzioni

Si trovano in **Impostazioni di gioco → Configura impostazioni → Sidebar Tab Colors**.

| Opzione | Chi la vede | Vale per | Predefinito | Cosa fa |
|---|---|---|---|---|
| **Configure Colors** | Solo il GM | Tutti i giocatori del mondo | Palette "Default" | Apre la finestra per scegliere il colore di ogni scheda (vedi sotto). |
| **Glow on active/hover button** | Ogni giocatore | Solo chi la imposta | Attiva | Aggiunge un alone luminoso, del colore del pulsante, alla scheda o al controllo scena attivo e a quello sotto il mouse. |
| **Start with sidebar collapsed** | Ogni giocatore | Solo chi la imposta | Disattiva | Quando il gioco si carica, la barra laterale parte chiusa (come se avessi premuto la freccia ▸). Si riapre normalmente con la freccia. |

### La finestra dei colori

- **Elenco delle schede:** è diviso in due sezioni, **Sidebar tabs** (le schede della barra laterale) e **Scene controls** (i pulsanti dei controlli scena a sinistra). Mostra tutto ciò che è presente in quel momento, compresi i pulsanti aggiunti da altri moduli. Accanto a ognuno c'è la sua icona colorata come anteprima.
- **Controlli scena:** compaiono solo se c'è una scena aperta. Se la sezione dice di aprire una scena, aprila e riapri la finestra.
- **Selettore colore:** scegli il colore con il quadratino colorato oppure scrivi il codice esadecimale (es. `#ff7043`). **Lascia il campo vuoto** per tenere l'aspetto normale di Foundry per quel pulsante.
- **Controllo scena attivo:** Foundry gli mette uno sfondo evidenziato, quindi l'icona resta del colore normale e il colore scelto appare come bordo, così si legge bene anche con colori chiari.
- **Salvataggio automatico:** ogni modifica si vede subito nella barra laterale e si salva da sola, anche se chiudi la finestra con la X. Il pulsante **Done** chiude soltanto la finestra.
- **Preset + Apply:** scegli una palette dall'elenco e premi **Apply** per colorare tutte le schede e tutti i controlli scena in un colpo. Poi puoi ritoccare i singoli colori.
- **Reset defaults:** rimette la palette predefinita del modulo.
- I colori delle schede di moduli disattivati vengono conservati: se riattivi il modulo, la sua scheda ritrova il colore.

### Preset disponibili

I colori vengono assegnati nell'ordine in cui compaiono i pulsanti, separatamente per le schede della barra laterale e per i controlli scena (ognuna delle due sezioni usa tutta la palette). Se ci sono più pulsanti che colori, la palette ricomincia dall'inizio.

| Preset | Descrizione |
|---|---|
| **Default** | La palette del modulo, con un colore pensato per ogni scheda di Foundry. |
| **Rainbow** | Arcobaleno che va dal rosso al viola, distribuito su tutte le schede. |
| **Solarized** | I colori d'accento del tema Solarized. |
| **Nord** | Toni freddi e tenui del tema Nord. |
| **Dracula** | Colori vivaci su base scura, dal tema Dracula. |
| **Gruvbox** | Toni caldi e "retro" del tema Gruvbox. |
| **Monokai** | I colori classici dell'editor Monokai. |
| **Catppuccin Mocha** | Pastelli morbidi del tema Catppuccin. |
| **Tokyo Night** | Blu, viola e accenti caldi del tema Tokyo Night. |
| **Pastel** | Colori pastello chiari. |
| **Neon** | Colori fluo molto saturi. |
| **Ocean** | Sfumatura dal verde acqua al blu. |
| **Sunset** | Sfumatura dal rosa al giallo, come un tramonto. |
| **Forest** | Sfumatura di verdi e gialli. |
| **Monochrome Gold** | Tutte le schede color oro. |
| **Monochrome Silver** | Tutte le schede color argento. |

### Canale beta

Se vuoi provare le versioni in anteprima, installa il modulo con questo URL al posto di quello normale:

```
https://github.com/digennarot/sidebar-tab-colors/releases/download/beta/module.json
```

Riceverai sempre la versione più nuova, beta o stabile. Quando aggiorni a una versione stabile torni automaticamente sul canale normale.

### Pubblicare una nuova versione (per lo sviluppatore)

Fai il push di un tag di versione: la GitHub Action imposta la versione in `module.json`, crea `module.zip` e pubblica la release.

```
git tag v1.0.1
git push origin v1.0.1
```

| Tag | Risultato |
|---|---|
| `vX.Y.Z` (es. `v1.2.3`) | Release stabile, proposta a tutti come aggiornamento. |
| `vX.Y.Z-suffisso` (es. `v1.3.0-beta.1`) | Pre-release, proposta solo sul canale beta. |
| Qualsiasi altro formato (`vtest`, `v1.2`) | Il workflow fallisce e non pubblica niente. |

- Una correzione di una versione stabile è una nuova patch (`v1.0.2`), non `v1.0.1-hotfix`: il trattino significa sempre pre-release.
- Rilanciare il workflow sostituisce i file della release esistente.
- Solo la versione stabile più alta diventa "latest".
- I commenti in [`.github/workflows/release.yml`](.github/workflows/release.yml) spiegano ogni opzione.

---

## English

A Foundry VTT module that colors the sidebar tab buttons (Chat, Combat, Scenes, Actors, Items, Journal, etc.), with a different color per tab. It also colors the scene control buttons in the left toolbar (Tokens, Templates, Tiles, Drawings, Walls, Lighting, Sounds, Regions, Notes). It works with tabs and buttons added by other modules too (for example Dice So Nice, FA Nexus or Art Browser).

**Compatibility:** Foundry VTT v13 and v14.

### Install

In Foundry's **Install Module** dialog, paste this manifest URL:

```
https://github.com/digennarot/sidebar-tab-colors/releases/latest/download/module.json
```

Then enable the module in your world from **Manage Modules**.

### Options

Found under **Game Settings → Configure Settings → Sidebar Tab Colors**.

| Option | Who sees it | Applies to | Default | What it does |
|---|---|---|---|---|
| **Configure Colors** | GM only | Every player in the world | "Default" palette | Opens the window to pick a color for each tab and scene control (see below). |
| **Glow on active/hover button** | Each player | Only that player | On | Adds a soft glow, in the button's color, to the active tab or scene control and the one under the mouse. |
| **Start with sidebar collapsed** | Each player | Only that player | Off | The sidebar starts collapsed when the game loads (as if you clicked the ▸ arrow). Open it again with the arrow as usual. |

### The colors window

- **Button list:** split into two sections, **Sidebar tabs** and **Scene controls** (the left toolbar). It shows everything currently present, including buttons added by other modules. Each one shows its icon in the chosen color as a preview.
- **Scene controls:** only appear while a scene is open. If the section asks you to open a scene, open one and reopen the window.
- **Color picker:** pick a color with the swatch or type a hex code (e.g. `#ff7043`). **Leave it empty** to keep Foundry's normal look for that button.
- **Active scene control:** Foundry gives it a highlighted background, so its icon keeps the normal color and the chosen color shows as a ring, staying readable even with light colors.
- **Auto-save:** every change shows on the sidebar right away and saves itself, even if you close the window with the X. The **Done** button only closes the window.
- **Preset + Apply:** choose a palette from the list and click **Apply** to color every tab and scene control at once. Then fine-tune single colors if you like.
- **Reset defaults:** restores the module's default palette.
- Colors of tabs from disabled modules are kept: re-enable the module and its tab gets its color back.

### Presets

Colors are assigned in the order the buttons appear, separately for the sidebar tabs and the scene controls (each section uses the whole palette). If there are more buttons than colors, the palette starts over.

| Preset | Description |
|---|---|
| **Default** | The module's palette, with a color chosen for each Foundry tab. |
| **Rainbow** | A rainbow from red to violet, spread over all tabs. |
| **Solarized** | The accent colors of the Solarized theme. |
| **Nord** | Cool, muted tones of the Nord theme. |
| **Dracula** | Vivid colors for dark backgrounds, from the Dracula theme. |
| **Gruvbox** | Warm, retro tones of the Gruvbox theme. |
| **Monokai** | The classic Monokai editor colors. |
| **Catppuccin Mocha** | Soft pastels of the Catppuccin theme. |
| **Tokyo Night** | Blues, purples and warm accents of the Tokyo Night theme. |
| **Pastel** | Light pastel colors. |
| **Neon** | Highly saturated neon colors. |
| **Ocean** | A gradient from teal to blue. |
| **Sunset** | A gradient from pink to yellow. |
| **Forest** | A gradient of greens and yellows. |
| **Monochrome Gold** | Every tab in gold. |
| **Monochrome Silver** | Every tab in silver. |

### Beta channel

To try preview versions, install the module with this URL instead of the normal one:

```
https://github.com/digennarot/sidebar-tab-colors/releases/download/beta/module.json
```

You always get the newest version, beta or stable. Updating to a stable version moves you back to the normal channel automatically.

### Releasing a new version (for the developer)

Push a version tag; the GitHub Action sets the version in `module.json`, builds `module.zip` and publishes the release.

```
git tag v1.0.1
git push origin v1.0.1
```

| Tag | Result |
|---|---|
| `vX.Y.Z` (e.g. `v1.2.3`) | Stable release, offered to everyone as an update. |
| `vX.Y.Z-suffix` (e.g. `v1.3.0-beta.1`) | Pre-release, offered only on the beta channel. |
| Any other format (`vtest`, `v1.2`) | The workflow fails and publishes nothing. |

- A fix for a stable version is a new patch (`v1.0.2`), not `v1.0.1-hotfix`: a dash always means pre-release.
- Re-running the workflow replaces the files of the existing release.
- Only the highest stable version becomes "latest".
- The comments in [`.github/workflows/release.yml`](.github/workflows/release.yml) explain every option.
