import React from 'react'
import { useState } from 'react'

export default function App() {
   
  let [city,setCity]=useState('')
  let [wdetail,setWdetail]=useState()
  let [loading,setLoading]=useState(false)
  let getdata=(event)=>{
    setLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
       .then((res)=>res.json())
       .then((finalRes)=>{
          if(finalRes.cod=="404")
          {
            setWdetail(undefined)
          }
          else{
            setWdetail(finalRes)
          }
        
        setLoading(false)
       })
    event.preventDefault()
    setCity('')
  }
  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple whether App</h1>

         <form onSubmit={getdata}>
            <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className= 'bg-[#ffffff] w-[300px] h-[40px] pl-3'  placeholder='city name'/> <button className='bg-[#1d4a6b] text-white font-bold p-[10px_20px]'>Submit</button>
         </form>

         <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
           <img src='https://gifdb.com/images/high/loading-circle-blue-ellipse-uszpgae2ri2kdhf6.webp' width={100} className={`absolute left-[40%] ${loading ? '' :' hidden' }`}/>


             {wdetail!==undefined
             ?
               <>
                   <h3 className='font-bold text-[30px]'>{wdetail.name} <span className='bg-[yellow]'>{wdetail.sys.country}</span></h3>
                   <h2 className='fond-bold text-[40px]'>
                    {wdetail.main.temp}
                   </h2>
                   <img src={`http://openweathermap.org/img/w/${wdetail.weather[0].icon}.png`}/>
                   <p>{wdetail.weather[0].description}</p>
               </>
               :
               "No Data found"
               
             
             }
             
             
              
            
         </div>
      </div>

        
      
    </div>
    
    
    
  )
}



