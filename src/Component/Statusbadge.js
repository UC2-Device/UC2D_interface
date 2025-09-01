
const StatusBadge = ({ status }) => {
  const isOnline = status?.toLowerCase() === 'online';

  const baseClasses = "px-3 py-1 text-sm font-medium rounded-full inline-block";
  const statusClasses = isOnline
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;