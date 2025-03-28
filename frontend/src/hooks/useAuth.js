import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, login, signup } from "../services/authServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (res) => {
      if (res.status === "fail") return toast.error(res.message);
      localStorage.setItem("jwt", res.token);
      navigate("/app");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}

export function useSignup() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, password, passwordConfirm }) =>
      signup(username, password, passwordConfirm),
    onSuccess: (res) => {
      if (res.status === "fail" || res.status === "error")
        return toast.error(res.message);
      navigate("/app/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}

export function useGetUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { data, isLoading };
}
