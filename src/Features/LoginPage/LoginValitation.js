
import * as Yup from "yup"

export let LoginValidation = Yup.object().shape({
      emailOrPhone: Yup.string()
    .required("Email or Phone Number is required / மின்னஞ்சல் அல்லது கைபேசி எண் கட்டாயம்")
    .test(
      "email-or-phone",
      "Enter a valid email (e.g. user@example.com) or 10-digit phone number",
      function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),

   password: Yup.string().required("Password is required / கடவுச்சொல் கட்டாயம்").min(6,"Enter Valid Password")
})
