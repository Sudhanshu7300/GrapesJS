const steps = [
  {
    element: "#gjs",
    intro:
      "Welcome to your website editor. We will give you a brief tour of the features you have :)",
  },

  {
    element: ".fa-desktop",
    intro: "Switch canvas to Desktop size screen.",
  },

  {
    element: ".fa-tablet",
    intro: "Switch canvas to Tablet size screen.",
  },

  {
    element: ".fa-mobile",
    intro: "Switch canvas to Mobile size screen.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-square-o",
    intro: "Enable outline on components inside canvas.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-eye",
    intro: "Enable demo mode.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-arrows-alt",
    intro: "Toggle full screen mode.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-code",
    intro: "View generated HTML & CSS code.",
  },

  {
    element: ".fa.fa-undo",
    intro: "Undo last action done.",
  },

  {
    element: ".fa.fa-repeat",
    intro: "Redo last action done.",
  },

  {
    element: ".fa.fa-trash",
    intro: "Clear canvas.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-th-large",
    intro: "Pre-styled components that can be dragged & dropped to the canvas.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-paint-brush",
    intro: "Style properties to personalize the components.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-cog",
    intro: "Custom propertes for components.",
  },

  {
    element: ".gjs-pn-btn.fa.fa-bars",
    intro: `Stack of layers that are added to the canvas.`,
  },
];

const hints = [
  {
    element: ".gjs-title",
    hint: "Hello hint",
    hintPosition: "middle-right",
  },
];

module.exports = { hints, steps };
