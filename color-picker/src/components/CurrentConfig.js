import {getCurrentConfig } from '../utils/API';
import { rgbwToHex } from '../utils/conversion'
import Tile from './Tile';
import { useState, createContext, useContext, useEffect } from 'react';


export default function CurrentConfig({pickerColor}) {

    const [colorData, setColorData] = useState([]);
    const [state, setState] = useState();
   
    const getData = async () => {
        
        try {
            const response = await getCurrentConfig();
            
            const result = await response.json();

            // console.log(result);
            let hexColorArray = [];
            for (let i of result) {
                hexColorArray.push(rgbwToHex(i));
            }
            
            setColorData(hexColorArray);
            // console.log(hexColorArray);

        } catch (error){
            console.error(error);
        }
    }

    useEffect(()=>{

        getData();
        
    }, []);
    useEffect(()=>{
        
        console.log(colorData)
        
    }, [colorData]);


    const style = {
        display: "flex",
        padding: "10px",
    }

    const update = (index) => {
        colorData[index] = pickerColor;
        setColorData(colorData);
        setState({});
    }
  
 

    return (
      <div style={style}>
            
        {colorData.map((color, index) => (
            <div key={index} onClick={() => update(index)}>
                <Tile color={color} />   
            </div>
        ))}

      </div>
    );
}
  