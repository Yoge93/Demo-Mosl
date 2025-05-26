import { div, h3, form, label, input, span } from "../../scripts/dom-helper.js";

export default function (block) {
  // Function form creating left content (Input Fields and Range)
  function createField(id, labelText, min, max, value) {
    return div(
      { class: "each-field" },
      div(
        { class: "each-field-top" },
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
      div(
        { class: "each-field-bottom" },
        input({
          type: "range",
          id: id + "-range",
          min: min,
          max: max,
          value: value,
        })
      )
    );
  }

  // Function for right content
  function createValueField(id, title, value) {
    return div(
      { class: "calculated-content" },
      span({ class: "calculate-title" }, title),
      span({ class: "calculate-value", id: id }, value)
    );
  }

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
      div({ id: "goal-calculate-chart" }),
      div(
        { class: "calculated-container" },
        createValueField("total-investment", "Your Total Investment", "2000"),
        createValueField("monthly-sip-amnt", "Monthly SIP Amount", "2000")
      )
    )
  );
  goalBasedCalc.appendChild(goalBasedContent);

  // Calc Functionality
  const goalNumberInp = document.querySelectorAll(
    ".goal-based-calc-content .each-field-top input"
  );
  const goalRangeInp = document.querySelectorAll(
    ".goal-based-calc-content .each-field-bottom input"
  );
  const totalInvest = document.getElementById("total-investment");
  const monthlySIPamnt = document.getElementById("monthly-sip-amnt");

  function updateFill(range) {
    const min = range.min;
    const max = range.max;
    const val = range.value;
    const getPercentage = ((val - min) / (max - min)) * 100;
    range.style.setProperty("--progress", `${getPercentage}%`);
  }

  function inpRangeSync(e) {
    const wrapper = e.target.closest(".goal-based-calc-content .each-field");
    const numberInput = wrapper.querySelector('input[type="number"]');
    const rangeInput = wrapper.querySelector('input[type="range"]');
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const val = Number(e.target.value);
    const target = e.target;
    const type = e.target.type;
    if (type == "number") {
      if (val < min || isNaN(val)) {
        rangeInput.value = min;
        target.classList.add("error");
        target.classList.remove("default");
      } else if (val > max) {
        rangeInput.value = max;
        target.classList.add("error");
        target.classList.remove("default");
      } else {
        rangeInput.value = val;
        target.classList.remove("error");
        target.classList.add("default");
      }
    } else {
      numberInput.value = rangeInput.value;
      target.classList.remove("error");
      target.classList.add("default");
    }
  }

  function handleInput(e) {
    inpRangeSync(e);
    goalRangeInp.forEach((handleRange) => {
      updateFill(handleRange);
    });
  }

  function calculateGoalBased(fv, R, N) {
    const r = R / 12 / 100;
    const n = N * 12;
    const calculatedValue = fv / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    return {
      totalInvestment: calculatedValue * n,
      monthlySIP: calculatedValue,
    };
  }

  function renderCalculatedValue() {
    const goalAmnt = Number(document.getElementById("goal-number").value);
    const rateIntrst = Number(
      document.getElementById("goal-expected-rate").value
    );
    const invstYrs = Number(
      document.getElementById("goal-invest-period").value
    );
    const result = calculateGoalBased(goalAmnt, rateIntrst, invstYrs);
    monthlySIPamnt.textContent = result.monthlySIP.toLocaleString("en-IN", {
      currency: "INR",
      maximumFractionDigits: 0,
    });
    totalInvest.textContent = result.totalInvestment.toLocaleString("en-IN", {
      currency: "INR",
      maximumFractionDigits: 0,
    });
  }

  // Input Logic
  goalNumberInp.forEach((number) => {
    number.addEventListener("input", function (e) {
      handleInput(e);
      // rendering logic for number input
      const min = Number(e.target.min);
      const max = Number(e.target.max);
      const val = Number(e.target.value);
      if (val < min || val > max) {
        const goalAmnt = Number(document.getElementById("goal-number").min);
        const rateIntrst = Number(
          document.getElementById("goal-expected-rate").min
        );
        const monthRateIntrst = rateIntrst / 12 / 100;
        const invstYrs = Number(
          document.getElementById("goal-invest-period").min
        );
        const monthInvstYrs = invstYrs * 12;
        const monthlySIP = calculateGoalBased(
          goalAmnt,
          monthRateIntrst,
          monthInvstYrs
        );
        monthlySIPamnt.textContent = monthlySIP;
        totalInvest.textContent = monthlySIP * monthInvstYrs;
        piechart(
          Number(totalInvest.textContent.replace(/,/g, "")),
          Number(monthlySIPamnt.textContent.replace(/,/g, ""))
        );
      } else {
        renderCalculatedValue();
        piechart(
          Number(totalInvest.textContent.replace(/,/g, "")),
          Number(monthlySIPamnt.textContent.replace(/,/g, ""))
        );
      }
    });
  });

  // Range Logic
  goalRangeInp.forEach((range) => {
    range.addEventListener("input", function (e) {
      handleInput(e);
      renderCalculatedValue();
      piechart(
        Number(totalInvest.textContent.replace(/,/g, "")),
        Number(monthlySIPamnt.textContent.replace(/,/g, ""))
      );
    });
  });

  // On Load Logic
  goalRangeInp.forEach((range, i) => {
    range.value = goalNumberInp[i].value;
    updateFill(range);
  });
  renderCalculatedValue();
  piechart(
    Number(totalInvest.textContent.replace(/,/g, "")),
    Number(monthlySIPamnt.textContent.replace(/,/g, ""))
  );

  // Chart Configuration

  function piechart(invest, monthlySIP) {
    Highcharts.chart("goal-calculate-chart", {
      chart: {
        width: 450,
        type: "pie",
        backgroundColor: "transparent",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Goal Based SIP Calculator Chart",
        style: {
          color: "#2e2a94",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        borderRadius: 3,
        borderWidth: 1,
        style: {
          color: "#2b238c",
          fontSize: "13px",
          fontWeight: "700",
          fontFamily: "Verdana, sans-serif",
        },
        shadow: true,
        padding: 8,
        formatter: function () {
          return `<b>${this.point.name}: ₹${this.y.toLocaleString(
            "en-IN"
          )}</b>`;
        },
      },
      legend: {
        enabled: true,
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        itemStyle: {
          fontSize: "14px",
          color: "#333",
        },
      },
      plotOptions: {
        pie: {
          innerSize: "70%",
          size: "100%",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: ₹{point.y}",
            connectorWidth: 0,
            distance: -30,
            dataLabels: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            style: {
              color: "#000",
              fontSize: "13px",
              fontWeight: "normal",
              display: "none",
            },
          },
          borderWidth: 1,
          borderColor: "#fff",
        },
      },
      colors: ["#2b2e8c", "#1f88ce"],
      series: [
        {
          name: "Amount",
          colorByPoint: true,
          data: [
            { name: "Total Investment", y: Number(invest) },
            { name: "Monthly SIP", y: Number(monthlySIP) },
          ],
        },
      ],
    });
  }
};
