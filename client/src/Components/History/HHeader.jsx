import { IoMdCloudDownload } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import './HHeader.css';

const HHeader = ({ downloadPDF, retrived }) => {
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalSent, setTotalSent] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Calculate totals for deposits and sent transactions
                const depositTotal = data
                    .filter(transaction => transaction.type === 'deposit')
                    .reduce((sum, transaction) => sum + transaction.amount, 0);

                const sentTotal = data
                    .filter(transaction => transaction.type === 'send')
                    .reduce((sum, transaction) => sum + transaction.amount, 0);

                // Update state with totals
                setTotalDeposit(depositTotal);
                setTotalSent(sentTotal);

                // Pass the updated totals to parent component
                retrived(depositTotal, sentTotal);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTransactions();
    }, [token, retrived]); // Don't need totalDeposit/totalSent as dependencies here

    return (
        <section className="main-header d-flex align-items-center justify-content-between p-3 my-2 bg-light rounded">
            <p className="transaction-time text-muted mb-0">All Transactions - All Time</p>
            
            <div className="transaction-info d-none d-md-flex align-items-center gap-3">
                <div className="transaction-item d-flex align-items-center gap-2 p-2">
                    <div className="indicator deposit bg-success"></div>
                    <span className="text-muted">Deposit</span>
                    <h6 className="mb-0">${totalDeposit.toLocaleString()}</h6>
                </div>
                <div className="transaction-item d-flex align-items-center gap-2 p-2">
                    <div className="indicator sent bg-primary"></div>
                    <span className="text-muted">Sent</span>
                    <h6 className="mb-0">${totalSent.toLocaleString()}</h6>
                </div>
            </div>
            
            <div className="action-icons d-flex align-items-center gap-2">
                <IoMdCloudDownload size={32} className="icon p-2 rounded bg-light text-primary" onClick={downloadPDF} />
                <IoFilterSharp size={32} className="icon p-2 rounded bg-light text-primary" />
            </div>
        </section>
    );
}

export default HHeader;
