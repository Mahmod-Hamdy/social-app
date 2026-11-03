import { NavLink } from "react-router";

function LoginAndRegister() {
    return (
        <>
        <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-3 00 p-1">
            <NavLink
            to="login"
            type="button"
            className="rounded-lg py-2 text-sm font-extrabold transition  text-slate-600"
            >
            Login
            </NavLink>
            <NavLink
            to="register"
            type="button"
            className="rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
            >
            Register
            </NavLink>
        </div>
        </>
    );
    }

export default LoginAndRegister;
