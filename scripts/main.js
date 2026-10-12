const MODULE_ID = "sidebar-tab-colors";
const STYLE_ID = `${MODULE_ID}-dynamic`;

/** Default colors for core tabs (and a few common module tabs). */
const DEFAULT_COLORS = {
  chat: "#4fc3f7",
  combat: "#ef5350",
  scenes: "#66bb6a",
  "layer-manager": "#26a69a",
  placeables: "#ab47bc",
  actors: "#ffa726",
  items: "#d4a017",
  journal: "#8d6e63",
  tables: "#7e57c2",
  cards: "#ec407a",
  macros: "#9ccc65",
  playlists: "#29b6f6",
  compendium: "#5c6bc0",
  "dice-so-nice": "#ff7043",
  settings: "#bdbdbd",
  // Scene control layer buttons (left toolbar), prefixed to avoid clashing with tab ids
  "control:tokens": "#ffa726",
  "control:templates": "#26c6da",
  "control:tiles": "#ab47bc",
  "control:drawings": "#ec407a",
  "control:walls": "#bdbdbd",
  "control:lighting": "#ffee58",
  "control:sounds": "#29b6f6",
  "control:regions": "#66bb6a",
  "control:notes": "#8d6e63"
};

const CONTROL_PREFIX = "control:";
const CONTROL_DEFAULTS = Object.fromEntries(Object.entries(DEFAULT_COLORS).filter(([key]) => key.startsWith(CONTROL_PREFIX)));

/** Convert HSL (h in degrees, s/l in 0-1) to a #rrggbb string. */
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Spread a palette over the tabs, cycling when there are more tabs than colors. */
const cycle = (palette) => (tabs) => Object.fromEntries(tabs.map((tab, i) => [tab, palette[i % palette.length]]));

/** Spread a hue range evenly over the tabs. */
const gradient = (from, to, s, l) => (tabs) => Object.fromEntries(tabs.map((tab, i) =>
  [tab, hslToHex(from + ((to - from) * i) / Math.max(tabs.length - 1, 1), s, l)]));

/** Each preset maps the ordered list of tab ids to a { tab: color } object. */
const PRESETS = {
  default: { label: "Default", colors: (tabs) => Object.fromEntries(tabs.map((tab, i) =>
    [tab, DEFAULT_COLORS[tab] ?? hslToHex((i * 137.5) % 360, 0.6, 0.6)])) },
  rainbow: { label: "Rainbow", colors: gradient(0, 300, 0.85, 0.6) },
  solarized: { label: "Solarized", colors: cycle(["#b58900", "#cb4b16", "#dc322f", "#d33682", "#6c71c4", "#268bd2", "#2aa198", "#859900"]) },
  nord: { label: "Nord", colors: cycle(["#bf616a", "#d08770", "#ebcb8b", "#a3be8c", "#b48ead", "#88c0d0", "#81a1c1", "#5e81ac", "#8fbcbb"]) },
  dracula: { label: "Dracula", colors: cycle(["#ff5555", "#ffb86c", "#f1fa8c", "#50fa7b", "#8be9fd", "#bd93f9", "#ff79c6"]) },
  gruvbox: { label: "Gruvbox", colors: cycle(["#fb4934", "#fe8019", "#fabd2f", "#b8bb26", "#8ec07c", "#83a598", "#d3869b"]) },
  monokai: { label: "Monokai", colors: cycle(["#f92672", "#fd971f", "#e6db74", "#a6e22e", "#66d9ef", "#ae81ff"]) },
  catppuccin: { label: "Catppuccin Mocha", colors: cycle(["#f38ba8", "#fab387", "#f9e2af", "#a6e3a1", "#94e2d5", "#89b4fa", "#cba6f7", "#f5c2e7", "#74c7ec", "#b4befe"]) },
  tokyonight: { label: "Tokyo Night", colors: cycle(["#f7768e", "#ff9e64", "#e0af68", "#9ece6a", "#73daca", "#7dcfff", "#7aa2f7", "#bb9af7"]) },
  pastel: { label: "Pastel", colors: cycle(["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"]) },
  neon: { label: "Neon", colors: cycle(["#ff00ff", "#00ffff", "#39ff14", "#ffff00", "#ff073a", "#bc13fe", "#ff6ec7"]) },
  ocean: { label: "Ocean", colors: gradient(170, 240, 0.7, 0.6) },
  sunset: { label: "Sunset", colors: gradient(-20, 50, 0.9, 0.62) },
  forest: { label: "Forest", colors: gradient(60, 160, 0.5, 0.5) },
  gold: { label: "Monochrome Gold", colors: cycle(["#d4a017"]) },
  silver: { label: "Monochrome Silver", colors: cycle(["#c0c0c0"]) }
};

/** Font Awesome classes of a button, to show its icon in the config window. */
const iconOf = (btn) => Array.from(btn.classList).filter((c) => c.startsWith("fa")).join(" ");

/**
 * Read the buttons matching a selector as { id, label, icon }.
 * @param {string} selector  Buttons to read.
 * @param {string} key       dataset key holding the button id.
 * @param {string} [prefix]  Prepended to the id to build the color key.
 */
