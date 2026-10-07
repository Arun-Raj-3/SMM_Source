# SMM Application - Monthly Profit Gain Overview

> **Status (v2.0, 2026-10-07):** OpEx below assumes a funded team (~10–15 people), which does not match the solo-founder plan in `Plan/02_Execution/SMM_Decisions_Log.md` (D1). Month 1 is not yet linked to the launch date (first paying customer ≈ Week 16). Rebuild as a spreadsheet with churn, CAC, LTV, cumulative burn (base case Year 1 ≈ −₹3.32 crore; optimistic ≈ −₹0.88 crore) and a bootstrapped scenario before external use.

## 12-Month Financial Projection (Base Scenario, INR)

---

## 1) Purpose
This document provides an estimated monthly profit-gain overview for the SMM application using a practical base-case model.

Currency is shown in Indian Rupees (INR).

FX reference used for conversion:
- `1 USD = 83 INR` (illustrative planning rate)

Profit is calculated as:

`Monthly Profit = Revenue - (COGS + Operating Expenses)`

Where:
- **COGS** includes cloud, AI/API usage, and support variable cost.
- **Operating Expenses** include salaries, tools, sales/marketing, and admin overhead.

---

## 2) Core Pricing Inputs (from current plan)
- Starter: `₹1,577/month` (USD 19)
- Growth: `₹4,897/month` (USD 59)
- Professional: `₹10,707/month` (USD 129)
- Agency: `₹20,667/month` (USD 249)
- Enterprise: custom (not included in base model below for conservatism)

---

## 3) Base Scenario Assumptions

### Customer Growth
- Month 1 starts at 60 paid customers.
- Net new paid customers increase month-over-month.
- Churn is already netted into active customer counts below.

### Plan Mix (average across first 12 months)
- Starter: 35%
- Growth: 40%
- Professional: 20%
- Agency: 5%

### Average Revenue Per Account (ARPA)
Weighted ARPA based on mix:

`(0.35 x 1,577) + (0.40 x 4,897) + (0.20 x 10,707) + (0.05 x 20,667) = ₹5,685.50`

ARPA used in model: **₹5,727/account/month** (⚠️ correction 2026-10-07: the inputs give ₹5,685.50; the model is ~0.7% high and COGS cells are slightly off. Fix in the spreadsheet rebuild.)

### Add-On Uptake
- 20% of customers purchase at least one paid add-on.
- Average add-on contribution: `₹1,494/account/month` for add-on buyers.
- Blended add-on uplift: `0.20 x 1,494 = ₹298.8/account/month`

### Effective ARPA (Base Model)
- Core ARPA: `₹5,727`
- Add-on uplift: `₹298.8`
- **Effective ARPA:** `₹6,025.8`

### Cost Structure
- **COGS:** 22% of revenue
- **Operating Expenses (fixed + semi-fixed)**
  - Month 1-3: `₹3,735,000/month`
  - Month 4-6: `₹4,316,000/month`
  - Month 7-9: `₹4,980,000/month`
  - Month 10-12: `₹5,644,000/month`

---

## 4) Monthly Profit Projection (Base Scenario)

| Month | Active Customers | Revenue (₹6,025.8 ARPA) | COGS (22%) | OpEx | Net Profit |
|---|---:|---:|---:|---:|---:|
| M1 | 60 | ₹361,548 | ₹79,514 | ₹3,735,000 | **-₹3,452,966** |
| M2 | 85 | ₹512,193 | ₹112,714 | ₹3,735,000 | **-₹3,335,521** |
| M3 | 115 | ₹692,967 | ₹152,471 | ₹3,735,000 | **-₹3,194,504** |
| M4 | 155 | ₹933,999 | ₹205,508 | ₹4,316,000 | **-₹3,587,509** |
| M5 | 205 | ₹1,235,289 | ₹271,742 | ₹4,316,000 | **-₹3,352,453** |
| M6 | 270 | ₹1,626,966 | ₹357,896 | ₹4,316,000 | **-₹3,046,930** |
| M7 | 350 | ₹2,109,030 | ₹463,970 | ₹4,980,000 | **-₹3,334,940** |
| M8 | 445 | ₹2,681,481 | ₹589,964 | ₹4,980,000 | **-₹2,888,483** |
| M9 | 560 | ₹3,374,448 | ₹742,352 | ₹4,980,000 | **-₹2,347,904** |
| M10 | 700 | ₹4,218,060 | ₹927,940 | ₹5,644,000 | **-₹2,353,880** |
| M11 | 865 | ₹5,212,317 | ₹1,146,728 | ₹5,644,000 | **-₹1,578,411** |
| M12 | 1,050 | ₹6,327,090 | ₹1,391,993 | ₹5,644,000 | **-₹708,903** |

---

## 5) What This Means
- In this conservative base scenario, the product is still in planned investment mode through Month 12.
- Loss narrows significantly by Month 12 as subscription volume compounds.
- Break-even is expected shortly after Month 12 if growth momentum and ARPA expansion continue.

---

## 6) Monthly Profit Gain Trend (Improvement vs Month 1)

This shows how much monthly profit has improved relative to Month 1.

`Profit Gain (Month N) = Net Profit(N) - Net Profit(M1)`

| Month | Net Profit | Profit Gain vs M1 |
|---|---:|---:|
| M1 | -₹3,452,966 | ₹0 |
| M3 | -₹3,194,504 | +₹258,462 |
| M6 | -₹3,046,930 | +₹406,036 |
| M9 | -₹2,347,904 | +₹1,105,062 |
| M12 | -₹708,903 | **+₹2,744,063** |

Interpretation:
- Even before full break-even, monthly profitability improves materially over time.
- By Month 12, monthly loss is reduced by about **79%** from Month 1.

---

## 7) Break-Even Sensitivity (Quick View)

Break-even month changes materially with ARPA and growth rate.

### Conservative Case
- Effective ARPA: `₹5,644`
- Slower customer growth trajectory
- Estimated break-even: **Month 16-18**

### Base Case (this model)
- Effective ARPA: `₹6,025.8`
- Current growth assumptions
- Estimated break-even: **Month 13-14**

### Upside Case
- Effective ARPA: `₹6,806+` (higher add-on and Pro/Agency mix)
- Stronger growth + better retention
- Estimated break-even: **Month 10-12**

---

## 8) How to Improve Monthly Profit Faster
1. Increase Growth and Professional plan mix (higher ARPA).
2. Push add-on attachment rate from 20% to 30%+.
3. Optimize AI and infrastructure unit costs to reduce COGS below 20%.
4. Keep OpEx scaling controlled until stable PMF and retention are validated.
5. Prioritize retention and expansion over pure top-funnel volume.

---

## 9) Recommended Next Step
Create a live financial model (spreadsheet) with editable assumptions for:
- customer growth and churn,
- plan mix shifts,
- add-on adoption,
- COGS per active user,
- hiring and OpEx ramps.

This document can then be used as the narrative summary for investor and leadership review.
