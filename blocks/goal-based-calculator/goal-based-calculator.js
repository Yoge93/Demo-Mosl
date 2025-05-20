import { div, h3, form, label, input, span } from "../../scripts/dom-helper.js";

// Function form creating left content (Input Fields and Range)
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

const goalBasedCalc = document.querySelector(".goal-based-calculator");
// Calculator Content
const goalBasedContent = div(
  { class: "goal-based-calc-content" },
  // Left Content
  div(
    { class: "left-content" },
    h3({ class: "calc-head" }, "Goal Based SIP Calculator"),
    form(
      { class: "left-wrapper" },
      createField("goal-number", "Goal Amount (₹)", "500", "100000", "700"),
      createField(
        "goal-expected-rate",
        "Expected Rate of Return (% p.a.)",
        "1",
        "30",
        "12"
      ),
      createField(
        "goal-invest-period",
        "Investment period (In years)",
        "1",
        "25",
        "12"
      )
    )
  ),
  // Right Content
  div(
    { class: "right-content" },
    div({ id: "calculate-chart" }),
    div(
      { class: "calculated-container" },
      createValueField("total-investment", "Your Total Investment", "2000"),
      createValueField("monthly-sip-amnt", "Monthly SIP Amount", "2000")
    )
  )
);
goalBasedCalc.appendChild(goalBasedContent);