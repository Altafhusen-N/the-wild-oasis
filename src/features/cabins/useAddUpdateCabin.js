import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useAddUpdateCabin(isUpdateSession = false) {
  const queryClient = useQueryClient();

  const { mutate: addUpdateCabin, isLoading: isCreating } = useMutation({
    mutationFn: isUpdateSession ? updateCabin : createCabin,
    onSuccess: () => {
      toast.success(
        isUpdateSession
          ? "Cabin updated successfully"
          : "New Cabin created successfully"
      );
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //reset(isUpdateSession ? { ...data.at(0) } : undefined);
    },
    onError: (err) => toast.error(err.message),
  });

  return { addUpdateCabin, isCreating };
}
