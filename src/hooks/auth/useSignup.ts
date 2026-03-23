import { signupService } from "../../services/auth.service";
import { SignupTypes } from "../../types/auth/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupTypes) => signupService(data),
  });
};
