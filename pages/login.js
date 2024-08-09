import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session)
  if (!session) {
    return (
      <div className="bg-customBg w-screen h-screen flex items-center">
        <div className="text-center w-full ">
          <button
            onClick={() =>
              signIn("google")
            }
            className="bg-blue-400 p-2 rounded-lg px-4"
          >
            Login With Google
          </button>
        </div>
      </div>
    );
  }
  else{
    router.push("/")
  }
  return (
    <div>
      
    </div>
  )
}

export default Login
