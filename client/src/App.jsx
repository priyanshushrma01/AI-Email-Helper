import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  return (
    <>
      <InputComp/>
    </>
  )
}

function InputComp(){
  const [prompt,setPrompt] = useState("");
  const [res,setRes] = useState("");
  return <div>
    <div>
      Gemini Email Writer
    </div>
    <textarea onChange={(e)=>{
      setPrompt(e.target.value)
    }} rows={7} cols={50} placeholder='Describe how the email should look like'></textarea>
    <br/>
    <button onClick={()=>{
      axios.post('http://localhost:3000/completion',{
        prompt: prompt
      })
        .then(response =>{
          setRes(response.data.message);
          
        })
    }}>Submit</button>
    <div>
      <textarea>{res}</textarea>
    </div>
  </div>
}

export default App
