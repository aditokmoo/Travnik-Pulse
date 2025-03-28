const BASE_URL = `/`;
export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function signup(username, password, passwordConfirm) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        passwordConfirm,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUser() {
  const token = localStorage.getItem("jwt");
  if (!token) return "Unauthorized";
  try {
    const res = await fetch(`${BASE_URL}api/auth/getUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.user) return data.user;
    return data;
  } catch (err) {
    console.log(err);
  }
}
