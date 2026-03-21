import { loginService } from "@/services/auth.service";
import { LoginTypes } from "@/types/auth/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginTypes) => loginService(data),
  });
};
