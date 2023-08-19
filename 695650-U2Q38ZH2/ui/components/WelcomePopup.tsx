export default function WelcomePopup({
    avatarName,
    onClose,
  }: {
    avatarName: string;
    onClose: () => void;
  }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md ">
          <p className="text-black font-semibold text-lg">Welcome, {avatarName}!</p>
          <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-2 bg-purple-600 text-white text-lg font-sans rounded-full px-6 py-2 hover:bg-purple-700 flex justify-center"
          >
            Close
          </button>
          </div>
        </div>
      </div>
    );
  }