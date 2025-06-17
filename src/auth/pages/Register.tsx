import { useNavigate } from "react-router-dom"
import { LOGIN_PATH } from "../../routes/path"

export const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="w-1/2 h-dvh p-5">
        <div className="flex justify-center">
          <span className="text-xl font-semibold">REGISTER HERE</span>
        </div>
        <div className="flex flex-col gap-3">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col mt-10 gap-4 items-cnter">
            <input placeholder="Full Name" className="border-1 border-[#cccccc] rounded-sm p-3 w-full" />
            <input placeholder="Mobile Number" className="border-1 border-[#cccccc] rounded-sm p-3  w-full" />
            <input placeholder="Email" className="border-1 border-[#cccccc] rounded-sm p-3 w-full" />
            <input placeholder="Password" className="border-1 border-[#cccccc] rounded-sm p-3  w-full" />
            <button className="bg-black flex justify-center items-center text-white py-3 rounded-sm " >CREATE ACCOUNT</button>
            <button className="bg-black flex justify-center items-center text-white py-3 rounded-sm mt-2 " >REGISTER AS A DRIVER </button>
          </form>
          <div className="flex items-center justify-center gap-1">
            <span className="text-[#7b7d8c]">{"Already have an account ? "}</span>
            <span className="font-bold text-sm cursor-pointer" onClick={() => navigate(LOGIN_PATH)}> {" Login"}</span>
          </div>
        </div>
      </div>
      <div className="bg-black w-1/2 h-dvh">

      </div>
    </div>
  )
}
