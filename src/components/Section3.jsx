import React, { useState } from 'react';

export const Section3 = ({totalValue, enrichedInvestments }) =>
{
    

return (
  <section id='thirdPanel'>
    <div className="center">
        Investments Details
    </div>

    
      {enrichedInvestments.length === 0 ? (
        <div className="investiment">
            <p>No investments added yet.</p>
        </div>
      ) : (
        /* Primeiro loop: percorre a lista de investimentos */
        enrichedInvestments.map((inv, index) => {
          
          //variavel para salvar as rates para a div especifica
          var rates = {};
          
          return(
          <div className="investiment">
            {/* Div agrupando cada bloco de investimento */}
            
            {/* Segundo loop: percorre as propriedades de CADA investimento */}
           
            {Object.entries(inv).map(([key, value]) => 
                
                
            {
            // filtrando as rates para a div exclusiva delas
            if (key.includes('tax'))
            {
                //salvando as rates na variavel externa ao loop map inv
                rates[key] = value;
                //são 3 rates, então quando o tamanho for igual a 3: todos as rates foram salvas em rates
                if(Object.keys(rates).length == 3)
                    return (
                
                    <div key={key} className="investiment_characteristics">
                      <span> Rates: </span>

                        <div className="rate">
                            {Object.entries(rates).map(([key, value]) => (<div> <span>{key}: </span> <p>{String(value)}</p> </div>))}
                        </div>   
                    </div>   )

            }
            else
            {
                return(
              <div key={key} className="investiment_characteristics">
               <span>{key}: </span> <p>{String(value)}</p>
              </div>   
                )
        
            }
        
        
            }
            
            )}
            
          </div>
        )}      
      
      )
      )}
    
  </section>
);

}