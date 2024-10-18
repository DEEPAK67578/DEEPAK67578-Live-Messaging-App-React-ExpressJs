import Signup from "../components/Signup";
import { json, redirect } from "react-router";
function SignupPage() {
  return (
    <div>
      <Signup></Signup>
    </div>
  );
}

export const SignupAction = async ({ request }) => {
  const formData = await request.formData();
  const response = await fetch("http://localhost:3000/signup", {
    method: request.method,
    body: formData,
  })
  console.log(response.status)
  if(response.status == 403 || response.status == 401) {
    const data = await response.json()
    return json(data)
  } else {
    return redirect("/login")
  }
};

export default SignupPage;
