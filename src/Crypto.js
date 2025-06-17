import {useState, useEffect} from "react";
import axios from "axios";

export default function Crypto()
{
    const[info, setInfo]= useState([]);
    const[coin, setCoin]= useState("");
    const[ error, setError ] =useState("");

   const hCoin = (event) => {
        const value = event.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) { // Validate only alphabetic characters and spaces
            setCoin(value);
            setError("");
        } else {
            setError("Please enter valid coin name without special characters.");
        }
    };

    const finfo = info.filter(c => c.name.toLowerCase().includes(coin.toLowerCase()));


    useEffect( ()=>{
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR"
        axios.get(url)
        .then(res => setInfo(res.data))
        .catch(err =>alert("issue" + err));

    }, []);
    
     return(
         <>
         <center>
           
            <div className="coin">
            <h1> Crypto App</h1>
            <form>
                
                <input type="text" placeholder="Enter coin name"
                onChange={hCoin} value={coin}/>
           
            </form>
            </div>
            
           {error && <p style={{ color: "black" }}>{error}</p>}
            <br/>
                <table border="5">
                 <thead>
                  <tr> 
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Icon</th>
                    <th>Price</th>
                    <th>Price Change</th>
                   
                  </tr>
                 </thead>
                 <tbody>
                    {
                     finfo.length > 0 ? finfo.map((e) => (
                    <tr>
                         <td>{ e.name }</td>
                         <td>{e.symbol}</td>
                         <td><img src={e.image}/></td>

                         <td>{typeof e.current_price === 'number' ? e.current_price : "N/A"}</td>
                                    <td style={{ color: e.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                                        {typeof e.price_change_percentage_24h === 'number' ? e.price_change_percentage_24h.toFixed(2) : "N/A"}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5">No matching coins found</td>
                                </tr>
                            )
                        }
                    </tbody>
          
                </table>
           
         </center>
         
         </>
         
    );
}

