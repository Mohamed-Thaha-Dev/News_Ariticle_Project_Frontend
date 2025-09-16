import * as Yup from "yup";

export const ResetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required / கடவுச்சொல் கட்டாயம்")
    .min(6, "Password must be at least 6 characters / கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்"),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match / கடவுச்சொற்கள் ஒன்றாக இருக்க வேண்டும்")
    .required("Confirm Password is required / கடவுச்சொல்லை உறுதிப்படுத்துதல் கட்டாயம்")
});
