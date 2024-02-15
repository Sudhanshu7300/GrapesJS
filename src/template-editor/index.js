import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";

// @material-ui/core components
import {
  Box,
  Tab,
  Tabs,
  List,
  Fade,
  Modal,
  ListItem,
  Backdrop,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Collapse,
  Radio,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import Logo from "./img/logo.png";
// @material-ui/icons
import SaveIcon from "@material-ui/icons/Save";
import CodeIcon from "@material-ui/icons/Code";
// import CloseIcon from "@material-ui/icons/Close";
// import CheckIcon from "@material-ui/icons/Check";
import StyleIcon from "@material-ui/icons/Style";
import LayersIcon from "@material-ui/icons/Layers";
// import SearchIcon from "@material-ui/icons/Search";
import WidgetsIcon from "@material-ui/icons/Widgets";
import SettingsIcon from "@material-ui/icons/Settings";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

// GrapesJS
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import blockManager from "./config/blockManager";
import styleManager from "./config/styleManager";
import {
  deviceManager,
  panels,
  layerManager,
  traitManager,
  // selectorManager,
} from "./config/utilities";
import "./css/grapes.css";

// import "grapesjs-indexeddb";
// import "grapesjs-template-manager/dist/grapesjs-template-manager.min.css";

// IntroJS
// import { steps, hints } from "./config/introSteps";
// import { Steps, Hints } from "intro.js-react";
// import "intro.js/introjs.css";
// import PageLayout from "./example/PageLayout";
// import Button from "components/Button";
// // import { adminRequest } from "requestMethods";
// import Typography from "./components/Typography/Typography/TypographyRoot";
// import BadgeDot from "./components/BadgeDot";
// import Box from "./components/Box/BoxRoot";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </div>
  );
}

