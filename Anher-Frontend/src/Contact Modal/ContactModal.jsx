import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { socket } from '../Socket/socket';

export const ContactModal = ({ selected }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            Swal.fire({
                icon: "error",
                title: "Missing Information",
                text: "Please fill in all required fields"
            });
            return;
        }

        const formData = new FormData();
        formData.append('Info', JSON.stringify({
            name,
            email,
            message,
            catalogueName: selected?.name || 'Catalogue Request'
        }));

        setLoading(true);

        socket.emit('sendContact', formData, (response) => {
            if (response.status === 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your request has been sent successfully"
                });
                setName('');
                setEmail('');
                setMessage('');
                document.getElementById('ContactModal').checked = false;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.message || "Error sending request"
                });
            }
            setLoading(false);
        });
    };

    const handleClose = () => {
        document.getElementById('ContactModal').checked = false;
        setName('');
        setEmail('');
        setMessage('');
        setLoading(false);
    };

    return (
        <div>
            <input type="checkbox" id="ContactModal" className="modal-toggle hidden" />

            <div className="modal">
                <div className="modal-box md:max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
                    <div
                        onClick={handleClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-red-100"
                    >
                        ✕
                    </div>

                    <section className='space-y-6 pt-4'>
                        <div className='space-y-2 pb-4 border-b border-blue-100'>
                            <h3 className='text-2xl font-bold text-[#0062f5]'>
                                Contact for Catalogue
                            </h3>
                            <p className='text-gray-600 text-sm'>
                                Please provide your details to request the catalogue: <strong>{selected?.name}</strong>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Your Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full px-4 py-3 border-2 border-blue-200 rounded-lg font-medium focus:outline-none focus:border-[#0062f5] focus:ring-2 focus:ring-blue-200 transition-all'
                                    placeholder='Enter your name'
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Email Address <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-4 py-3 border-2 border-blue-200 rounded-lg font-medium focus:outline-none focus:border-[#0062f5] focus:ring-2 focus:ring-blue-200 transition-all'
                                    placeholder='Enter your email'
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Message <span className='text-gray-500'>(Optional)</span>
                                </label>
                                <textarea
                                    placeholder="Tell us more about your requirements..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-3 font-medium border-2 border-blue-200 rounded-lg focus:outline-none focus:border-[#0062f5] focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={(!name || !email || loading)}
                                className='w-full btn bg-[#0062f5] hover:bg-[#0052d4] text-white border-0 font-semibold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Request'
                                )}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};