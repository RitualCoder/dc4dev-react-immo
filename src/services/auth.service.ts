interface Credential {
  email: string;
  password: string;
}

const signin = async (credential: Credential) => {
  const response = await fetch("http://localhost:8000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });

  const { access_token } = await response.json();
  console.log("signin access_token : ", access_token);
  localStorage.setItem("access_token", JSON.stringify(access_token));
};

/* utm */
// Signup function
const signup = async (credential: Credential) => {
  const response = await fetch("http://localhost:8000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
  return await response.json();
};

const AuthService = {
  signin,
  signup,
};

export default AuthService;
