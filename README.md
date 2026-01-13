# 📈 Portfolio Trade: Predictive Wealth Management Dashboard (Still under development)

**Portfolio Trade** is a high-performance financial simulation platform built with **React.js**. It enables investors to move beyond simple tracking by providing a robust environment for projecting wealth growth across multiple market scenarios (**Optimistic**, **Median**, and **Pessimistic**).

The application features a sophisticated three-panel interface designed for maximum data density and user focus, allowing for real-time asset allocation adjustments and instant feedback on portfolio risk and performance.

---

## 🚀 Key Features

### 1. Dynamic Asset Configuration (Panel 1)

* **Smart Allocation:** Support for both absolute currency values ($) and percentage-based (%) allocations.
* **Validation Logic:** Real-time state synchronization ensuring portfolio allocations are normalized and validated.
* **Asset Scalability:** Modular architecture allowing for seamless integration of Stocks, ETFs, Cryptocurrencies, and Fixed Income.

### 2. Multi-Scenario Projection Engine (Panel 2)

* **Predictive Analysis:** Visualizes capital growth over time using custom compounding algorithms.
* **Risk Visualization:** Simultaneously renders three distinct market outcomes (Bear, Base, and Bull cases) using **Chart.js**.
* **Temporal Intelligence:** Integrated custom calendar component for selecting investment horizons and calculating delta-days.

### 3. Deep-Dive Analytics (Panel 3)

* **Granular Metrics:** Detailed breakdown of each asset's contribution to the total portfolio yield.
* **Asset Intelligence:** Highlighting asset characteristics and performance ratios (ROI vs. Invested Capital vs. Portfolio Total).

---

## 🛠️ Technical Stack

* **Core:** [React.js](https://reactjs.org/) (Functional Components, Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/) (Optimized HMR and build performance)
* **Data Visualization:** [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
* **State Management:** Context API & Custom Hooks (Encapsulating financial logic)
* **Styling:** Modern CSS3 with Dynamic Variables (Theming Engine)
* **Type Safety:** TypeScript (Optional, but recommended for production)

---

## 🏗️ Architecture & Engineering Decisions

### The Three-Panel Design Pattern

To ensure a high-quality UX, the application follows a **Unidirectional Data Flow** between three specialized modules:

1. **Input Module:** Handles user parameters and sanitizes financial strings.
2. **Visualization Module:** Consumes state to render complex SVG/Canvas graphics.
3. **Detail Module:** Provides context-aware metadata based on user selection.

### State Normalization

A significant challenge was managing the relationship between "Total Investment" and "Individual Asset Values". I implemented a **normalization layer** within a custom hook to ensure that changing the total value updates all relative asset values without causing re-render loops.

---

## 🧠 Technical Challenges & Solutions

> **Challenge:** Implementing a real-time "Percentage vs Value" toggle while maintaining 100% allocation integrity.
> **Solution:** Built a custom state reducer that calculates the "residual value" of the portfolio. If a user inputs a percentage, the system automatically derives the value; if they input a value, it calculates the impact on the total weight, providing immediate UI feedback if the 100% threshold is exceeded.

> **Challenge:** Efficiently rendering multiple high-frequency charts.
> **Solution:** Utilized `React.memo` and optimized Chart.js instances to prevent unnecessary canvas re-draws, ensuring a smooth 60fps experience even during rapid slider adjustments.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/portfolio-trade.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run in development mode:**
```bash
npm run dev

```


4. **Build for production:**
```bash
npm run build

```




**Developed by Gabriel Martins**
*Senior Frontend Engineer focused on Financial Systems.*

