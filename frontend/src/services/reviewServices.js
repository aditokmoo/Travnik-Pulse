const BASE_URL = `/`;
export async function getUnapprovedReviews() {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/reviews/unapproved-reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.status === "success") return data.reviews;
    return "error";
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleUnapprovedReview(reviewID) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(
      `${BASE_URL}api/reviews/unapproved-reviews/${reviewID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();

    if (data.status === "success") return data.review;
    return "not-found";
  } catch (err) {
    console.log(err);
  }
}

export async function approveReview(reviewID) {
  const token = localStorage.getItem("jwt");

  try {
    const res = await fetch(
      `${BASE_URL}api/reviews/approve-review/${reviewID}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function declineReview(reviewID) {
  const token = localStorage.getItem("jwt");
  try {
    await fetch(`${BASE_URL}api/reviews/decline-review/${reviewID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
  }
}

//FOR CLIENT
export async function createReview(tourID, formData) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/reviews/review-tour/${tourID}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
