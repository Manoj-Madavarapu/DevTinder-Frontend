import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! Something went Wrong
        </p>
        <Link
          to="/devTinder/Profile"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
