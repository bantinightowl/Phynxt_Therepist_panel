// Real API functions to replace the dummy ones
// const getReferrals = async (userId) => {
//   const response = await fetch(`/api/users/${userId}/referrals`);
//   if (!response.ok) throw new Error('Failed to fetch referrals');
//   return response.json();
// };

// const sendReferral = async (referralData) => {
//   const response = await fetch('/api/referrals/send', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(referralData),
//   });
//   if (!response.ok) throw new Error('Failed to send referral');
//   return response.json();
// };

// const getReferralStats = async (userId) => {
//   const response = await fetch(`/api/users/${userId}/referral-stats`);
//   if (!response.ok) throw new Error('Failed to fetch referral stats');
//   return response.json();
// };

import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { 
  Copy, 
  Mail, 
  User, 
  Send, 
  CheckCircle, 
  Clock,
  XCircle,
  Share2,
  Users,
  Award,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Referral() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: 'Join me on this amazing platform!'
  });
  const navigate = useNavigate();

  // Dummy user data - would come from authentication in real app
  const user = {
    name: 'John Doe',
    referralCode: 'JOHNDOE25',
    referralCount: 5,
    credits: 75
  };

  // Check authentication
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Fetch user's referrals (dummy API call)
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const response = await dummyGetReferrals();
        setReferrals(response);
      } catch (error) {
        toast.error('Failed to load referrals');
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This would be an actual API call in production
      await dummySendReferral(formData);
      
      // Update local state optimistically
      setReferrals(prev => [
        {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          date: new Date().toISOString(),
          status: 'pending'
        },
        ...prev
      ]);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: 'Join me on this amazing platform!'
      });
      
      toast.success('Referral sent successfully!');
    } catch (error) {
      toast.error('Failed to send referral');
    } finally {
      setLoading(false);
    }
  };

  // Copy referral link to clipboard
  const copyReferralLink = () => {
    const link = `${window.location.origin}/signup?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Referral link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  // Share referral link (using Web Share API if available)
  const shareReferralLink = async () => {
    const shareData = {
      title: 'Join me!',
      text: `Hey! Join this platform using my referral code: ${user.referralCode}`,
      url: `${window.location.origin}/signup?ref=${user.referralCode}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        copyReferralLink();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  // Dummy API function to get referrals
  const dummyGetReferrals = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            date: '2023-10-15T14:30:00Z',
            status: 'accepted'
          },
          {
            id: 2,
            name: 'Bob Smith',
            email: 'bob@example.com',
            date: '2023-10-10T09:15:00Z',
            status: 'pending'
          },
          {
            id: 3,
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            date: '2023-10-05T16:45:00Z',
            status: 'expired'
          }
        ]);
      }, 800);
    });
  };

  // Dummy API function to send referral
  const dummySendReferral = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random failure for realism
        if (Math.random() > 0.2) {
          resolve({ success: true });
        } else {
          reject({ error: 'Failed to send referral' });
        }
      }, 1000);
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
      accepted: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Accepted' },
      expired: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Expired' }
    };

    const { icon: Icon, color, bg, label } = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>
        <Icon size={14} className="mr-1" />
        {label}
      </span>
    );
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar activePage="/referral" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header title="Referral Program" />
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#004B87] to-[#002B45] text-white p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold">Referral Program</h1>
              <p className="text-blue-100 mt-2">Invite friends and earn rewards together</p>
            </div>

            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              <div className="bg-gradient-to-br from-[#004B87] to-[#002B45] p-4 rounded-lg text-center text-white shadow-md">
                <div className="flex justify-center">
                  <Users className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold mt-2">{user.referralCount}</p>
                <p className="text-sm text-blue-100">Friends Referred</p>
              </div>
              <div className="bg-gradient-to-br from-[#009688] to-teal-800 p-4 rounded-lg text-center text-white shadow-md">
                <div className="flex justify-center">
                  <Award className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold mt-2">{user.credits}</p>
                <p className="text-sm text-teal-100">Credits Earned</p>
              </div>
              <div className="bg-gradient-to-br from-[#FFC107] to-amber-600 p-4 rounded-lg text-center text-white shadow-md">
                <div className="flex justify-center">
                  <DollarSign className="text-white" size={32} />
                </div>
                <p className="text-2xl font-bold mt-2">$25</p>
                <p className="text-sm text-amber-100">Credit per referral</p>
              </div>
            </div> */}

            {/* Referral Link Section */}
            <div className="p-6 border-t border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Referral Link</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow flex items-center p-3 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
                  <span className="truncate text-gray-700 font-medium">
                    {`${window.location.origin}/signup?ref=${user.referralCode}`}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={copyReferralLink}
                    className="flex items-center justify-center px-4 py-3 bg-[#004B87] text-white rounded-lg hover:bg-[#00315e] transition-colors shadow-md"
                  >
                    <Copy size={18} className="mr-2" />
                    Copy
                  </button>
                  <button
                    onClick={shareReferralLink}
                    className="flex items-center justify-center px-4 py-3 bg-[#009688] text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                  >
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Referral History */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Referral History</h2>
              
              {loading && referrals.length === 0 ? (
                <div className="text-center py-8">
                  <div className="flex justify-center">
                    <TailSpin
                      visible={true}
                      height="40"
                      width="40"
                      color="#004B87"
                      ariaLabel="tail-spin-loading"
                    />
                  </div>
                  <p className="mt-2 text-gray-600">Loading referrals...</p>
                </div>
              ) : referrals.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-100 rounded-lg">
                  <Users size={48} className="mx-auto text-gray-400" />
                  <p className="mt-4 text-lg">You haven't referred anyone yet.</p>
                  <p className="text-gray-600">Share your referral link to get started!</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#004B87]">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referrals.map((referral) => (
                        <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {referral.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {referral.email}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {new Date(referral.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <StatusBadge status={referral.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Program Rules */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-b-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">How It Works</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#004B87] flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <p className="text-gray-700">Share your unique referral link with friends</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#004B87] flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <p className="text-gray-700">When they sign up using your link, you'll both receive rewards</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#004B87] flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <p className="text-gray-700">You earn $25 in credits for each successful referral</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#004B87] flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                    4
                  </div>
                  <p className="text-gray-700">Referral must make a qualifying purchase to trigger the reward</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#004B87] flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                    5
                  </div>
                  <p className="text-gray-700">There's no limit to how many friends you can refer</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Referral;