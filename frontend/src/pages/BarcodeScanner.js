import React, { useState, useRef, useEffect } from 'react';
import { 
    FaBarcode, 
    FaCamera, 
    FaKeyboard, 
    FaHistory,
    FaSearch,
    FaPlus,
    FaMinus
} from 'react-icons/fa';
import Quagga from '@ericblade/quagga2'; 
import '../styles/BarcodeScanner.css';

const BarcodeScanner = () => {
    const [scanMode, setScanMode] = useState('manual'); 
    const [barcodeInput, setBarcodeInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanHistory, setScanHistory] = useState([
        {
            id: 1,
            barcode: '123456789012',
            productName: 'Laptop Dell XPS 13',
            timestamp: '2024-02-20T10:30:00',
            quantity: 1,
            action: 'check'
        },
    ]);
    const [scannedProduct, setScannedProduct] = useState(null);
    const videoRef = useRef(null);

    // Sample product database
    const productDatabase = {
        '123456789012': {
            name: 'Laptop Dell XPS 13',
            price: 1299.99,
            currentStock: 15,
            location: 'Warehouse A',
            category: 'Electronics'
        },
        // more products
    };

    useEffect(() => {
        return () => {
            if (isScanning) {
                Quagga.stop();
            }
        };
    }, [isScanning]);

    const startScanner = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: videoRef.current,
                    constraints: {
                        facingMode: "environment"
                    },
                },
                decoder: {
                    readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
                }
            }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
                setIsScanning(true);
            });

            Quagga.onDetected((result) => {
                handleBarcodeScan(result.codeResult.code);
            });
        }
    };

    const handleBarcodeScan = (barcode) => {
        const product = productDatabase[barcode];
        if (product) {
            setScannedProduct(product);
            addToScanHistory(barcode, product.name);
        } else {
            setScannedProduct({ error: 'Product not found' });
        }
    };

    const addToScanHistory = (barcode, productName) => {
        setScanHistory(prev => [{
            id: Date.now(),
            barcode,
            productName,
            timestamp: new Date().toISOString(),
            quantity: 1,
            action: 'check'
        }, ...prev]);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        handleBarcodeScan(barcodeInput);
        setBarcodeInput('');
    };

    const updateQuantity = (historyId, change) => {
        setScanHistory(prev => prev.map(item => 
            item.id === historyId 
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        ));
    };

    return (
        <div className="barcode-scanner-container">
            <div className="scanner-header">
                <h2>Barcode Scanner</h2>
                <div className="mode-toggle">
                    <button 
                        className={`mode-btn ${scanMode === 'manual' ? 'active' : ''}`}
                        onClick={() => setScanMode('manual')}
                    >
                        <FaKeyboard /> Manual Entry
                    </button>
                    <button 
                        className={`mode-btn ${scanMode === 'camera' ? 'active' : ''}`}
                        onClick={() => setScanMode('camera')}
                    >
                        <FaCamera /> Camera Scan
                    </button>
                </div>
            </div>

            <div className="scanner-content">
                <div className="scanner-main">
                    {scanMode === 'manual' ? (
                        <form onSubmit={handleManualSubmit} className="manual-entry">
                            <div className="input-group">
                                <div className="input-field">
                                <FaBarcode className="input-icon" />
                                    <input
                                        type="text"
                                        value={barcodeInput}
                                        onChange={(e) => setBarcodeInput(e.target.value)}
                                        placeholder="Enter barcode number..."
                                        pattern="[0-9]*"
                                    />
                                </div>
                                <button type="submit">
                                  <FaSearch /> Scan
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="camera-scanner">
                            <div ref={videoRef} className="video-container" />
                            <button 
                                className="start-scan-btn"
                                onClick={startScanner}
                                disabled={isScanning}
                            >
                                {isScanning ? 'Scanning...' : 'Start Scanner'}
                            </button>
                        </div>
                    )}

                    {scannedProduct && (
                        <div className={`scan-result ${scannedProduct.error ? 'error' : ''}`}>
                            {scannedProduct.error ? (
                                <p className="error-message">{scannedProduct.error}</p>
                            ) : (
                                <div className="product-info">
                                    <h3>{scannedProduct.name}</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>Price:</label>
                                            <span>${scannedProduct.price}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Stock:</label>
                                            <span>{scannedProduct.currentStock}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Location:</label>
                                            <span>{scannedProduct.location}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Category:</label>
                                            <span>{scannedProduct.category}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="scan-history">
                    <h3>
                        <FaHistory /> Scan History
                    </h3>
                    <div className="history-list">
                        {scanHistory.map(item => (
                            <div key={item.id} className="history-item">
                                <div className="item-info">
                                    <span className="barcode">{item.barcode}</span>
                                    <span className="product-name">{item.productName}</span>
                                    <span className="timestamp">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <div className="quantity-control">
                                    <button 
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="quantity-btn"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="quantity-btn"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarcodeScanner; 