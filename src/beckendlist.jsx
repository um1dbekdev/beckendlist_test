import axios from "axios"
import { useEffect , useState } from "react"

const BeckendList = () =>{

  const [data,setData] = useState([])

  const chnagePng = async () =>{
    try {
      const change = await axios.get('https://53b8dd0b73336c11.mokky.dev/beckendlist')
      setData(change.data)
    } catch (error) {
      console.log(error)
    }
  }


  
  const changeRemove = (id) =>{
    const newdata = data.filter((value)=>{
      try{
        axios.delete(`https://53b8dd0b73336c11.mokky.dev/beckendlist/${id}`)
        return(
          value.id !== id
        )
      }
      catch(e){
        console.log(e)
      }
    })

    setData(newdata)
  }


  const changePlus = async (e) =>{
    e.preventDefault()
    
    const datas = {
      title:e.target.title.value,
      title:e.target.price.value,
    }

    try {
      const change = await axios.post('https://53b8dd0b73336c11.mokky.dev/beckendlist',datas)
      const reso = [...data,change.data]
      setData(reso)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(()=>{
    chnagePng()
  },[])

    return(
      <div className="big grid justify-center mt-[100px] w-[100%]  ">
        <h1 className="text-[grey] text-center text-[30px]">TODO LIST</h1>
      <div className="ml-[100px]">
      <div className="top flex  p-[20px] justify-between items-center w-[700px] mr-[100px] mt-[10px] ">
      
      <div className="left">
        <form onSubmit={changePlus} className="flex gap-[20px]">
          <button className="text-[white] bg-[#6a6affd8] active:scale-[.9] duration-300 h-[34px] rounded-[4px] w-[100px]">Add Task</button>
          <input name="title" className="border outline-none w-[120px] rounded-[4px] pl-[10px]" type="text" placeholder="title" />
          <input name="price" className="border outline-none w-[270px] rounded-[4px] pl-[10px]" type="text" placeholder="price" />
        </form>
        </div>
        <div className="right">
          <select className="w-[100px] h-[34px] outline-none bg-[#80808020] rounded-[4px] pl-[10px]">
            <option>All</option>
            <option>All</option>
            <option>All</option>
            <option>All</option>
          </select>
      </div>
    </div>
    <div className="buttom bg-[#80808056] w-[660px] ml-[20px] rounded-[10px] p-[20px] flex gap-2 flex-col " >
      {
        data.map((v)=>{
          return(
            <div className="bg-[white] rounded-[4px] flex  items-center justify-between w-[100%] p-[10px]" key={v.id}>
              
              <div className="flex gap-[10px]">
              <input type="checkbox" className="w-[30px]" />
              <div className="leading-4 flex items-center justify-between w-[400px]">
              <div>
              <h1 className="text-[14px]"><span>{v.title}</span></h1>
              <span className="text-[grey] text-[11px] text-balance">{v.price}</span>
              </div>
              <div>
                <h1 className="w-[100%]">{new Date().getDay()}/{new Date().getMonth()}/{new Date().getFullYear()} | {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getMilliseconds()}</h1>
              </div>
              </div>
              </div>

              <div className="delete mr-[10px] active:scale-[.9] duration-100 " onClick={()=>changeRemove(v.id)}>
                <img className="w-[24px] " src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="eror 404 sorry click yes" />
              </div>

            </div>
          )
        })
      }
    </div>
    </div>
   </div>
    )
}


export default BeckendList