import React, { useState } from 'react';

export const Section3 = ({totalValue, enrichedInvestments }) =>
{
    var rates = {};
   

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
        enrichedInvestments.map((inv, index) => (
          <div className="investiment">
            {/* Div agrupando cada bloco de investimento */}
            
            {/* Segundo loop: percorre as propriedades de CADA investimento */}
            {Object.entries(inv).map(([key, value]) => 
                
                
            {

            var keyRate = `${key}Rate`;
                
            
            if (key.includes('tax'))
            {
                rates[key] = value;

                console.log('rates', rates);


                if(Object.keys(rates).length == 3)
                    return (
                
                    <div key={key} className="investiment_characteristics">
                        <div className="rate">
                            <span>{key}: </span> <p>{String(value)}</p>
                        </div>   
                    </div>   
                    
                
                
                    )

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
        ))
      )}
    
  </section>
);

}