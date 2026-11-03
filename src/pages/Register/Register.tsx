import {
  Alert,
  Button,
  FieldError,
  Input,
  Spinner,
  TextField,
} from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  registerValidationData,
  type RegisterValidationDataType,
} from "../../lib/Schemas/Auth.Schema";
import { registerUser } from "../../services/auth.service";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(registerValidationData),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });
  async function submitData(dataOfUser: RegisterValidationDataType) {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await registerUser(dataOfUser);
      console.log(response);
      console.log(response.data.message);
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/auth/login")
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
            Create a New Account
          </h1>
          <p className="text-gray-500 font-bold my-2">It is quick and easy.</p>
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
              aria-label="name"
              className="w-full"
              isInvalid={Boolean(errors.name)}
            >
              <Input
                {...register("name")}
                aria-label="name"
                className="w-full rounded-2xl"
                placeholder="Enter Full Name"
              />
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="username"
              className="w-full"
              isInvalid={Boolean(errors.username)}
            >
              <Input
                {...register("username")}
                aria-label="username"
                className="w-full rounded-2xl"
                placeholder="Enter User Name"
              />
              <FieldError>{errors.username?.message}</FieldError>
            </TextField>
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
              aria-label="gender"
              className="w-full"
              isInvalid={Boolean(errors.gender)}
            >
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    aria-label="gender"
                    placeholder="Select gender"
                  >
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="male" value="male" textValue="male">
                          Male
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item
                          id="female"
                          value="female"
                          textValue="female"
                        >
                          Female
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                )}
              />
              <FieldError>{errors.gender?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="dateOfBirth"
              className="w-full"
              isInvalid={Boolean(errors.dateOfBirth)}
            >
              <Input
                {...register("dateOfBirth")}
                aria-label="date"
                className="w-full rounded-2xl"
                type="date"
              />
              <FieldError>{errors.dateOfBirth?.message}</FieldError>
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
            <TextField
              aria-label="rePassword"
              className="w-full"
              isInvalid={Boolean(errors.rePassword)}
            >
              <Input
                {...register("rePassword")}
                aria-label="Confirm Your Password"
                className="w-full rounded-2xl"
                type="password"
                placeholder="Confirm Your Password"
              />
              <FieldError>{errors.rePassword?.message}</FieldError>
            </TextField>
            <Button type="submit" className="bg-main rounded-md w-full">
              {isSubmitting ? (
                <div className="flex items-center content-center gap-3">
                  <Spinner className="text-white" /> <p>Loading ...</p>
                </div>
              ) : (
                "Create New Account"
              )}
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Register;
