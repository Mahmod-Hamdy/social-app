import React from 'react'
import { Outlet } from 'react-router'
import AuthIntro from '../components/AuthIntro/AuthIntro'
import LoginAndRegister from '../components/Login&Register Buttons/LoginAndRegister'

function AuthLayout() {
  return (
    <>
      <main className='bg-sec py-20 px-8 min-h-screen flex flex-col lg:flex-row justify-center items-center'>
        <div className="container mx-auto my-10">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className='order-2 lg:order-0 mx-auto'>
              <AuthIntro/>
            </div>
            <div className='order-0 mb-2'>
              <LoginAndRegister/>
              <Outlet/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AuthLayout