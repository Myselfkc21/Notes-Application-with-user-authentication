const Toast = ({ type }) => {
  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-4 px-8 py-5 rounded-2xl shadow-2xl bg-gradient-to-r from-white ${
        type === "success" ? "to-green-50" : "to-red-50"
      } border-l-4 ${
        type === "success" ? "border-green-500" : "border-red-500"
      } transform transition-all duration-300 hover:scale-105 ${
        type === "success" ? "hover:shadow-green-100" : "hover:shadow-red-100"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          type === "success" ? "bg-green-100" : "bg-red-100"
        } shadow-inner`}
      >
        {type === "success" ? (
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 text-lg">
          {type === "success" ? "Success!" : "Deleted!"}
        </h3>
        <p className="text-sm text-gray-600">
          {type === "success"
            ? "Note has been saved successfully"
            : "Note has been deleted successfully"}
        </p>
      </div>

      <button
        className="ml-auto text-gray-400 hover:text-gray-500 hover:rotate-90 transition-transform duration-200"
        onClick={() => {}}
      >
        <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
