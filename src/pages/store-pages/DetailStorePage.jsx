import { useParams,useNavigate } from "react-router-dom";
//import Map from "../Map";
import { useEffect, useState } from "react";
import { getStoreById } from "../../api/store-api-1.js";
import MenuDropDownComponent from "../../components/store-components/MenuDropDownComponent";


export default function DetailStorePage() {
    const params= useParams();
    const navigate= useNavigate();
    console.log("param detail page", params.storeId);
    const [detailStore, setDetailStore]=useState({});
    const [markerStore,setMarkerStore]=useState([])

    console.log("detail store", detailStore);
    console.log("Marker store", markerStore);

    
    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI= await getStoreById(params.storeId);
            //console.log("response api detail store",responseAPI);
            await setDetailStore(responseAPI)
            await setMarkerStore((prevList)=>[...prevList,{popUp:detailStore.name, geocode:[detailStore.latitude,detailStore.longitude]}])
           
        }
        fetchData();
    },[params.storeId])

    const handleViewProductClick=async(id)=>{
        navigate(`/store/${id}/product`)
    }

    const handleViewMenuClick=async(id)=>{
        navigate(`/store/${id}/menu`)
    }

    // const handleViewDashboardButton=async (id)=>{
    //     navigate(`/store/${id}/dashboard`)
    // }

  return (
    <div>
        {/* <div>
            <button onClick={handleStoreAllButton} className="hover:underline cursor-pointer">Cửa hàng</button>
        </div> */}
        {detailStore&&(
             <div>
        
             <h1 className="text-center text-2xl pb-6 font-bold font-montserrat">{detailStore.name}</h1>
             <div className="flex justify-center p-3 border items-center rounded-full bg-blue-300 w-40 h-40 mx-auto">
                                             <img src={detailStore.imageURL} alt="image" className="w-40 h-40 object-contain rounded-full items-center" />
                                             {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
             </div>
             <div className="items-center flex justify-center gap-14 pt-4 pb-8">
                 <button onClick={()=>handleViewProductClick(params.storeId)} className="bg-sky-400 rounded-lg w-32 h-8 hover:bg-sky-200 font-montserrat font-semibold">Sản phẩm</button>
                 <button onClick={()=>handleViewMenuClick(params.storeId)} className="bg-sky-400 rounded-lg w-32 h-8 hover:bg-sky-200 font-montserrat font-semibold">Lịch bán</button>
                 {/* <button onClick={()=>handleViewDashboardButton(params.storeId)} className="bg-sky-400 rounded-lg w-auto h-8 hover:bg-sky-200 px-2 font-montserrat font-semibold">Thống kê cửa hàng</button> */}
                 <MenuDropDownComponent storeId={params.storeId}/>
             </div>
             <div className='p-3 max-w-6xl mx-auto'>
                 {/* xem detail store như create store, cho thêm thuộc tính
                     Dưới image sẽ có các thao tác điều hướng (view product of store, view menu)
                     button cùng tone màu, menu nhạt hơn store
                 */} 
     
                 <section className="">
       <div className="py-3 px-4 mx-auto max-w-2xl lg:py-8">
           <form action="#">
               <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                   <div className="sm:col-span-2">
                       <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                       <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={`${detailStore.addressNo}, ${detailStore.zone}, ${ detailStore.ward}, TPHCM`} readOnly/>
                   </div>
                   <div className="w-full">
                       <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ mở cửa</label>
                       <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.openedTime} readOnly/>
                   </div>
                   <div className="w-full">
                       <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ đóng cửa</label>
                       <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.closedTime} readOnly/>
                   </div>
                   <div>
                       <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại của cửa hàng</label>
                       <input type="text" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.phoneNumber} readOnly/>
                   </div>
                   <div>
                       <label htmlFor="emailManager" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Quản lý</label>
                       <input type="text" name="emailManager" id="emailManager" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.email} readOnly/>
                   </div>
                   <div>
                       <label htmlFor="managerName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên quản lý</label>
                       <input type="text" name="managerName" id="managerName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.managerName} readOnly/>
                   </div>
                   <div>
                       <label htmlFor="managerPhone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại quản lý</label>
                       <input type="text" name="managerPhone" id="managerPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.managerPhone} readOnly/>
                   </div>
                    
                   <div className="sm:col-span-2">
                       <label htmlFor="stationRegister" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cửa hàng đã được đăng kí tại trạm</label>
                        {detailStore.stationName && detailStore.stationName.length >0&& detailStore.stationName.map((item,index)=>(
                            <div key={index} className="flex flex-row gap-4 ml-8">
                                <div className="bg-gray-50 rounded-lg p-2 mb-2 border border-gray-400 w-full font-montserrat text-sm">{index+1} - {item}</div>
                            </div>
                        ))}
                   </div>
                   <div className="sm:col-span-2">
                       <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                       <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-montserrat" value={detailStore.description}></textarea>
                   </div>
               </div>
              
           </form>
       </div>
     </section>
             </div>
             <div>
                 {/*Import a location map of store by coordinate of store*/}
                 {/* <h1 className="pt-10 text-lg">Location maps</h1> */}
                 <div className="flex justify-center" >
                     {/* <div className="w-3/4 items-center border border-s-slate-200">
                         <Map markers={markerStore}/>
                     </div> */}
                 </div>
                 
             </div>
         </div>
        )}
    </div>
   
  )
}
