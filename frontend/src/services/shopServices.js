const BASE_URL = `/`;

export async function getAllShops() {
  try {
    const res = await fetch(`${BASE_URL}api/shops`);
    const data = await res.json();

    return data.shops;
  } catch (error) {
    console.log(error);
  }
}

export async function createShop(formData) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/shops`, {
      method: "POST",
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

export async function getRadiusShop() {
  const userPositon = JSON.parse(localStorage.getItem("position"));
  const radius = JSON.parse(localStorage.getItem("radius"));
  if (!radius) return "no-radius";
  try {
    const res = await fetch(
      `${BASE_URL}api/shops/shops-within/distance/${radius}/center/${userPositon.lng},${userPositon.lat}`
    );
    const data = await res.json();

    return data.shops;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteShop(shopID) {
  const token = localStorage.getItem("jwt");
  try {
    await fetch(`${BASE_URL}api/shops/${shopID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function editShop(formData, tourID) {
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${BASE_URL}api/shops/${tourID}`, {
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

export async function getSingleShop(shopID) {
  try {
    const res = await fetch(`${BASE_URL}api/shops/${shopID}`);
    const data = await res.json(res);
    if (data.status === "success") return data.shop;
    return "not-found";
  } catch (err) {
    console.log(err);
  }
}
