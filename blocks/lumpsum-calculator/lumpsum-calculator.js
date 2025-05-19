import { div, h3, form, label, input } from "../../scripts/dom-helper.js";

// Function form creating Input Fields and Range
function createField(id, labelText, min, max, value) {
  return div({ class: "each-field" },
    div({ class: "each-field-top" },
      label({ class: "field-title", for: id }, labelText),
      input({
        id: id,
        class: "default",
        value: value,
        type: "number",
        min: min,
        max: max,
        placeholder: "0",
      })
    ),
    div({ class: "each-field-bottom" },
      input({
        type: "range",
        id: id + "-range",
        min: min,
        max: max,
        value: value,
      })
    )
  );
};

// Function for right content
function createValueField(id, title, value) {
    return div({ class: "calculated-content" },
                span({ class: "calculate-title" }, title),
                span({class: "calculate-value", id: id}, value)
            );
};

const lumpsumCalc = document.querySelector(".lumpsum-calculator");
console.log(lumpsumCalc);

const lumpsumCalcContent = div({ class: "lumpsum-calc-content" },
// Left Content
    div({ class: "left-content" },
        h3({ class: "calc-head" }, "Lumpsum Calculator"),
        form({ class: "left-wrapper" },
            createField("investment-number", "Investment Amount (₹)", "500", "1000", "700"),
            createField("expected-rate", "Expected Rate of Return (% p.a.)", "1", "30", "12"),
            createField("invest-period", "Investment period (In years)", "1", "25", "12")
        )
    ),
// Right Content
    div({ class: "right-content" },
        div({id: "calculate-chart"}),
        div({class: "calculated-container"},
            createValueField("invest-amount", "Invested Amount", "2000"),
            createValueField("est-returns", "Estimated Returns", "2000"),
            createValueField("total-amount", "Total Amount", "2000"),
        )
    )
);

lumpsumCalc.appendChild(lumpsumCalcContent);
