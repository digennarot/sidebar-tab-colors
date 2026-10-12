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
      reset: TabColorConfig.#onReset
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

    const html = document.createElement("div");
    html.innerHTML = `
      <section class="standard-form">
        <p class="hint">Leave a color empty to keep the default look for that tab.</p>
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
