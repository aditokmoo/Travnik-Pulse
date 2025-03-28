import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTour,
  editTour,
  getAllTours,
  getRadiusTour,
  bookmarkTour,
  getSingleTour,
  rateTour,
} from "../services/tourServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useGetTours() {
  const { data, isLoading } = useQuery({
    queryFn: getAllTours,
    queryKey: ["tours"],
  });

  return { data, isLoading };
}

export function useGetSingleTour() {
  const { tourID } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getSingleTour(tourID),
    queryKey: ["tour"],
  });

  return { data, isLoading };
}

export function useEditTour() {
  const { tourID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => editTour(formData, tourID),
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["tours", "tour"]);
        toast.success(res.message);
        navigate(-1);
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useCreateTour() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createTour(formData),
    onSuccess: (res) => {
      toast.success("HELLO");
      if (res.status === "success") {
        toast.success(res.message);

        queryClient.invalidateQueries(["tours"]);
        return navigate(-1);
      }

      //else
      toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useRateTour() {
  const { tourID } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (rating) => rateTour(tourID, rating),
    onSuccess: (res) => {
      if (res.status === "fail") return toast.error(res.message);
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["tours"]);
      }
    },
    onError: (err) => console.log(err),
  });
  return { mutate, isLoading };
}

export function useGetRadiusTours() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: getRadiusTour,
    queryKey: ["RadiusTours"],
  });
  return { data, isLoading };
}

export function useBookmarkTour() {
  const { tourID } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookmarkTour(tourID),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tour"]);
    },
  });
  return { mutate, isLoading };
}
