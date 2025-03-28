import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveReview,
  createReview,
  declineReview,
  getSingleUnapprovedReview,
  getUnapprovedReviews,
} from "../services/reviewServices";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function useGetUnapprovedReviews() {
  const { data, isLoading } = useQuery({
    queryFn: getUnapprovedReviews,
    queryKey: ["unapprovedReviews"],
  });

  return { data, isLoading };
}

export function useGetSingleUnapprovedReview() {
  const { reviewID } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getSingleUnapprovedReview(reviewID),
    queryKey: ["review"],
  });
  return { data, isLoading };
}

export function useApproveReview() {
  const { reviewID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => approveReview(reviewID),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["reviews"]);
        return navigate(-1);
      }
      if (res.status === "fail") return toast.error(res.message);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useDeclineReview() {
  const { reviewID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => declineReview(reviewID),
    onSuccess: () => {
      toast.success("Review declined!");
      queryClient.invalidateQueries(["reviews"]);
      return navigate(-1);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useCreateReview() {
  const { tourID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createReview(tourID, formData),
    onSuccess: (res) => {
      if (res.status === "fail") return toast.error(res.message);
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["tours"]);
        navigate(-1);
      }
    },
  });
  return { mutate, isLoading };
}
