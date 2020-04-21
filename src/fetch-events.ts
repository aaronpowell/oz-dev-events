import devEvents from "./dev-events.go";
import moment from "moment";
import { Moment } from "moment";

export interface Event {
  name: string;
  state: string;
  fromDate: Moment;
  toDate: Moment;
  tags: string[];
  link: string;
}

export interface Year {
  year: string;
  events?: Event[][];
}

interface GoEvent {
  name: string;
  state: string;
  fromDate: string;
  toDate: string;
  tags: string[];
  link: string;
}

interface WasmResponse {
  events: GoEvent[][];
}

async function downloadYear(year: string, url: string): Promise<Year> {
  let response = await fetch(url);
  let content = await response.text();

  let goResponse = await devEvents.parseMarkdown<string, string>(content);

  let wasmResponse: WasmResponse = JSON.parse(goResponse);

  let events = wasmResponse.events.map((group) => {
    return group.map((e) => {
      return {
        name: e.name,
        link: e.link,
        state: e.state,
        tags: e.tags,
        fromDate: moment(e.fromDate, "DD-MMM-YYYY"),
        toDate: moment(e.toDate, "DD-MMM-YYYY"),
      };
    });
  });

  return {
    year,
    events,
  };
}

export default downloadYear;
