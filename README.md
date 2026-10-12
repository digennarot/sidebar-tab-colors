# Sidebar Tab Colors

🇮🇹 [Italiano](#italiano) · 🇬🇧 [English](#english)

---

## Italiano

Modulo per Foundry VTT che colora i pulsanti delle schede della barra laterale (Chat, Combattimenti, Scene, Attori, Oggetti, Diari, ecc.), con un colore diverso per ogni scheda. Funziona anche con le schede aggiunte da altri moduli (per esempio Dice So Nice o FA Nexus).

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
| **Glow on active/hover tab** | Ogni giocatore | Solo chi la imposta | Attiva | Aggiunge un alone luminoso, del colore della scheda, alla scheda aperta e a quella sotto il mouse. |
| **Start with sidebar collapsed** | Ogni giocatore | Solo chi la imposta | Disattiva | Quando il gioco si carica, la barra laterale parte chiusa (come se avessi premuto la freccia ▸). Si riapre normalmente con la freccia. |

### La finestra dei colori

- **Elenco delle schede:** mostra tutte le schede presenti in quel momento nella barra laterale, comprese quelle aggiunte da altri moduli. Accanto a ogni scheda c'è la sua icona colorata come anteprima.
- **Selettore colore:** scegli il colore con il quadratino colorato oppure scrivi il codice esadecimale (es. `#ff7043`). **Lascia il campo vuoto** per tenere l'aspetto normale di Foundry per quella scheda.
- **Salvataggio automatico:** ogni modifica si vede subito nella barra laterale e si salva da sola, anche se chiudi la finestra con la X. Il pulsante **Done** chiude soltanto la finestra.
- **Preset + Apply:** scegli una palette dall'elenco e premi **Apply** per colorare tutte le schede in un colpo. Poi puoi ritoccare i singoli colori.
- **Reset defaults:** rimette la palette predefinita del modulo.
- I colori delle schede di moduli disattivati vengono conservati: se riattivi il modulo, la sua scheda ritrova il colore.

### Preset disponibili

I colori vengono assegnati alle schede nell'ordine in cui compaiono nella barra laterale. Se ci sono più schede che colori, la palette ricomincia dall'inizio.

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

A Foundry VTT module that colors the sidebar tab buttons (Chat, Combat, Scenes, Actors, Items, Journal, etc.), with a different color per tab. It also works with tabs added by other modules (for example Dice So Nice or FA Nexus).

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
| **Configure Colors** | GM only | Every player in the world | "Default" palette | Opens the window to pick a color for each tab (see below). |
| **Glow on active/hover tab** | Each player | Only that player | On | Adds a soft glow, in the tab's color, to the open tab and the one under the mouse. |
| **Start with sidebar collapsed** | Each player | Only that player | Off | The sidebar starts collapsed when the game loads (as if you clicked the ▸ arrow). Open it again with the arrow as usual. |

### The colors window

- **Tab list:** shows every tab currently in the sidebar, including tabs added by other modules. Each one shows its icon in the chosen color as a preview.
- **Color picker:** pick a color with the swatch or type a hex code (e.g. `#ff7043`). **Leave it empty** to keep Foundry's normal look for that tab.
- **Auto-save:** every change shows on the sidebar right away and saves itself, even if you close the window with the X. The **Done** button only closes the window.
- **Preset + Apply:** choose a palette from the list and click **Apply** to color every tab at once. Then fine-tune single colors if you like.
- **Reset defaults:** restores the module's default palette.
- Colors of tabs from disabled modules are kept: re-enable the module and its tab gets its color back.

### Presets

Colors are assigned to tabs in the order they appear in the sidebar. If there are more tabs than colors, the palette starts over.

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
