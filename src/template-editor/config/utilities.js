const swv = "sw-visibility";
const expt = "export-template";
const prv = "preview";
const ful = "fullscreen";
const deviceTablet = "set-device-tablet";
const deviceMobile = "set-device-mobile";
const deviceDesktop = "set-device-desktop";

export const layerManager = {
  appendTo: "#layers-container",
};
export const traitManager = {
  appendTo: "#traits-container",
};
export const selectorManager = {
  appendTo: "#styles-container",
};
export const panels = {
  defaults: [
    {
      id: "editor-actions",
      el: ".panel__editor",
      buttons: [
        {
          id: swv,
          command: swv,
          className: "fa fa-square-o",
          active: true,
        },
        {
          id: prv,
          context: prv,
          command: (e) => e.runCommand(prv),
          className: "fa fa-eye",
        },
        {
          id: ful,
          command: ful,
          className: "fa fa-arrows-alt",
        },
        {
          id: expt,
          className: "fa fa-code",
          command: (e) => e.runCommand(expt),
        },
        {
          id: "undo",
          className: "fa fa-undo",
          command: (e) => e.runCommand("core:undo"),
          attributes: { title: "Undo last action" },
        },
        {
          id: "redo",
          className: "fa fa-repeat",
          command: (e) => e.runCommand("core:redo"),
          attributes: { title: "Redo last action" },
        },
      ],
    },
    {
      id: "panel-devices",
      el: ".panel__devices",
      buttons: [
        {
          id: deviceDesktop,
          command: deviceDesktop,
          className: "fa fa-desktop",
          active: 1,
        },
        {
          id: deviceTablet,
          command: deviceTablet,
          className: "fa fa-tablet",
        },
        {
          id: deviceMobile,
          command: deviceMobile,
          className: "fa fa-mobile",
        },
      ],
    },
  ],
};
// widthMedia: "480px",
export const deviceManager = {
  devices: [
    {
      name: "Mobile",
      width: "450px",
    },
    {
      name: "Tablet",
      width: "768px",
    },
    {
      name: "Desktop",
      width: "",
    },
  ],
};
