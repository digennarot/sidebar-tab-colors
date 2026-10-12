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
  settings: "#bdbdbd"
};

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

/** Read the tabs currently present in the sidebar (core + module-added). */
function getSidebarTabs() {
  const buttons = document.querySelectorAll("#sidebar-tabs button[data-action='tab'][data-tab]");
  return Array.from(buttons, (btn) => ({
    id: btn.dataset.tab,
    label: btn.getAttribute("aria-label") || btn.dataset.tab,
    icon: Array.from(btn.classList).filter((c) => c.startsWith("fa")).join(" ")
  }));
}

/** Write one CSS rule per colored tab into a <style> element in <head>. */
function applyColors() {
  const colors = game.settings.get(MODULE_ID, "colors") ?? {};
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  style.textContent = Object.entries(colors)
    .filter(([, color]) => color)
    .map(([tab, color]) => `#sidebar-tabs button[data-tab="${CSS.escape(tab)}"] { --stc-color: ${color}; }`)
    .join("\n");

  // Mark colored buttons so the base stylesheet only affects them
  for (const btn of document.querySelectorAll("#sidebar-tabs button[data-tab]")) {
    btn.classList.toggle("stc-colored", !!colors[btn.dataset.tab]);
  }
  document.body.classList.toggle("stc-glow", game.settings.get(MODULE_ID, "glow"));
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
      closeOnSubmit: true
    },
    actions: {
      reset: TabColorConfig.#onReset,
      applyPreset: TabColorConfig.#onApplyPreset
    }
  };

  async _renderHTML() {
    const colors = game.settings.get(MODULE_ID, "colors") ?? {};
    const esc = foundry.utils.escapeHTML;
    const rows = getSidebarTabs().map(({ id, label, icon }) => `
      <div class="form-group stc-row">
        <i class="${esc(icon)}" style="color:${esc(colors[id] ?? "")}"></i>
        <label>${esc(label)}</label>
        <color-picker name="${esc(id)}" value="${esc(colors[id] ?? "")}"></color-picker>
      </div>`).join("");

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
        <p class="hint">A preset fills in the colors below; click Save to keep them. Leave a color empty to keep the default look for that tab.</p>
        <hr>
        ${rows}
      </section>
      <footer class="form-footer">
        <button type="button" data-action="reset"><i class="fa-solid fa-rotate-left"></i> Reset defaults</button>
        <button type="submit"><i class="fa-solid fa-save"></i> Save</button>
      </footer>`;
    return html;
  }

  _replaceHTML(result, content) {
    content.replaceChildren(...result.children);
  }

  _onRender(context, options) {
    super._onRender(context, options);
    if (!options.isFirstRender) return;
    // Live-preview each icon in its picked color
    this.element.addEventListener("change", (event) => {
      const picker = event.target.closest("color-picker");
      if (picker) picker.closest(".stc-row").querySelector("i").style.color = picker.value ?? "";
    });
  }

  static #onApplyPreset() {
    const key = this.element.querySelector(".stc-preset-select").value;
    const pickers = Array.from(this.element.querySelectorAll(".stc-row color-picker"));
    const colors = PRESETS[key].colors(pickers.map((p) => p.name));
    for (const picker of pickers) {
      picker.value = colors[picker.name];
      picker.closest(".stc-row").querySelector("i").style.color = colors[picker.name];
    }
  }

  static async #onSubmit(event, form, formData) {
    // Keep colors for tabs not currently present (e.g. a disabled module)
    const colors = { ...game.settings.get(MODULE_ID, "colors") };
    for (const [tab, color] of Object.entries(formData.object)) {
      if (color) colors[tab] = color;
      else delete colors[tab];
    }
    await game.settings.set(MODULE_ID, "colors", colors);
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
    onChange: applyColors
  });

  game.settings.register(MODULE_ID, "glow", {
    name: "Glow on active/hover tab",
    hint: "Adds a soft glow in the tab's color to the active and hovered tab.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: applyColors
  });

  game.settings.registerMenu(MODULE_ID, "config", {
    name: "Sidebar Tab Colors",
    label: "Configure Colors",
    hint: "Pick a color for each sidebar tab.",
    icon: "fa-solid fa-palette",
    type: TabColorConfig,
    restricted: true
  });
});

Hooks.once("ready", applyColors);
// Re-apply when the sidebar re-renders (tabs added by other modules, etc.)
Hooks.on("renderSidebar", applyColors);
