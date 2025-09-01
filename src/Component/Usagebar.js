import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const UsageBar = ({ used, total }) => {
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress Bar Section */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Area Covered</span>
          <span className="text-sm font-bold text-gray-800">{used} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Link Section */}
      <div className="pt-4 border-t border-gray-200">
        <Link 
          to="/dashboard" // Make sure this route exists in your app's router
          className="group flex items-center justify-end text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          View Monthly Analytics
          <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default UsageBar;