import { useNavigate } from "react-router-dom"
import { roles } from "../../mock/mockData"
import { REGISTER_PATH } from "../../routes/path";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {

  }
  return (
    <div className="flex">
      <div className="w-1/2 h-dvh p-5">
        <div className="flex justify-center">
          <span className="text-xl font-semibold">LOGIN HERE</span>
        </div>
        <div className="flex flex-col gap-3">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col mt-10 gap-4 items-cnter">
            <input placeholder="Email" className="border-1 border-[#cccccc] rounded-sm p-3 w-full" />
            <input placeholder="Password" className="border-1 border-[#cccccc] rounded-sm p-3  w-full" />
            <span className="text-[#6f6e6f]">Select Role</span>
            <div className="flex gap-2 items-center justify-start">
              {roles.map((role) =>
                <label>
                  <input type="radio" name={role.name} value={role.value} /> {role.label}
                </label>
              )}
            </div>
            <button className="bg-black flex justify-center items-center text-white py-3 rounded-sm " onClick={handleSubmit}>LOGIN</button>
          </form>
          <div className="flex items-center justify-center gap-1">
            <span className="text-[#7b7d8c]">{"Don't have an account ? "}</span>
            <span className="font-bold text-sm cursor-pointer" onClick={() => navigate(REGISTER_PATH)}> {" Register"}</span>
          </div>
        </div>
      </div>
      <div className="bg-black w-1/2 h-dvh">

      </div>
    </div>
  )
}
