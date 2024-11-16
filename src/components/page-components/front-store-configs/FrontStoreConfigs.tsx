"use client";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
// import plugin from "grapesjs-tailwind";
import "grapesjs/dist/css/grapes.min.css";
import "./custom-grapesjs.css";

export default function FrontStoreConfiguration() {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize GrapesJS editor
    // if (!editorRef.current) {
    //   const editorInstance = grapesjs.init({
    //     container: "#gjs",
    //     plugins: [plugin],
    //     pluginsOpts: {
    //       [plugin]: {
    //         /* options */
    //       },
    //     },
    //   });
    //   editorRef.current = editorInstance;
    //   // Apply styles after initialization
    //   editorInstance.on("load", () => {
    //     applyCustomStyles();
    //   });
    // Cleanup editor instance on component unmount
    //   return () => {
    //     if (editorRef.current) {
    //       editorRef.current.destroy();
    //       editorRef.current = null;
    //     }
    //   };
    // }
  }, []);

  // Function to apply custom styles
  const applyCustomStyles = () => {
    // Apply styles to input fields and dropdowns
    document
      .querySelectorAll(".gjs-sm-property input, .gjs-sm-property select")
      .forEach((el) => {
        el.classList.add(
          "bg-gray-800",
          "text-white",
          "border",
          "border-gray-600",
          "rounded-md"
        );
        el.classList.add("focus:ring-2", "focus:ring-indigo-500");
      });

    // Style the right sidebar container
    const rightSidebarContainer = document.querySelector(".gjs-pn-container");
    if (rightSidebarContainer) {
      rightSidebarContainer.classList.add(
        "bg-gray-900",
        "border-r",
        "border-gray-700"
      );
    }

    // Style specific panels
    const panels = document.querySelectorAll(
      ".gjs-pn-options, .gjs-pn-panels, .gjs-pn"
    );
    panels.forEach((panel) => {
      panel.classList.add(
        "bg-gray-900",
        "text-white",
        "border-r",
        "border-gray-700"
      );
    });

    // Style the sidebar toggle button
    const toggleButtons = document.querySelectorAll(".gjs-pn-btn");
    toggleButtons.forEach((btn) => {
      btn.classList.add("bg-gray-800", "text-white");
    });
  };

  return (
    <div className="GrapeJsEditor">
      <div id="gjs" className="gjs-canvas"></div>
    </div>
  );
}
