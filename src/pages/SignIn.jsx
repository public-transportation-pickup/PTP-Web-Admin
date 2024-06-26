import { useState } from 'react';
//import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import OAuth from '../components/shared/OAuth';

export default function SignIn() {
  const [formData,setFormData]=useState({});
  const {error}=useSelector((state)=>state.user);
  
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
    console.log("HandleChange: ",e.target.id);
  };
  //console.log("Formdata",formData);

  return (
    <div className="h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-300">
    {/*<!-- Left column container with background-->*/}
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

      {/* <!-- Right column container --> */}
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-7/12 xl:w-7/12 mx-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900">
            Đăng Nhập
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 gap-4" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  // value="admin-ptp@gmail.com"
                  autoComplete="email"
                  required
                  className="block w-full h-12 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                  Mật khẩu
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-cyan-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  // value="@Abcaz12345"
                  autoComplete="current-password"
                  required
                  className="block w-full h-12 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <OAuth formData={formData}/>
            </div>
          </form>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  </div>
    
  )
}
