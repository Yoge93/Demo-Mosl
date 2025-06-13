import {
  div,
  span,
  h3,
  table,
  tbody,
  thead,
  tr,
  th,
  td,
} from "../../scripts/dom-helper.js";

// Market And EOD update

const marketUpdate = {
  success: true,
  data: {
    marketUpdatedata: [
      {
        currDate: "06-06-2025 15:19:59",
        indexName: "Nifty 50",
        currValue: "25000.45",
        prevValue: "24750.9",
        chg: "249.54999999999927",
        perChange: "1.00824616478592",
        ord: "1",
      },
      {
        currDate: "06-06-2025 15:19:59",
        indexName: "Nifty Midcap 100",
        currValue: "59010.55",
        prevValue: "58303",
        chg: "707.5500000000029",
        perChange: "1.21357391557896",
        ord: "2",
      },
      {
        currDate: "06-06-2025 15:26:00",
        indexName: "BSE Sensex",
        currValue: "82191.28",
        prevValue: "81442.04",
        chg: "749.2400000000052",
        perChange: "0.919967132453958",
        ord: "3",
      },
      {
        currDate: "08-03-2025 04:30:00",
        indexName: "Nasdaq 100",
        currValue: "18130",
        prevValue: "18014.25",
        chg: "115.75",
        perChange: "0.64",
        ord: "4",
      },
    ],
  },
  message: "Successful",
};

const eodUpdate = {
  success: true,
  data: {
    eodUpdatedata: [
      {
        currDate: "05-06-2025 00:00:00",
        indexName: "Nifty 50",
        currValue: "24750.9000",
        prevValue: "24620.2000",
        chg: "130.7000",
        perChange: "0.5300",
        ord: "2",
      },
      {
        currDate: "05-06-2025 00:00:00",
        indexName: "Nifty Midcap 100",
        currValue: "58303.0000",
        prevValue: "57924.6500",
        chg: "378.3500",
        perChange: "0.6500",
        ord: "3",
      },
      {
        currDate: "05-06-2025 00:00:00",
        indexName: "BSE Sensex",
        currValue: "81442.0400",
        prevValue: "80998.2500",
        chg: "443.7900",
        perChange: "0.5400",
        ord: "4",
      },
      {
        currDate: "08-03-2025 04:30:00",
        indexName: "Nasdaq 100",
        currValue: "18130.0000",
        prevValue: "18014.2500",
        chg: "115.7500",
        perChange: "0.6400",
        ord: "5",
      },
    ],
  },
  message: "Successful",
};

const updateEodMarket = document.querySelector(".update-eod-market");
updateEodMarket.innerHTML = "";

// EOD Table create structure
function eodTable(data) {
  return div(
    { class: "update-table eod-update" },
    h3("EOD Update"),
    div(
      { class: "table-wrapper" },
      table(
        { class: "table-content" },
        thead(tr(th("Indices"), th("Closing"), th("Change"), th("% Change"))),
        tbody(
          ...data.map((eod) => {
            return tr(
              td(eod.indexName),
              td(Number(eod.currValue).toFixed(2)),
              td(Number(eod.chg).toFixed(2)),
              td(Number(eod.perChange).toFixed(2))
            );
          })
        )
      )
    ),
    div({ class: "etf-navTime" }, `As on ${data[0].currDate} undefined`)
  );
}

// Market Table create structure
function marketTable(data) {
  return div(
    { class: "update-table market-update" },
    h3("Market Update"),
    div(
      { class: "table-wrapper" },
      table(
        { class: "table-content" },
        thead(tr(th("Indices"), th("Closing"), th("Change"), th("% Change"))),
        tbody(
          ...data.map((market) => {
            return tr(
              td(market.indexName),
              td(Number(market.currValue).toFixed(2)),
              td(Number(market.chg).toFixed(2)),
              td(Number(market.perChange).toFixed(2))
            );
          })
        )
      )
    ),
    div({ class: "etf-navTime" }, `As on ${data[0].currDate} undefined`)
  );
}

// Card Structure Create
const updateNav = function (eodData, marketdata) {
  return div(
    { class: "update-container" },
    eodTable(eodData),
    marketTable(marketdata),
    div(
      { class: "update-desc" },
      "indicative Net Asset Value (iNAV) is computed based on snapshot prices of the underlying securities traded and available on the exchange. In case investors want to do a transaction with the Fund, there would be additional transaction costs such as brokerage, STT, depository costs and market impact cost."
    )
  );
};
const eodObjData = eodUpdate.data.eodUpdatedata;
const marketObjData = marketUpdate.data.marketUpdatedata;
updateEodMarket.appendChild(updateNav(eodObjData, marketObjData));
