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

  const elssSIPCalc = document.querySelector(".elss-sip-calculator");
  // Calculator Content
  const elssSIPCalcContent = div(
    { class: "elss-sip-calc-content" },
    // Left Content
    div(
      { class: "left-content" },
      h3({ class: "calc-head" }, "ELSS SIP Calculator"),
      form(
        { class: "left-wrapper" },
        createField(
          "elss-monthly-amnt",
          "Monthly SIP Amount (₹)",
          "500",
          "10000",
          "5000"
        ),
        createField(
          "elss-expected-rate",
          "Rate of Interest (% p.a.)",
          "1",
          "30",
          "7"
        ),
        createField("elss-tim-period", "Time period (In years)", "1", "25", "5")
      )
    ),
    // Right Content
    div(
      { class: "right-content" },
      div({ id: "elss-calculate-chart" }),
      div(
        { class: "calculated-container" },
        createValueField("elss-invest-amount", "Invested Amount", "2000"),
        createValueField("elss-est-returns", "Estimated Returns", "2000"),
        createValueField("elss-total-amount", "Total Amount", "2000")
      )
    )
  );
  elssSIPCalc.appendChild(elssSIPCalcContent);

  // Calc Functionality
  const elssNumberInp = document.querySelectorAll(
    ".elss-sip-calc-content .each-field-top input"
  );
  const elssRangeInp = document.querySelectorAll(
    ".elss-sip-calc-content .each-field-bottom input"
  );
  const elssInvstAmnt = document.getElementById("elss-invest-amount");
  const elssEstmRetrn = document.getElementById("elss-est-returns");
  const elssTotalAmnt = document.getElementById("elss-total-amount");

  function updateFill(range) {
    const min = range.min;
    const max = range.max;
    const val = range.value;
    const getPercentage = ((val - min) / (max - min)) * 100;
    range.style.setProperty("--progress", `${getPercentage}%`);
  };

  function inpRangeSync(e) {
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const val = Number(e.target.value);
    const target = e.target;
    const closest = target.closest(".elss-sip-calc-content .each-field");
    const targetNumberInp = closest.querySelector('input[type="number"]');
    const targetRangeInp = closest.querySelector('input[type="range"]');
    if (target.type == "number") {
      if (val < min || isNaN(val)) {
        targetRangeInp.value = min;
        targetNumberInp.classList.remove("default");
        targetNumberInp.classList.add("error");
      } else if (val > max) {
        targetRangeInp.value = max;
        targetNumberInp.classList.remove("default");
        targetNumberInp.classList.add("error");
      } else {
        targetRangeInp.value = val;
        targetNumberInp.classList.remove("error");
        targetNumberInp.classList.add("default");
      }
    } else {
      targetNumberInp.value = val;
      targetNumberInp.classList.remove("error");
      targetNumberInp.classList.add("default");
    }
  }

  function handleInput(e) {
    inpRangeSync(e);
    elssRangeInp.forEach((rng) => {
      updateFill(rng);
    });
  }

  function calculateELSSsip(P, R, N) {
    const r = R / (12 * 100);
    const n = N * 12;
    const calculatedValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return {
      totalAmount: calculatedValue,
      investedAmount: P * n,
      estimatedReturns: calculatedValue - P * n,
    };
  }

  function renderCalculatedValue() {
    const monthlyAmount = Number(
      document.getElementById("elss-monthly-amnt").value
    );
    const rateInterest = Number(
      document.getElementById("elss-expected-rate").value
    );
    const timePeriod = Number(document.getElementById("elss-tim-period").value);
    const result = calculateELSSsip(monthlyAmount, rateInterest, timePeriod);
    elssInvstAmnt.textContent = result.investedAmount.toLocaleString("en-IN", {
      currency: "INR",
      maximumFractionDigits: 0,
    });
    elssEstmRetrn.textContent = result.estimatedReturns.toLocaleString(
      "en-IN",
      { currency: "INR", maximumFractionDigits: 0 }
    );
    elssTotalAmnt.textContent = result.totalAmount.toLocaleString("en-IN", {
      currency: "INR",
      maximumFractionDigits: 0,
    });
  }

  // On load Logic
  elssRangeInp.forEach((rng) => {
    updateFill(rng);
  });
  renderCalculatedValue();
  piechart(
    Number(elssInvstAmnt.textContent.replace(/,/g, "")),
    Number(elssEstmRetrn.textContent.replace(/,/g, ""))
  );

  // Input logic
  elssNumberInp.forEach((numInp) => {
    numInp.addEventListener("input", function (e) {
      handleInput(e);
      const numMin = Number(e.target.min);
      const numMax = Number(e.target.max);
      const numval = Number(e.target.value);
      if (numval > numMax || numval < numMin) {
        const monthlyAmountMin = Number(
          document.getElementById("elss-monthly-amnt").min
        );
        const rateInterestMin = Number(
          document.getElementById("elss-expected-rate").min
        );
        const timePeriodMin = Number(
          document.getElementById("elss-tim-period").min
        );
        const result = calculateELSSsip(
          monthlyAmountMin,
          rateInterestMin,
          timePeriodMin
        );
        elssInvstAmnt.textContent = result.investedAmount.toLocaleString(
          "en-IN",
          { currency: "INR", maximumFractionDigits: 0 }
        );
        elssEstmRetrn.textContent = result.estimatedReturns.toLocaleString(
          "en-IN",
          { currency: "INR", maximumFractionDigits: 0 }
        );
        elssTotalAmnt.textContent = result.totalAmount.toLocaleString("en-IN", {
          currency: "INR",
          maximumFractionDigits: 0,
        });
        piechart(
          Number(elssInvstAmnt.textContent.replace(/,/g, "")),
          Number(elssEstmRetrn.textContent.replace(/,/g, ""))
        );
      } else {
        renderCalculatedValue();
        piechart(
          Number(elssInvstAmnt.textContent.replace(/,/g, "")),
          Number(elssEstmRetrn.textContent.replace(/,/g, ""))
        );
      }
    });
  });

  //   Range LOgic
  elssRangeInp.forEach((rngInp) => {
    rngInp.addEventListener("input", function (e) {
      handleInput(e);
      renderCalculatedValue();
      piechart(
        Number(elssInvstAmnt.textContent.replace(/,/g, "")),
        Number(elssEstmRetrn.textContent.replace(/,/g, ""))
      );
    });
  });

  // Chart Configuration
  function piechart(invest, estimated) {
    Highcharts.chart("elss-calculate-chart", {
      chart: {
        type: "pie",
        backgroundColor: "transparent",
      },
      title: {
        text: "ELSS SIP Calculator Chart",
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
            { name: "Invested Amount", y: Number(invest) },
            { name: "Estimated Returns", y: Number(estimated) },
          ],
        },
      ],
    });
  }
}