function readButtons(selector, key, prefix = "") {
  return Array.from(document.querySelectorAll(selector), (btn) => ({
    id: prefix + btn.dataset[key],
    label: btn.getAttribute("aria-label") || btn.dataset[key],
    icon: iconOf(btn)
  }));
}

/** Tabs currently present in the sidebar (core + module-added). */
const getSidebarTabs = () => readButtons("#sidebar-tabs button[data-action='tab'][data-tab]", "tab");

/** Scene control layer buttons (left toolbar, core + module-added). */
const getSceneControls = () => readButtons("#scene-controls-layers button[data-control]", "control", CONTROL_PREFIX);

/** CSS selector for the button a color key refers to (same elements the readers above list). */
function selectorFor(key) {
  if (key.startsWith(CONTROL_PREFIX)) {
    return `#scene-controls-layers button[data-control="${CSS.escape(key.slice(CONTROL_PREFIX.length))}"]`;
  }
  return `#sidebar-tabs button[data-tab="${CSS.escape(key)}"]`;
}

/**
 * Write the button colors as CSS rules into a <style> element in <head>.
 * The rules target the buttons by data-tab / data-control, so they survive the
 * sidebar, the scene controls (or another UI module) re-rendering the buttons.
 * @param {object} [colors]  Colors to show; defaults to the saved setting (used for live preview).
 */
function applyColors(colors) {
  colors ??= game.settings.get(MODULE_ID, "colors") ?? {};
  const glow = game.settings.get(MODULE_ID, "glow");
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  style.textContent = Object.entries(colors)
    .filter(([, color]) => /^#[0-9a-f]{3,8}$/i.test(color ?? ""))
    .map(([key, color]) => {
      const sel = selectorFor(key);
      const on = `${sel}:hover, ${sel}.active, ${sel}[aria-pressed="true"]`;
      const rules = [
        `${sel} { color: ${color} !important; opacity: 0.75; transition: opacity 0.15s, text-shadow 0.15s, box-shadow 0.15s; }`,
        `${on} { opacity: 1; }`,
        glow ? `${on} { text-shadow: 0 0 8px ${color}; }` : ""
      ];
      if (key.startsWith(CONTROL_PREFIX)) {
        // The active layer has a filled accent background: a light icon color would be unreadable
        // on it, so keep Foundry's own icon color and show the chosen color as a ring instead.
        rules.push(`${sel}[aria-pressed="true"] { color: revert-layer !important; text-shadow: none; ` +
          `box-shadow: inset 0 0 0 2px ${color}${glow ? `, 0 0 8px ${color}` : ""}; }`);
      }
      return rules.join("\n");
    })
    .join("\n");
}

class TabColorConfig extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    id: "sidebar-tab-colors-config",
    tag: "form",
    window: {
      title: "Sidebar Tab Colors",
      icon: "fa-solid fa-palette",
      contentClasses: ["standard-form"]
    },
    position: { width: 420 },
    form: {
      handler: TabColorConfig.#onSubmit,
      closeOnSubmit: false
    },
    actions: {
      reset: TabColorConfig.#onReset,
      applyPreset: TabColorConfig.#onApplyPreset,
      done: TabColorConfig.#onDone
    }
  };

  /** True while there are changes not yet written to the setting. */
  #dirty = false;

  /** Save shortly after the last change, so applying a preset saves once. */
  #saveSoon = foundry.utils.debounce(() => { if (this.#dirty && this.rendered) this.submit(); }, 300);

  async _renderHTML() {
    const colors = game.settings.get(MODULE_ID, "colors") ?? {};
    const esc = foundry.utils.escapeHTML;
    const rows = (buttons) => buttons.map(({ id, label, icon }) => `
      <div class="form-group stc-row">
        <i class="${esc(icon)}" style="color:${esc(colors[id] ?? "")}"></i>
        <label>${esc(label)}</label>
        <color-picker name="${esc(id)}" value="${esc(colors[id] ?? "")}"></color-picker>
      </div>`).join("");
    const controls = getSceneControls();

    const presetOptions = Object.entries(PRESETS)
      .map(([key, { label }]) => `<option value="${key}">${esc(label)}</option>`).join("");

    const html = document.createElement("div");
    html.innerHTML = `
      <section class="standard-form">
        <div class="form-group stc-preset">
          <label>Preset</label>
          <select class="stc-preset-select">${presetOptions}</select>
          <button type="button" data-action="applyPreset"><i class="fa-solid fa-wand-magic-sparkles"></i> Apply</button>
        </div>
        <p class="hint">Changes apply and save immediately. Leave a color empty to keep the default look for that button.</p>
        <fieldset class="stc-group">
          <legend>Sidebar tabs</legend>
          ${rows(getSidebarTabs())}
        </fieldset>
        <fieldset class="stc-group">
          <legend>Scene controls</legend>
          ${controls.length ? rows(controls) : `<p class="hint">Open a scene to configure the scene control buttons.</p>`}
        </fieldset>
      </section>
      <footer class="form-footer">
        <button type="button" data-action="reset"><i class="fa-solid fa-rotate-left"></i> Reset defaults</button>
        <button type="button" data-action="done"><i class="fa-solid fa-check"></i> Done</button>
      </footer>`;
    return html;
  }

  _replaceHTML(result, content) {
    content.replaceChildren(...result.children);
  }

  _onRender(context, options) {
    super._onRender(context, options);
    if (!options.isFirstRender) return;
    this.element.addEventListener("change", (event) => {
      const picker = event.target.closest("color-picker");
      if (!picker) return;
      picker.closest(".stc-row").querySelector("i").style.color = picker.value ?? "";
      applyColors(this.#formColors());   // live preview on the sidebar
      this.#dirty = true;
      this.#saveSoon();
    });
  }

  /** Flush unsaved changes when the window is closed (also via the X). */
  async _preClose(options) {
    await super._preClose(options);
    if (this.#dirty) await this.submit();
  }

  /** Saved colors merged with the current form values. */
  #formColors() {
    // Keep colors for tabs not currently present (e.g. a disabled module)
    const colors = { ...game.settings.get(MODULE_ID, "colors") };
    for (const picker of this.element.querySelectorAll(".stc-row color-picker")) {
      if (picker.value) colors[picker.name] = picker.value;
      else delete colors[picker.name];
    }
    return colors;
  }

  static #onApplyPreset() {
    const key = this.element.querySelector(".stc-preset-select").value;
    // Each group gets the whole palette, so the toolbar doesn't continue where the sidebar ended.
    for (const group of this.element.querySelectorAll(".stc-group")) {
      const pickers = Array.from(group.querySelectorAll(".stc-row color-picker"));
      const colors = PRESETS[key].colors(pickers.map((p) => p.name));
      // Setting picker.value fires a change event per picker; the debounced save runs once.
      for (const picker of pickers) picker.value = colors[picker.name];
    }
  }

  static async #onSubmit() {
    this.#dirty = false;
    await game.settings.set(MODULE_ID, "colors", this.#formColors());
  }

  static #onDone() {
    this.close();
  }

  static async #onReset() {
    await game.settings.set(MODULE_ID, "colors", { ...DEFAULT_COLORS });
    this.render();
  }
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "colors", {
    scope: "world",
    config: false,
    type: Object,
    default: { ...DEFAULT_COLORS },
    onChange: () => applyColors()
  });

  // Number of MIGRATIONS already applied to this world.
  game.settings.register(MODULE_ID, "schemaVersion", {
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });

  game.settings.register(MODULE_ID, "glow", {
    name: "Glow on active/hover button",
    hint: "Adds a soft glow in the button's color to the active and hovered sidebar tab and scene control.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => applyColors()
  });

  game.settings.register(MODULE_ID, "startCollapsed", {
    name: "Start with sidebar collapsed",
    hint: "Collapse the sidebar automatically when the game loads.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.registerMenu(MODULE_ID, "config", {
    name: "Sidebar Tab Colors",
    label: "Configure Colors",
    hint: "Pick a color for each sidebar tab and scene control button.",
    icon: "fa-solid fa-palette",
    type: TabColorConfig,
    restricted: true
  });
});

