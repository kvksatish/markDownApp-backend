"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const markdown_it_1 = __importDefault(require("markdown-it"));
const router = (0, express_1.Router)();
const md = new markdown_it_1.default();
router.post("/text_converter", (req, res) => {
    // console.log("req.body-->", req.body);
    const markdown = decodeURIComponent(req.body.text);
    if (!markdown) {
        const response = {
            code: 400,
            status: "BAD_REQUEST",
            data: "",
            message: "text for Markdown is required",
        };
        res.send(response);
    }
    else {
        try {
            const html = md.render(markdown).replace(/\n/g, "<br>");
            //console.log("html--->: ", html);
            const response = {
                code: 200,
                status: "success",
                data: html,
                message: "Markdown converted to HTML successfully",
            };
            res.send(response);
        }
        catch (error) {
            console.error("Error occurred:", error);
            /**
             * Response object for the text conversion API.
             */
            const response = {
                code: 500,
                status: "INTERNAL_SERVER_ERROR",
                data: "",
                message: "Error occurred while converting Markdown to HTML",
            };
            res.send(response);
        }
    }
});
exports.default = router;
