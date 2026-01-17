import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Section1 } from "./components/Section1";
import { Section2 } from "./components/Section2";
import { Section3 } from "./components/Section3";


export default function App() {
  const [totalValue, setTotalValue] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [availableStocks, setAvailableStocks] = useState([]);
  const [investmentDetails, setInvestmentDetails] = useState({});
  // Estado para guardar as taxas calculadas de cada símbolo
  const [marketTrends, setMarketTrends] = useState({});


 const API_KEY = import.meta.env.API_KEY



const analyzeAsset = async (symbol) => {
  if (!symbol || marketTrends[symbol]) return; // Evita chamadas repetidas

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`
    );

    const timeSeries = response.data["Monthly Time Series"];
    const dates = Object.keys(timeSeries);

    const currentPrice = parseFloat(timeSeries[dates[0]]["4. close"]);
    
    const calculateChange = (monthsAgo) => {
      if (!dates[monthsAgo]) return 0;
      const pastPrice = parseFloat(timeSeries[dates[monthsAgo]]["4. close"]);
      return ((currentPrice / pastPrice) - 1) * 100; // Retorna em %
    };

    // Armazena as taxas no estado
    setMarketTrends(prev => ({
      ...prev,
      [symbol]: {
        rate3: calculateChange(3),
        rate6: calculateChange(6),
        rate12: calculateChange(12)
      }

      
    }));

    console.log('rates:', calculateChange(3), calculateChange(6));
  } catch (error) {
    console.error("Erro ao buscar taxas:", error);
  }
};

  // 1. Busca os dados da Alpha Vantage (CSV)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEY}`
        );
        
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const detailsMap = {};
            // Limitamos a 100 ativos para performance do Select
            const listForSelect = results.data.slice(0, 100).map((item) => {
              detailsMap[item.symbol] = {
                name: item.name,
                assetType: item.assetType,
                taxRate: item.assetType === "Stock" ? 0.15 : 0.20,
              };
              return { symbol: item.symbol, name: item.name };
            });
            setAvailableStocks(listForSelect);
            setInvestmentDetails(detailsMap);


           
          },
        });
      } catch (error) {
        console.error("Erro na API:", error);
      }
    };
    fetchData();
  }, []);


console.log(investments)


  // 2. Helper para converter Valor/Porcentagem para número absoluto
  const getAbsoluteValue = (amount, total) => {
    const strAmount = String(amount).replace(",", ".").trim();
    if (strAmount.endsWith("%")) {
      return (parseFloat(strAmount) || 0) / 100 * total;
    }
    return parseFloat(strAmount) || 0;
  };

  // 3. Atualiza investimentos e sincroniza com o estado
  const updateInvestment = (id, field, value) => {
    const updated = investments.map((inv) =>
      inv.id === id ? { ...inv, [field]: value } : inv
    );

    if( field == 'type')
      analyzeAsset(value);
    
    setInvestments(updated);
  };

  // 4. Cálculos de validação para passar aos componentes
  const totalAllocated = investments.reduce(
    (acc, inv) => acc + getAbsoluteValue(inv.amount, totalValue),
    0
  );
  const isOverLimit = totalAllocated > totalValue;

// create a array with more details of choose investiments
  const enrichedInvestments = investments
    .filter(inv => inv.type && investmentDetails[inv.type]) // Filtra apenas os preenchidos
    .map((inv) => {
      const details = investmentDetails[inv.type];
      const absoluteValue = getAbsoluteValue(inv.amount, totalValue);


      const trends = marketTrends[inv.type] || { rate3: 0, rate6: 0, rate12: 0 };

      //os valores vem negativos revertendo isso

      //Object.entries(trends).map(([key, value]) => [key, -1 * value])
      

    return {
      symbol: inv.type,
      name: details.name,
      type: details.assetType,
      // Rentabilidade histórica baseada na API
      investedAmount: absoluteValue,
      tax3Rate: trends.rate3.toFixed(2) + "%", 
      tax6Rate: trends.rate6.toFixed(2) + "%",
      tax12Rate: trends.rate12.toFixed(2) + "%"
    };



    });




  

  return (
    <main className="main-app-container">
      <Section1
        totalValue={totalValue}
        setTotalValue={setTotalValue}
        investments={investments}
        setInvestments={setInvestments}
        updateInvestment={updateInvestment}
        availableStocks={availableStocks}
        totalAllocated={totalAllocated}
        isOverLimit={isOverLimit}
      />
      
      <Section2 
        totalValue={totalValue}
        investments={investments}
        isOverLimit={isOverLimit}
        getAbsoluteValue={getAbsoluteValue}
        totalAllocated = {totalAllocated}
        enrichedInvestments = {enrichedInvestments}

      />

      <Section3 
      
      
      totalValue={totalValue}
      enrichedInvestments = {enrichedInvestments}
      

      
        
      
      
      />


    </main>
  );
}
