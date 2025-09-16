import * as Yup from "yup"

export let RegisterVal = Yup.object().shape({
    userName : Yup.string().required("Name is required / முழுப்பெயர் கட்டாயம்"),
    emailId : Yup.string().email().required("Email is required / மின்னஞ்சல் கட்டாயம்").matches(/^[a-z0-9].+@[a-z]{3,5}.[a-z]{3,4}$/, "Enter Valid Email Id"),
    userMobileNumber :Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit number / சரியான 10 இலக்க எண் உள்ளிடவும்").required("Mobile number is required / கைபேசி எண் கட்டாயம்"),
    password : Yup.string().min(6,"Password must be at least 6 characters / கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்").required("Password is required / கடவுச்சொல் கட்டாயம்").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,"Password is invalid. It must contain uppercase, lowercase, number, special char, and be at least 6 chars long"),
    confirmPassword : Yup.string().oneOf([Yup.ref("password"),null],"Passwords must match / கடவுச்சொற்கள் ஒன்றாக இருக்க வேண்டும்").required("Confirm Password is required / கடவுச்சொல்லை உறுதிப்படுத்துதல் கட்டாயம்")
})