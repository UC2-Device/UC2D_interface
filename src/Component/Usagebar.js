
const UsageBar = ({ used, total }) => {
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <div className="">
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
  );
};

export default UsageBar;