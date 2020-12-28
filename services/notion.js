import { Notion } from "@neurosity/notion";
import { createContext } from "react";

export const notion = new Notion({
  autoSelectDevice: false
});

export const NotionContext = createContext();
