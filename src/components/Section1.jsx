import React from "react";

export const Section1 = ({ 
  totalValue, setTotalValue, investments, setInvestments, 
  updateInvestment, availableStocks, totalAllocated, isOverLimit 
}) => {

  const addInvestment = () => {
    setInvestments([...investments, { id: Date.now(), type: "", amount: "" }]);
  };

  return (
    <section className="section-input">
      {/* Campo de Valor Total */}
      <div className="form__group">
        <input
          type="number"
          className={`form__field ${isOverLimit ? "field-error" : ""}`}
          placeholder="Total Investment Value"
          value={totalValue || ""}
          onChange={(e) => setTotalValue(Number(e.target.value))}
          id="total-inv"
        />
        <label htmlFor="total-inv" className="form__label">Total Investment Value</label>
      </div>

      {/* Lista Dinâmica de Investimentos */}
      {investments.map((inv) => (
        <React.Fragment key={inv.id}>
          <div className="inline">
            <div className="form__group tiny">
              <select
                className="form__field tiny"
                value={inv.type}
                onChange={(e) => updateInvestment(inv.id, "type", e.target.value)}
              >
                <option value="">-- Asset --</option>
                {availableStocks.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
              <label className="form__label">Investment type</label>
            </div>

            <div className="form__group tiny">
              <input
                type="text"
                className={`form__field ${isOverLimit ? "field-error" : ""}`}
                placeholder="Val or %"
                value={inv.amount}
                onChange={(e) => updateInvestment(inv.id, "amount", e.target.value)}
              />
              <label className="form__label">Value or %</label>
            </div>
          </div>

          {/* Alerta de Erro Dinâmico */}
          {isOverLimit && (
            <div className="alert-container animate-fade-in">
              <span className="alert-text">
                ⚠️ Total R$ {totalAllocated.toFixed(2)} exceeds R$ {totalValue}!
              </span>
            </div>
          )}
        </React.Fragment>
      ))}

      <div className="inline last">
        <button type="button" onClick={addInvestment}>
          + Add Investment
        </button>
      </div>
    </section>
  );
};