import {
  div,
  h3,
  table,
  tbody,
  thead,
  tr,
  th,
  td,
} from "../../scripts/dom-helper.js";

import { filteredNavDetail } from "../etf-fund/etf-fund.js";

const navIndicator = document.querySelector(".nav-indicator");
navIndicator.innerHTML = "";

// Nav Indicator table create

const navIndicatorTable = function (data) {
  return div(
    { class: "update-container" },
    div(
      { class: "update-table nav-indicator-table" },
      h3("Indicative Nav"),
      div(
        { class: "table-wrapper" },
        table(
          { class: "table-content" },
          thead(
            tr(
              th("Scheme Name"),
              th("Current iNAV"),
              th("Previous Day NAV"),
              th("% Change")
            )
          ),
          tbody(            
            ...data.map((indicator) => {
              return tr(
                td(indicator?.schemeNameFull),
                td(indicator?.currNav),
                td(indicator?.prevNAV),
                td(`${indicator?.navPerChange}%`)
              );
            })
          )
        )
      )
    )
  );
};

navIndicator.appendChild(navIndicatorTable(filteredNavDetail));