/** Collapse the sidebar, preferring the API and falling back to clicking the collapse button. */
function collapseSidebar() {
  const sidebar = ui.sidebar;
  if (!sidebar || sidebar.expanded === false) return;
  if (typeof sidebar.collapse === "function") sidebar.collapse();
  else if (typeof sidebar.toggleExpanded === "function") sidebar.toggleExpanded(false);
  else document.querySelector("#sidebar-tabs button.collapse[data-action='toggleState']")?.click();
}

/**
 * World data migrations, run in order by the GM. Each one takes the saved colors and
 * returns the new colors, or null when nothing needs to be written.
 */
const MIGRATIONS = [
  // 1: worlds saved before scene controls were supported get their default colors.
  (colors) => {
    const missing = Object.keys(CONTROL_DEFAULTS).filter((key) => !(key in colors));
    return missing.length ? { ...CONTROL_DEFAULTS, ...colors } : null;
  }
];

async function migrate() {
  const from = game.settings.get(MODULE_ID, "schemaVersion");
  if (from >= MIGRATIONS.length) return;
  let colors = game.settings.get(MODULE_ID, "colors") ?? {};
  let changed = false;
  for (const step of MIGRATIONS.slice(from)) {
    const next = step(colors);
    if (next) { colors = next; changed = true; }
  }
  if (changed) await game.settings.set(MODULE_ID, "colors", colors);
  await game.settings.set(MODULE_ID, "schemaVersion", MIGRATIONS.length);
}

Hooks.once("ready", () => {
  applyColors();
  if (game.settings.get(MODULE_ID, "startCollapsed")) collapseSidebar();
  if (game.user.isGM) {
    migrate().catch((err) => console.error(`${MODULE_ID} | Migration failed`, err));
  }
});
// Re-apply when the sidebar re-renders (tabs added by other modules, etc.)
Hooks.on("renderSidebar", () => applyColors());
