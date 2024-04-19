import { Dialog, Transition } from '@headlessui/react'
import { Fragment, isValidElement, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalNotification({buttonClick,setButtonClick}) {
    let [isOpen, setIsOpen] = useState(buttonClick)

    function closeModal() {
      setIsOpen(false)
      setButtonClick(false);
    }
  
    // function openModal() {
    //   setIsOpen(true)
    // }

    useEffect(()=>{

    },[buttonClick])
  
    return (
      <>
        {/* <div className=" flex items-center ">
          {isValidElement(buttonValue)===true && (
            <button
            type="button"
            className='w-full rounded-lg'
            onClick={openModal}
            
          >
            {buttonValue}
          </button>
          )}
          
        </div> */}
  
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Thông báo
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-base text-gray-500">
                        Chức năng này hiện chưa được hỗ trợ
                      </p>
                    </div>
  
                    <div className="mt-4 flex flex-row gap-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={async ()=>{
                          closeModal();
                        }}
                      >
                        Đóng
                      </button>
                      {/* <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Hủy
                      </button> */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}

ModalNotification.propTypes={
    buttonClick:PropTypes.bool,
    setButtonClick:PropTypes.func
}