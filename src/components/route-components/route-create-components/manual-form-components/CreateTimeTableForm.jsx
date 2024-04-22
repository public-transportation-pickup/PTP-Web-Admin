import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { applyTimetableFortrip, createTimeTableManually } from '../../../../api/timetable-api';
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi';
import { getRouteById } from '../../../../api/route-api';
import { getRouteVarsById } from '../../../../api/route-var-api';

export default function CreateTimeTableForm() {
    //const navigate=useNavigate();
    const params=useParams();
    const navigate=useNavigate();
    const dayOfWeek=["T2","T3","T4","T5","T6","T7","CN"]
    const [dateApply,setDateApply]=useState([]);
    const [routeInfo,setRouteInfo]=useState({});
    const [routeVarInfo,setRouteVarInfo]=useState({})
    const [timetableId1,setTimetableId1]=useState('');
    const [timetableId2,setTimetableId2]=useState('');
    const [buttonSubmit,setButtonSubmit]=useState(false);
    const [loading,setLoading]=useState(false);
    console.log("timetableId",timetableId);

    console.log("button submit",buttonSubmit)

    console.log("Date apply",dateApply);
    const handleChange=async (e)=>{
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        if (checked) {
            setDateApply([...dateApply,value])
        }
 
        // Case 2  : The user unchecks the box
        else {
            setDateApply(
                dateApply.filter(
                    (e) => e !== value
                ),
                
            );
        }
    };

    const handleApplyTimetable=async ()=>{
        setLoading(false);
        const responseAPI1= await applyTimetableFortrip(timetableId1);
        const responseAPI2= await applyTimetableFortrip(timetableId2);
        if(responseAPI===200){
            await toast.success("Áp dụng thời khóa biếu thành công")
            setLoading(true)
            if(loading===true) navigate(`/route/${params.routeId}`)
        } 
        else toast.error("Áp dụng thời khóa biếu thất bại")
    }

    // const handleContinueButton=async ()=>{
    //     navigate(`/route/${params.routeId}/routevar/${params.routevarId}/timetable/${timetableId}/trip/create`)
    //   }

    const handleSubmit= async ()=>{
        let dateApplyStr= dateApply.join(",");
        const timeTableModel=[{
            applyDates:dateApplyStr,
            routeId:params.routeId,
            routeVarId:params.routevarId1
        },
        {
            applyDates:dateApplyStr,
            routeId:params.routeId,
            routeVarId:params.routevarId2
        },

    ]
        try {
            const responseAPI= await createTimeTableManually(timeTableModel);
            if(responseAPI!==null){
                
                console.log("responseAPI[0].id",responseAPI[0].id)
                setTimetableId1(responseAPI[0].id);
                setTimetableId2(responseAPI[1].id);
                setButtonSubmit(true);
                await toast.success("Tạo thời khóa biểu thành công")
                
            } 
            else toast.error("Tạo thời khóa biểu thất bại");
        } catch (error) {
            console.error("handle submit create time table page", error)
        }
    }

    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                const responseRouteInfo= await getRouteById(params.routeId);
                const responseRoutevarInfo= await getRouteVarsById(params.routevarId);
                responseRouteInfo===null?setRouteInfo({}) :setRouteInfo(responseRouteInfo);
                responseRoutevarInfo===null? setRouteVarInfo({}) :setRouteVarInfo(responseRoutevarInfo);
            } catch (error) {
                console.log("create time table page fetch data", error)
            }
            
        }
        fetchData();
    },[params.routeId,params.routevarId])
    
  return (
    <div>
        <div>
            <h1 className='font-bold text-center py-10'>Tạo thời khóa biểu cho tuyến: <span className='text-rose-400'>{routeInfo.name}</span> </h1>
            <div className='flex flex-col items-center'>
            <p className='text-lg py-2'>Chọn ngày tuyến sẽ hoạt động</p>
            <div>
                <div  className="flex flex-row items-center ">
                {dayOfWeek && dayOfWeek.length >0 && dayOfWeek.map((item,index)=>(
                    
                        <div key={index} className="flex gap-1 mr-4 items-center">
                            <input onChange={handleChange} key={index} type="checkbox" value={item} className="w-4 h-4"/>
                            <label htmlFor="dayOfWeek" className="">{item}</label>
                        </div>
                ))}
                </div>
                
            </div>
            </div>
            
        </div>
        <div className="mt-4 ml-[28rem]">
        <div className="flex flex-row gap-4">
        <button disabled={buttonSubmit===true ? true :false} onClick={handleSubmit} type="button" className="disabled:bg-gray-400 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        {buttonSubmit===true&&(
          <div className="flex flex-row gap-3 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {/* <button  onClick={handleContinueButton} type="button" className="">Tiếp tục tạo chuyến </button><HiArrowRight className="" size={20}/> */}
            <button  onClick={handleApplyTimetable} type="button" className="">Áp dụng thời khóa biểu </button><HiArrowRight className="" size={20}/>
          </div>
        ) }
        </div>
        </div>
    </div>
  )
}

CreateTimeTableForm.propTypes={
    routevarId2:PropTypes.string,
    
}
