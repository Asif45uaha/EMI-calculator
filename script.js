
let loanAmt = 0
let interestRate = 0;
let duration = 0;
let emi = 0

const loanAmtInput = document.getElementById("loan-amount");
const interestRateInput = document.getElementById("interest-percent");
const durationInput = document.getElementById("tenure");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const outputBox = document.querySelector(".output-wrapper");

loanAmtInput.addEventListener("change", (ev) => {
    document.getElementById("loan-amount-value").textContent = `$ ${ev.target.value}`;
    loanAmt = Number(ev.target.value)
})
interestRateInput.addEventListener("change", (ev) => {
    document.getElementById("interest-rate-value").textContent = `${ev.target.value} %`;
    interestRate = Number(ev.target.value)
})
durationInput.addEventListener("change", (ev) => {
    document.getElementById("tenure-value").textContent = `${ev.target.value} yr`;
    duration = Number(ev.target.value)
})

function updateOutputDom() {
    outputBox.style.display = "flex"
    outputBox.style.flexDirection = "column"
    outputBox.style.gap = "5px"
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log({ loanAmt, interestRate, duration });

    if (!loanAmt || !interestRate || !duration) {
        alert("Please fill all the fields")
        return

    }
    updateOutputDom()

    let monthlyInterestRate = (interestRate / 12) / 100
    let tenure = duration * 12

    emi = loanAmt * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenure) /
        (Math.pow((1 + monthlyInterestRate), tenure) - 1)
    let totalAmtToBePaid = Math.round(emi * tenure)
    let InterestAmt = Math.round(totalAmtToBePaid - loanAmt)
    document.getElementById("totalAmt-value").textContent = `$ ${totalAmtToBePaid}`
    document.getElementById("interest-value").textContent = `$ ${InterestAmt}`
    document.getElementById("principal-value").textContent = `$ ${loanAmt}`
    document.getElementById("emi-value").textContent = `$ ${Math.round(emi)}`

    let xValues = ["Principle", "Interest(Amount)"]
    let yValues = [loanAmt, InterestAmt];
    let barColors = ["green", "#fff"];

    new Chart("loan-chart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: false,
            }
        }
    });
})



function updateCancelDom() {

    document.getElementById("loan-amount-value").textContent = `$ 100000`;
    document.getElementById("interest-rate-value").textContent = `1 %`;
    document.getElementById("tenure-value").textContent = `3 yr`;
    outputBox.style.display = "none"
}

resetBtn.addEventListener("click", (event) => {
    loanAmtInput.value = 0;
    interestRateInput.value = 0;
    durationInput.value = 0;
    loanAmt = 0;
    interestRate = 0;
    duration = 0;
    updateCancelDom()

})