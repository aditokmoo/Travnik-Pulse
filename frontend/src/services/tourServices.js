const BASE_URL = `/`;
export async function getAllTours() {
  try {
    const res = await fetch(`${BASE_URL}api/tours`);
    const data = await res.json();
    return data.tours;
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleTour(tourId) {
  try {
    const res = await fetch(`${BASE_URL}api/tours/${tourId}`);
    const data = await res.json();
    if (data.status === "success") return data.tour;
    return "not-found";
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTour(tourId) {
  try {
    const token = localStorage.getItem("jwt");
    await fetch(`${BASE_URL}api/tours/${tourId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function editTour(formData, tourID) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/tours/${tourID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createTour(formData) {
  const token = localStorage.getItem("jwt");

  const res = await fetch(`${BASE_URL}api/tours`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  return data;
}

export async function rateTour(tourID, rating) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/tours/rate-tour/${tourID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function bookmarkTour(tourID) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/tours/bookmark-tour/${tourID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getRadiusTour() {
  const userPositon = JSON.parse(localStorage.getItem("position"));
  const radius = JSON.parse(localStorage.getItem("radius"));

  console.log(
    `${BASE_URL}api/tours/tours-within/distance/${radius}/center/${userPositon.lng},${userPositon.lat}`
  );
  if (!radius) return "no-radius";
  try {
    const res = await fetch(
      `${BASE_URL}api/tours/tours-within/distance/${radius}/center/${userPositon.lng},${userPositon.lat}`
    );
    const data = await res.json();
    console.log(data.tours);
    return data.tours;
  } catch (error) {
    console.log(error);
  }
}
