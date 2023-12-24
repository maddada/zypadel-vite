import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";

const PhoneNumberLogin = () => {
    const [loading, setLoading] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const [mobile, setMobile] = useState("");
    const [showOTPScreen, setShowOTPScreen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            mobile: "",
        },
        resolver: yupResolver(phoneLoginSchema), //Optional, using yup for setting up the schema for required fields
    });

    const auth = getAuth();

    useEffect(() => {
        setUpRecaptcha();
    }, []);

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible", // this property is important otherwise the captcha will be displayed on the screen
            },
            auth
        );

        window.recaptchaVerifier.verify();
    };

    const onSignInSubmit = async (data) => {
        setLoading(true);
        const mobile = `+${data.mobile}`;
        setMobile(mobile);
        const appVerifier = await window.recaptchaVerifier;
        try {
            setLoading(false);
            const response = await signInWithPhoneNumber(auth, mobile, appVerifier);
            setConfirmObj(response);
            setShowOTPScreen(true);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const verifyOTP = async (data) => {
        try {
            const res = await confirmObj.confirm(data.otp);
            reset({ otp: "" });
            toast.success("OTP verified successfully");
            router.push("/dashboard");
        } catch (e) {
            toast.error("Please check the OTP and try again");
        }
    };

    return (
        <>
            <div id="recaptcha-container"></div>
            {!showOTPScreen ? (
                <Form className="auxoForm" onSubmit={handleMobileSubmit(onSignInSubmit)}>
                    <h1 className="text-center heading fs-3 mb-3">
                        <b>Login</b>
                    </h1>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-weight-bold light">Mobile number</Form.Label>
                        <Controller name="mobile" autoFocus control={control} render={({ field: { onChange, value } }) => <PhoneInput disableDropdown={true} countryCodeEditable={false} country="in" value={value} prefix="+" onChange={onChange} id="mobile" name="mobile" />} />
                        {errors.mobile && (
                            <p style={{ display: "block" }} className="invalid-feedback">
                                {errors.mobile?.message}
                            </p>
                        )}
                    </Form.Group>

                    <button id="login-btn" className="btn_primary w-100" disabled={loading} type="submit">
                        {loading ? (
                            <>
                                <span>Sending OTP...</span>
                                <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border" />
                            </>
                        ) : (
                            "Login with OTP"
                        )}
                    </button>
                </Form>
            ) : (
                <Form className="auxoForm" onSubmit={handleSubmit(verifyOTP)}>
                    <h1 className="text-center heading fs-3 mb-3">
                        <b>Enter OTP to verify</b>
                    </h1>
                    <p className="text-center light fs-5 mb-5">
                        We have sent the OTP to you on {mobile}
                        <a className="anchor" onClick={() => setShowOTPScreen(false)}>
                            Change
                        </a>
                    </p>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-weight-bold light">OTP</Form.Label>

                        <Form.Control type="text" autoFocus {...otpRegister("otp")} />
                        <Form.Control.Feedback type="invalid">{otpError.otp?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <button className="btn_primary w-100" disabled={loading} type="submit">
                        {loading ? (
                            <>
                                <span>Sending OTP...</span>
                                <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border" />
                            </>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>
                    <div className="text-right">
                        <button className="btn_link mt-4">Resend OTP</button>
                    </div>
                </Form>
            )}
        </>
    );
};

export default PhoneNumberLogin;
