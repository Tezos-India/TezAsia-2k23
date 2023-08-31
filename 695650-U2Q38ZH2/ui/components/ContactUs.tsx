import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<any>(null); // Added typing to ref for better type support.
  const [done, setDone] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const closeModal = () => {
    setShowPopup(false);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setShowPopup(true);
      return;
    }
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      form.current!,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    ).then((result) => {
        console.log(result.text);
        setDone(true);
        form.current!.reset();
        setIsCaptchaVerified(false);
    }).catch((error) => {
        console.log(error.text);
    });
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                Please complete the CAPTCHA
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="button w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl p-8 glowingCard">
        <form ref={form} onSubmit={sendEmail}>
          {['Name', 'Email', 'Subject', 'Message'].map((label, idx) => (
            <div className="mb-4" key={label}>
              <label className="block font-medium text-gray-700">{label} *</label>
              {label !== 'Message' ? (
                <input
                  type={label.toLowerCase()}
                  name={`user_${label.toLowerCase()}`}
                  placeholder={label}
                  required
                  className="user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <textarea
                  rows={2}
                  required
                  className="user w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
                  name="message"
                  placeholder={label}
                ></textarea>
              )}
            </div>
          ))}
          <div className="mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={() => setIsCaptchaVerified(true)}
            />
          </div>
          <button
            type="submit"
            value="Send"
            className="button w-full bg-gradient-to-br from-pink-600 to-purple-700 text-white py-2 px-4 rounded-md hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-md"
          >
            Send
          </button>
        </form>
        {done && (
          <span className="mb-8 flex items-center justify-center text-xl text-gray-400 pt-6">
            Thanks for contacting Us!
          </span>
        )}
      </div>
    </>
  );
};

export default ContactForm;
