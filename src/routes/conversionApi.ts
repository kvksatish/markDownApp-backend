// src/routes/index.ts
import { Router } from "express";
import MarkdownIt from "markdown-it";
import { Request, Response } from "express";

const router = Router();     
const md = new MarkdownIt();

interface textConversionApiResponse {
  code: number;
  status: string;
  data: string;
  message: string;
}

router.post("/text_converter", (req: Request, res: Response) => {
  // console.log("req.body-->", req.body);
  const markdown = decodeURIComponent(req.body.text) as string;

  if (!markdown) {
    const response: textConversionApiResponse = {
      code: 400,
      status: "BAD_REQUEST",
      data: "",
      message: "text for Markdown is required",
    };
    res.send(response);
  } else {
    try {
      const html = md.render(markdown).replace(/\n/g, "<br>");
      //console.log("html--->: ", html);
      const response: textConversionApiResponse = {
        code: 200,
        status: "success",
        data: html,
        message: "Markdown converted to HTML successfully",
      };
      res.send(response);
    } catch (error) {
      console.error("Error occurred:", error);
      /**
       * Response object for the text conversion API.
       */
      const response: textConversionApiResponse = {
        code: 500,
        status: "INTERNAL_SERVER_ERROR",
        data: "",
        message: "Error occurred while converting Markdown to HTML",
      };
      res.send(response);
    }
  }
});
export default router;
