import { HiOutlinePlusSm,HiOutlineXCircle } from "react-icons/hi";
import CategoryItem from "../../components/category-components/CategoryItem";
import { useEffect, useState } from "react";

import CreateCategoryPage from "./CreateCategoryPage";



export default function CategoryMainPage() {
  const [modalCreate,setModalCreate]=useState(false);
  const [checkReload,setCheckReload]=useState(null);

  console.log("check reload when create category", checkReload);

    const handleCreateButtonClick=()=>{
        setModalCreate(true);
    }

    const handleCloseModal=()=>{
        setModalCreate(false);
    }
    
    useEffect(()=>{

    },[modalCreate])
    
    
  return (
    <>
        <h1 className="text-center mx-auto text-4xl font-bold py-4 font-montserrat">Danh Sách Danh Mục</h1>
        <div className="flex justify-between gap-1">
            <div className="w-2/3 mt-14">
                    <CategoryItem checkReload={checkReload}/>
            </div>
            <div className="w-1/3 mt-10">
                {modalCreate===false&& (
                    <button className="font-montserrat text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 pl-3 pr-4 pt-2 pb-2 flex flex-row ml-auto items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Tạo mới danh mục</button>
                )}
                {modalCreate===true && (
                <div className=" bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
                    <HiOutlineXCircle className="ml-auto hover:cursor-pointer"size={40} onClick={handleCloseModal}/>
                    <CreateCategoryPage checkReload={setCheckReload}/>
                </div>
                )}
            </div>
            
        </div>
        
    </>
    
  )
}
