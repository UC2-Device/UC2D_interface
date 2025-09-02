import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScannerModal({ onClose, onScan }) {
  const [scanResult, setScanResult] = useState(null);

  const handleResult = (result, error) => {
    if (!!result) {
      const text = result?.text || "";
      setScanResult(text);
      console.log("Scanned QR:", text);
      onScan(text);
      onClose(); // auto-close after scan
    }
    if (!!error) {
      console.error("QR Scan Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h3 className="text-lg font-medium text-center text-gray-900 mb-4">
          Scan Device QR Code
        </h3>

        <div className="overflow-hidden rounded-lg">
          <QrReader
            constraints={{ facingMode: "environment" }} // use back camera
            onResult={handleResult}
            style={{ width: "100%" }}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Cancel Scan
        </button>

        {scanResult && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            ✅ Scanned: {scanResult}
          </p>
        )}
      </div>
    </div>
  );
}
