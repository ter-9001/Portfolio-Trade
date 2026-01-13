import React, { useState } from 'react';


export const Section1 = ({ totalValue, setTotalValue, investments, setInvestments, updateInvestment }) => {
  
  // Helper para converter valores (pode estar em um arquivo utils)
  const getAbsoluteValue = (amount, total) => {
    const strAmount = String(amount).replace(',', '.').trim();
    if (strAmount.endsWith('%')) return (parseFloat(strAmount) || 0) / 100 * total;
    return parseFloat(strAmount) || 0;
  };

  const totalAlocado = investments.reduce((acc, inv) => acc + getAbsoluteValue(inv.amount, totalValue), 0);
  const isOverLimit = totalAlocado > totalValue;

  const addInvestment = () => {
    setInvestments([...investments, { id: Date.now(), type: '', amount: '' }]);
  };

  return (
    <section>
      {/* INPUT DO VALOR TOTAL (ATUALIZA O APP.JSX) */}
      <div className="form__group">
        <input 
          type="number" 
          className={`form__field ${isOverLimit ? 'field-error' : ''}`} 
          placeholder="Total Investment Value" 
          // O segredo está aqui: onChange atualiza o estado no pai (App.jsx)
          onChange={(e) => setTotalValue(Number(e.target.value))}
          id="total-investment"
          required 
        />
        <label htmlFor="total-investment" className="form__label"> 
          Total Investment Value 
        </label>
      </div>

      {/* RENDERIZAÇÃO DOS INVESTIMENTOS ADICIONAIS */}

      {investments.map((inv) => (
        <React.Fragment key={inv.id}>
          <div className="inline">
            <div className="form__group tiny">
              <select className="form__field tiny" onChange={(e) => updateInvestment(inv.id, 'type', e.target.value)}>
                <option value="">--Type--</option>
                <option value="Stocks">Stocks</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>
            <div className="form__group tiny">
              <input 
                type="text" 
                className={`form__field ${isOverLimit ? 'field-error' : ''}`} 
                placeholder="Val or %"
                onChange={(e) => updateInvestment(inv.id, 'amount', e.target.value)}
              />
            </div>
          </div>

          {/* O ALERTA APARECE AQUI SE ESTIVER ACIMA DO LIMITE */}
          {isOverLimit && (
            <div className="alert-container animate-fade-in">
              <span className="alert-text" style={{ color: 'red', fontSize: '12px' }}>
                ⚠️ Warning: Total (R$ {totalAlocado.toFixed(2)}) exceeds limit of R$ {totalValue}!
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
      
      <button onClick={addInvestment}>Add Investment</button>
    </section>
  );
};