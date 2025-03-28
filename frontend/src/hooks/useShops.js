import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShop,
  deleteShop,
  editShop,
  getAllShops,
  getRadiusShop,
  getSingleShop,
} from "../services/shopServices";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// Get all shops
export function useGetAllShops() {
  const { data, isLoading } = useQuery({
    queryFn: getAllShops,
    queryKey: ["shops"],
  });

  return { data, isLoading };
}

export function useCreateShop() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createShop(formData),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        return navigate(-1);
      }

      return toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useGetRadiusShops() {
  const { data, isLoading } = useQuery({
    queryFn: getRadiusShop,
    queryKey: ["RadiusShops"],
  });
  return { data, isLoading };
}

export function useDeleteShop() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (shopID) => deleteShop(shopID),
    onSuccess: () => {
      toast.success("Shop deleted");
      return queryClient.invalidateQueries(["shops"]);
    },
  });

  return { mutate, isLoading };
}

export function useGetSingleShop() {
  const { shopID } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getSingleShop(shopID),
    queryKey: ["shop"],
    enabled: true,
    staleTime: 0,
  });

  return { data, isLoading };
}

export function useEditShop() {
  const { shopID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => editShop(formData, shopID),
    onSuccess: (res) => {
      if (res.status == "success") {
        queryClient.invalidateQueries("shops");
        queryClient.invalidateQueries("shop");
        toast.success("Shop updated");
        return navigate(-1);
      }

      toast.error(res.message);
    },
  });

  return { mutate, isLoading };
}
