import React, { useState } from 'react';
import { Section1 } from './components/Section1';
import { Section2 } from './components/Section2';
import { Section3 } from './components/Section3';

export default function App() {
  const [totalValue, setTotalValue] = useState(0);
  const [investments, setInvestments] = useState([]);

  // Função para atualizar um investimento específico
// Função auxiliar para transformar string/número em valor absoluto
  const getAbsoluteValue = (amount, total) => {
  const strAmount = String(amount).replace(',', '.').trim();
    
    if (strAmount.endsWith('%')) {
      const percent = parseFloat(strAmount) || 0;
      return (percent / 100) * total;
    }
    
    return parseFloat(strAmount) || 0;
  };

const updateInvestment = (id, field, value) => {
  const updated = investments.map(inv => 
    inv.id === id ? { ...inv, [field]: value } : inv
  );
  
  // Atualizamos o estado SEMPRE para o input não travar
  setInvestments(updated);
};

// Calcule o erro no App.jsx para distribuir para todos
const totalAlocado = investments.reduce((acc, inv) => acc + getAbsoluteValue(inv.amount, totalValue), 0);
const isOverLimit = totalAlocado > totalValue;



  return (
    <main className="main-wrapper">
      <Section1 
        totalValue={totalValue}
        setTotalValue={setTotalValue}
        investments={investments}
        setInvestments={setInvestments}
        updateInvestment={updateInvestment}
      
      />
      
      <Section2 
        totalValue={totalValue}
        investments={investments} 
        isOverLimit={isOverLimit} // Passando a informação de erro
      />

      <Section3 />

      
    </main>
  );
}