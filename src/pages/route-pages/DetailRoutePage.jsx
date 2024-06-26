import { useEffect, useState } from "react";
import { HiOutlineEye,HiOutlineXCircle, HiArrowRight  } from "react-icons/hi";
import {useNavigate, useParams} from 'react-router-dom'
import { getRouteById } from "../../api/route-api";
import { getRouteVars } from "../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import { getRouteStation } from "../../api/route-station-api";
import Map from '../../pages/Map.jsx';
import { applyTimetableFortrip, getTimeTableByRouteIdandRouteVarId, getTripsByTimetableId } from "../../api/timetable-api.js";
import classNames from "classnames";
import { getStationByStationId } from "../../api/station-api.js";
import StationDetailModal from "../../components/route-components/StationDetailModal.jsx";
import { HiPencil } from "react-icons/hi";
import { HiOutlinePlus } from "react-icons/hi";

export default function DetailRoutePage() {
  const params=useParams();
  const navigate=useNavigate();
  const [routeInfo,setRouteInfo]=useState({});
  const [routeStationList1,setRouteStationList1]=useState([])
  const [routeStationList2,setRouteStationList2]=useState([])
  const [routeVar1,setRouteVar1]=useState('')
  const [routeVar2,setRouteVar2]=useState('')
  const [timetable1,setTimetable1]=useState(null)
  const [timetable2,setTimetable2]=useState(null)
  const [isOpenMap,setIsOpenMap]=useState(null);
  const [MapType,setMapType]=useState(null);
  const [detailStation,setDetailStation]=useState(null);
  const [isOpenDetailModal,setIsOpenDetailModal]=useState(null);

  console.log("route info",routeInfo)
  console.log("routeStationList1",routeStationList1)
  console.log("routeStationList2",routeStationList2)
  console.log("timetable 1 detail route",timetable1)

  const handleViewMap = (enumType)=>{
   
    if(enumType === true){
      setIsOpenMap(true);
      setMapType(true)
    }else if (enumType===false){
      setIsOpenMap(false);
      setMapType(false)
    }
  }

  const handleCloseMap=()=>{
    setIsOpenMap(null);
  }

  const handleViewStationDetail=async(stationId)=>{
    try {
      const responseAPI= await getStationByStationId(stationId);
      console.log("Response detail station",responseAPI);
      if(responseAPI!==null){
        setDetailStation(responseAPI);
        setIsOpenDetailModal(true);
      } 
    } catch (error) {
      console.error("view station detail exception",error);
    }
  }

  const handleEditRoute=async ()=>{
    navigate(`/route/${routeInfo.id}/update`);
  }

  const handleRouteClick=async ()=>{
    navigate(`/route`)
  }

  // const handleDetailClick=async ()=>{
  //   navigate(`/route/${params.routeId}`)
  // }

  const handleUpdateTimetable=async()=>{
    navigate(`/route/${routeInfo.id}/routevar/${routeVar1}/${routeVar2}/timetable/create`)
  }

  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const responserouteInfo= await getRouteById(params.routeId);
        const responseRoutevarList= await getRouteVars(params.routeId);

        if(Array.isArray(responseRoutevarList)===true){
          responseRoutevarList.map(async(item,index)=>{
            const responseRouteStation=await getRouteStation(params.routeId,item.id);
            if(index===0 && Array.isArray(responseRouteStation)===true){
              setRouteStationList1(responseRouteStation)
              console.log("Luot 1",item.id)
              setRouteVar1(item.id)
              const responseTimetable1= await getTimeTableByRouteIdandRouteVarId(params.routeId, item.id);
              if(responseTimetable1!==null) setTimetable1(responseTimetable1[0])
            }else{
              setRouteStationList2(responseRouteStation);
              console.log("Luot 2",item.id)
              setRouteVar2(item.id);
              const responseTimetable2= await getTimeTableByRouteIdandRouteVarId(params.routeId, item.id);
              if(responseTimetable2!==null) setTimetable2(responseTimetable2[0])
            }
          })
          await responserouteInfo!==null?setRouteInfo(responserouteInfo):setRouteInfo({});
        }else{
          toast(`Tuyến số ${routeInfo.routeNo} không có lượt`)
        }
        const reponseAPICheckApplyTimetable=await getTripsByTimetableId(timetable1.id);
        console.log("reponseAPICheckApplyTimetable",reponseAPICheckApplyTimetable)
        if(reponseAPICheckApplyTimetable===null){
          const responseAPI1= await applyTimetableFortrip(timetable1.id);
          const responseAPI2= await applyTimetableFortrip(timetable2.id);
          if(responseAPI1===200 && responseAPI2===200){
              toast.success(`Đã tự động tạo chuyến cho tuyến ${routeInfo.routeNo}`)
          } 
          else toast.error(`Tự động tạo chuyến cho tuyến ${routeInfo.routeNo} thất bại`)
          }
      } catch (error) {
        console.error('fetch data detail page',error)
      }
    }
    fetchData()
  },[params.routeId])

  return (
    <div className="mx-8 mt-8">
      <ToastContainer/>
      <div className="mb-2">
      <p>
        <button onClick={handleRouteClick} className="hover:underline text-sky-700 ">Tuyến</button>
        <span className="px-2">&gt;</span>
        <button type="button" className="hover:underline text-sky-700">Chi tiết</button>
      </p>
        <div className="flex flex-row justify-center items-center gap-4 font-montserrat">
          <div className="text-center text-2xl pb-6 text-sky-500 font-bold mt-3">{routeInfo.name}</div>
          <HiPencil className=" bg-blue-200 hover:bg-blue-700 hover:cursor-pointer rounded-full text-center" size={30} onClick={()=>handleEditRoute()}/>
        </div>
        
        <div>
        <p><span className="text-sky-500 font-bold font-montserrat" >Mã số tuyến:</span> <span className="font-montserrat">{routeInfo.routeNo}</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Khoảng cách:</span> <span className="font-montserrat">{routeInfo.distance} mét</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thời gian của 1 chuyến:</span> <span className="font-montserrat">{routeInfo.timeOfTrip} phút</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thời gian giãn cách:</span> <span className="font-montserrat">{routeInfo.headWay} phút</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thời gian hoạt động:</span> <span className="font-montserrat">{routeInfo.operationTime}</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Loại xe:</span> <span className="font-montserrat">{routeInfo.numOfSeats} chỗ</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Tổng số chuyến:</span> <span className="font-montserrat">{routeInfo.totalTrip}</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thuộc tổ chức:</span> <span className="font-montserrat" dangerouslySetInnerHTML={{ __html: routeInfo.orgs }}></span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Mô tả vé:</span> <span className="font-montserrat"  dangerouslySetInnerHTML={{ __html: routeInfo.tickets }}></span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thời khóa biểu - lượt đi:</span> <span className="font-montserrat">{timetable1!==null? timetable1.applyDates:(
          <div className="flex flex-row items-center gap-3">
            <p className="text-slate-400">Chưa có thời khóa biểu cho lượt đi</p>
            <HiOutlinePlus className="bg-cyan-700 rounded-full hover:cursor-pointer" onClick={()=>handleUpdateTimetable()}/>
          </div>
        )}</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Thời khóa biểu - lượt về:</span> <span className="font-montserrat">{timetable2!==null? timetable2.applyDates:(<div className="flex flex-row items-center gap-3">
            <p className="text-slate-400">Chưa có thời khóa biểu cho lượt về</p>
            <HiOutlinePlus className="bg-cyan-700 rounded-full hover:cursor-pointer" onClick={()=>handleUpdateTimetable()}/>
          </div>)}</span></p>
        <p><span className="text-sky-500 font-bold font-montserrat" >Trạng thái:</span> <span className="font-montserrat">{routeInfo.status}</span></p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 pt-8">
      {/* Lượt  */}
      <div className="border-2 border-sky-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-sky-400 rounded-full cursor-pointer hover:bg-sky-200 ml-auto" onClick={()=>handleViewMap(true)} size={25}/>
        <div>
        <h1 className="text-sky-500 underline font-montserrat">Lượt đi:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList1&& routeStationList1.length>0&&routeStationList1.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <div onClick={()=>handleViewStationDetail(item.stationId)} className="hover:cursor-pointer">
                <p className={ classNames(item.storeId!=="00000000-0000-0000-0000-000000000000"? ' text-neutral-400':'text-black',"mr-2 hover:font-bold")}>{item.stationName}</p>
              </div>
              {index===routeStationList1.length-1?(<></>):<HiArrowRight className="mr-2 font-bold"/>} 
            </div>
          ))}
        </div>
        
      </div>
      {/* Lượt về */}
      <div className="border-2 border-sky-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-sky-400 rounded-full cursor-pointer hover:bg-sky-200 ml-auto" onClick={()=>handleViewMap(false)} size={25}/>
        <div>
        <h1 className="text-sky-500 underline font-montserrat">Lượt về:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList2&& routeStationList2.length>0&&routeStationList2.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <div onClick={()=>handleViewStationDetail(item.stationId)} className="hover:cursor-pointer">
                <p className={ classNames(item.storeId!=="00000000-0000-0000-0000-000000000000"? ' text-neutral-400':'text-black',"mr-2 hover:font-bold")}>{item.stationName}</p>
              </div>
              {index===routeStationList2.length-1?(<></>):<HiArrowRight className="mr-2"/>} 
            </div>
          ))}
          {routeStationList2.length===0&&(
            <div>
              <p>Lượt về này hiện chưa có dữ liệu. Bạn có muốn tạo dữ liệu cho lượt về này không?</p>
              <button className="bg-green-300 hover:bg-green-50">Có</button>
              <button className="bg-rose-300 hover:bg-rose-50">Không</button>
            </div>
          )}
        </div>
        
      </div>
      {/*End Lượt về */}
      {/* Map của lượt */}
      {isOpenMap===true &&(
        <div className="border-2 border-sky-200 rounded-lg p-4 mx-auto">
          <h1 className="text-sky-500 font-montserrat">Bản đồ lượt đi</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===true && (
          <Map markers={routeStationList1}/>
        )}
      </div>
      )}
      {isOpenMap===false &&(
        <div className="border-2 border-sky-200 rounded-lg p-4 mx-auto">
          <h1 className="text-sky-500 font-montserrat">Bản đồ lượt về</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===false && (
          <Map markers={routeStationList2}/>
        )}
      </div>
      )}
      
      {/*End Map của lượt */}

      {/* Modal detail station */}
      {
        isOpenDetailModal===true && (
          <StationDetailModal buttonCheck={isOpenDetailModal} detailStation={detailStation} setButtonCheck={setIsOpenDetailModal}/>
        )
      }
      {/* End Modal detail station */}
    </div>
    </div>
    
  )
}
