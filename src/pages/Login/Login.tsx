import {
  Alert,
  Button,
  FieldError,
  Input,
  Spinner,
  TextField,
} from "@heroui/react"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginValidationData, type LoginValidationDataType } from "../../lib/Schemas/Login.Schema";
import { loginUser } from "../../services/login.service";
import { TokenContext } from "../../components/Contexts/Token Context/token.context";
function Login() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {setToken}=useContext(TokenContext);
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginValidationData),
    defaultValues: {
      email: "",
      password: ""
    },
  });
  async function submitData(dataOfUser: LoginValidationDataType) {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await loginUser(dataOfUser);
      console.log(response);
      localStorage.setItem("userToken",response.data.data.token);
      setToken(response.data.data.token)
      console.log(response.data.message);
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/main")
      },1500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        toast.error(error.response?.data.message);
      }
    }
  }
  return (
    <>
      <main>
        <section>
          <h1 className="text-3xl font-black text-main mb-2">
            Log in to Route Posts
          </h1>
          <p className="text-gray-500 font-bold my-2">Log in and continue your social journey.</p>
          {successMessage && (
            <>
              <Alert status="success" className="bg-green-300 my-3">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{successMessage}</Alert.Title>
                </Alert.Content>
              </Alert>
            </>
          )}
          {errorMessage && (
            <>
              <Alert status="danger" className="bg-red-300 my-3">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{errorMessage}</Alert.Title>
                </Alert.Content>
              </Alert>
            </>
          )}
          <form onSubmit={handleSubmit(submitData)} className="space-y-5">
            <TextField
              aria-label="email"
              className="w-full"
              isInvalid={Boolean(errors.email)}
            >
              <Input
                {...register("email")}
                aria-label="email"
                type="email"
                className="w-full rounded-2xl"
                placeholder="Email Address"
              />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="password"
              className="w-full"
              isInvalid={Boolean(errors.password)}
            >
              <Input
                {...register("password")}
                aria-label="password"
                className="w-full rounded-2xl"
                type="password"
                placeholder="Enter Your Password"
              />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
            <Button type="submit" className="bg-main rounded-md w-full">
              {isSubmitting ? (
                <div className="flex items-center content-center gap-3">
                  <Spinner className="text-white" /> <p>Loading ...</p>
                </div>
              ) : (
                "LogIn"
              )}
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
