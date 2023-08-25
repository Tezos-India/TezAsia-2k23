import React , { useRef ,useState} from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha"
const ContactForm: React.FC = () => {
  const form = useRef();
  const recaptchaRef = useRef();
  const [done, setDone] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const closeModal = () => {
    setShowPopup(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setShowPopup(true)
      return;
    }
    emailjs
      .sendForm(
        "service_ik1p9er",
        "template_w4ethig",
        form.current,
        "MD7CiurlUoyOHPDTL"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true)
          form.current.reset();
          setIsCaptchaVerified(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    
    {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <span className="sr-only">Close modal</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Please complete the CAPTCHA
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, Sure
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl p-8 glowingCard ">
      <form ref={form} onSubmit={sendEmail} >
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Name *</label>
          <input
          type="text" name="user_name" placeholder="Name" required
            className=" user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Email *</label>
          <input
           type="email" name="user_email"  placeholder="Email" required
            className="user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Subject *</label>
          <input
           type="text" name="user_subject"  placeholder="name" required
            className="user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Message *</label>
          <textarea
            rows={2} required
            className="user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
            name="message"  placeholder="Message"
          ></textarea>
        </div>
         <div className="mb-4">
         <ReCAPTCHA
  ref={recaptchaRef}
  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
  onChange={() => setIsCaptchaVerified(true)}
/>
</div>
        <button
         type="submit" value="Send" 
          className="button bg-gradient-to-br from-pink-600 to-purple-700 text-white py-2 px-4 rounded-md hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-md"
        >
          Send
        </button>
       
      </form>
      {done && <span className="mb-8 flex items-center justify-center text-xl text-gray-400 pt-6" >Thanks for contacting Us</span>}
      
    </div>
    </>
  );
};

export default ContactForm;