const ThemeEditor = () => {
  const { themeId } = useParams();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [page, setPage] = useState(null);
  const [pagesList, setPagesList] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [editor, setEditor] = useState(null);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProductBlock, setSelectedProductBlock] = useState(null);
  const [openRadio, setOpenRadio] = useState(false);
  const [dummyProductRadio, setDummyProductRadio] = useState(false);
  const [dbProductRadio, setDbProductRadio] = useState(false);
  const [products, setProducts] = useState(null);
  const [templateBlocks, setTemplateBlocks] = useState(null);
  const [localDb, setLocalDb] = useState(null);
  const [grapesJsDb, setGrapesJsDb] = useState(null);

  useEffect(() => {
    initEditor();
  }, []);
  const initEditor = async () => {
    // test();
    // let data = await test(`gjs-${themeId}-${page}`);
    // let htmlData = await getFromLocalDb(`gjs-${themeId}-${page}html`);
    // let cssData = await getFromLocalDb(`gjs-${themeId}-${page}css`);
    // console.log("before GRAPESJS >>>>> ", htmlData);
    // return;
    $(".panel__editor").html("");
    $(".panel__devices").html("");
    $("#blocks-container").html("");
    $("#styles-container").html("");
    $("#layers-container").html("");
    $("#traits-container").html("");
    const topBar = $("#top-bar");
    const sidebar = $("#sidebar");
    const grapesConfig = {
      container: "#editor",
      height: "100vh",
      allowScripts: 1,
      showOffsets: 1,
      autorender: 1,
      noticeOnUnload: 0,
      clearOnRender: 0,
      protectedCss:
        ".iframe-wrapper{padding-bottom:30px;}section:last-child{margin-bottom:30px}",
      canvas: {
        styles: [
          "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/font-awesome-line-awesome/css/all.min.css",
          "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
          "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
          "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
          "https://fonts.googleapis.com/css?family=Raleway",
          "http://fonts.googleapis.com/css?family=Lato:400,700",
          "https://sachinchoolur.github.io/lightslider/dist/css/lightslider.css",
          "https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.css",
        ],
        scripts: [
          "https://code.jquery.com/jquery-1.12.4.js",
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js",
          "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
          "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
          "https://sachinchoolur.github.io/lightslider/dist/js/lightslider.js",
          "https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.min.js",
          "https://cdn.jsdelivr.net/npm/fullcalendar@5.10.2/main.js",
        ],
      },
      components: localStorage.getItem(`gjs-${themeId}-${page}html`)
        ? localStorage.getItem(`gjs-${themeId}-${page}html`)
        : localStorage.getItem(`${themeId}-${page}-contentHtml`),
      style: localStorage.getItem(`gjs-${themeId}-${page}css`)
        ? localStorage.getItem(`gjs-${themeId}-${page}css`)
        : localStorage.getItem(`${themeId}-${page}-contentCss`),
      // components: data ? data[`gjs-${themeId}-${page}html`] : htmlData.data,
      // style: data ? data[`gjs-${themeId}-${page}css`] : cssData.data,
      // components: htmlData.data,
      // style: cssData.data,
      panels,
      // selectorManager,
      styleManager,
      deviceManager,
      layerManager,
      traitManager,
      blockManager: {
        appendTo: "#blocks-container",
        blocks: blockManager.blocks,
      },
      // storageManager: {
      //   type: "rest-api",
      //   // the URIs below can be the same depending on your API design
      //   urlStore: "http://localhost:8000/api/saveTemplateData", // POST
      //   urlLoad: "https://endpoint/load/", // GET
      //   params: { id: `gjs-${themeId}-${page}` },
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      //   autosave: true,
      //   stepsBeforeSave: 1,
      // },
      plugins: ["grapesjs-indexeddb"],
      storageManager: {
        type: "indexeddb",
        autosave: true,
        stepsBeforeSave: 1,
        id: `gjs-${themeId}-${page}`,
      },
    };
    let editorInstance = grapesjs.init(grapesConfig);
    const bm = editorInstance.BlockManager;
    blockManager.blocks.map((item) => {
      bm.add(item.id, item);
    });
    editorInstance.Panels.addButton("editor-actions", [
      {
        id: "core:canvas-clear",
        className: "fa fa-trash",
        attributes: { title: "Clear canvas" },
        command: (e) => {
          let command = "core:canvas-clear";
          // enqueueSnackbar("Are you sure you want to clear the canvas ?", {
          //   variant: "error",
          //   action: clearCanvasSnackbarActions(e, command),
          //   autoHideDuration: 10000,
          // });
        },
      },
    ]);
    editorInstance.Commands.add("set-device-desktop", {
      run: (editorInstance) => editorInstance.setDevice("Desktop"),
    });
    editorInstance.Commands.add("set-device-mobile", {
      run: (editorInstance) => editorInstance.setDevice("Mobile"),
    });
    editorInstance.Commands.add("set-device-tablet", {
      run: (editorInstance) => editorInstance.setDevice("Tablet"),
    });
    editorInstance.on("run:preview", () => {
      editorInstance.stopCommand("sw-visibility");
      sidebar.addClass("d-none");
      topBar.addClass("d-none");
    });
    editorInstance.on("stop:preview", () => {
      editorInstance.runCommand("sw-visibility");
      topBar.removeClass("d-none");
      sidebar.removeClass("d-none");
    });
    // Initiate select product dialog if product card is dropped onto the canvas
    editorInstance.on("component:add", (item) => {
      if (item.attributes.attributes.id) {
        let blockId = item.attributes.attributes.id.split("-")[0];
        if (blockId == "product__card__block") {
          setSelectedProductBlock(item.getId());
          setDummyProductRadio(true);
          setOpenProductDialog(true);
          // getProducts();
        }
      }
    });
    editorInstance.on("storage:store", function (e) {
      // console.log("saving");
      // Storing to IndexedDb on changes to our template
      // addToLocalDb(`gjs-${themeId}-${page}html`, e.html);
      // addToLocalDb(`gjs-${themeId}-${page}css`, e.css);
    });
    setEditor(editorInstance);
  };

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleExitIntro = () => {
    setStepsEnabled(false);
  };

  const handleSelectDummyProduct = () => {
    // setDummyProductRadio(true);
    // setDbProductRadio(false);
    // setOpenRadio(false);
    // setOpenRadio(!openRadio);
    setOpenProductDialog(false);
  };

  const handleSelectDbProduct = () => {
    setOpenRadio(!openRadio);
    setDummyProductRadio(false);
    setDbProductRadio(true);
  };

  const handleCloseSelectProductDiaog = () => {
    setOpenProductDialog(false);
    setDummyProductRadio(false);
    setDbProductRadio(false);
    setOpenRadio(false);
    setSelectedProductBlock(null);
  };

  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      // bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      <div className="container" style={{ position: "relative" }}>
        <div id="top-bar">
          <div id="top-bar-actioins-left">
            <h2 style={{ color: "#fff" }}> Template Builder </h2>
            <div className="panel__devices"></div>
          </div>

          <div id="top-bar-actions-center">
            <Button
              variant="contained"
              size="small"
              endIcon={<SaveIcon style={{ fill: "#ffffff" }} />}
              className="savebutton"
              style={{
                color: "#ffffff",
                backgroundColor: "transparent",
                textTransform: "capitalize",
              }}
              // onClick={() =>
              //   enqueueSnackbar("Are you sure you want to save the page ?", {
              //     variant: "info",
              //     // action: savePageSnackbarActions,
              //     autoHideDuration: 10000,
              //   })
              // }
            >
              Save
            </Button>
            <Modal
              id="addPage-modal"
              keepMounted
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box id="add-page-box">
                  <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                    color="dark"
                    style={{ color: "#42424A" }}
                  >
                    Template Pages
                  </Typography>

                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignIems="center"
                    width="100%"
                    bgColor="white"
                    shadow="sm"
                    borderRadius="10px"
                    mt={2}
                  >
                    <List>
                      {!pagesList ? (
                        <ListItem disabled>
                          <ListItemIcon>
                            <CodeIcon />
                          </ListItemIcon>
                          <ListItemText primary={"No pages in template !"} />
                        </ListItem>
                      ) : (
                        pagesList.map((item, key) => (
                          <>
                            <ListItem
                              key={item}
                              onClick={() => {
                                setPage(item);
                                setOpen(false);
                              }}
                              sx={{ padding: "5px" }}
                            >
                              <ListItemIcon>
                                <CodeIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                style={{
                                  textTransform: "capitalize",
                                }}
                              />
                              {page && page === item && (
                                <ListItemSecondaryAction>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    {/* <BadgeDot
                                    color="success"
                                    size="sm"
                                    badgeContent="Active"
                                  /> */}
                                  </div>
                                </ListItemSecondaryAction>
                              )}
                            </ListItem>
                          </>
                        ))
                      )}
                    </List>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </div>

          <div id="top-bar-actions-right" className="rightactionbutton">
            <div className="panel__editor"> </div>
          </div>
        </div>
        <div className="flex">
          <aside id="sidebar">
            <Tabs
              className="tabicon"
              id="tabs-heading"
              variant="fullWidth"
              centered
              value={value}
              onChange={handleTabChange}
              color="dark"
              TabIndicatorProps={{ style: { background: "#61dafb" } }}
            >
              <Tab
                className="tabicon"
                id="tab-blocksab-blocks"
                style={{ minWidth: "25%" }}
                icon={<WidgetsIcon style={{ color: "#898989" }} />}
              />
              <Tab
                className="tabicon"
                id="tab-styles"
                style={{ minWidth: "25%" }}
                icon={<StyleIcon style={{ color: "#898989" }} />}
              />
              <Tab
                className="tabicon"
                id="tab-traits"
                style={{ minWidth: "25%" }}
                icon={<SettingsIcon style={{ color: "#898989" }} />}
              />
              <Tab
                className="tabicon"
                id="tab-layers"
                style={{ minWidth: "25%" }}
                icon={<LayersIcon style={{ color: "#898989" }} />}
              />
            </Tabs>

            <div id="tab-content">
              <TabPanel value={value} index={0}>
                <div id="blocks-container"></div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div id="styles-container"></div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div id="traits-container"></div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div id="layers-container"></div>
              </TabPanel>
            </div>
          </aside>
          <section className="main">
            <div id="editor"></div>
          </section>
        </div>
      </div>{" "}
    </Box>
  );
};

export default ThemeEditor;
