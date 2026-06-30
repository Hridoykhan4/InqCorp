import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { addUser } from '../Redux/hvac'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faLock,
    faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'

// Register Not Available — admin-only portal

export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleForm = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) return

        setLoading(true)
        setError('')

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/login`,
                { email: formData.email, password: formData.password }
            )

            if (res.status === 200) {
                dispatch(addUser(res.data.user))
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome to the Admin Portal.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                })
                navigate('/')
            }
        } catch (err) {
            const msg =
                err?.response?.data?.message || 'Invalid credentials. Please try again.'
            setError(msg)
            setFormData((prev) => ({ ...prev, password: '' }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden font-sans">

            {/* ─── LEFT PANEL ─── */}
            <div
                className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden lg:flex"
                style={{ background: '#0a1628' }}
            >
                {/* Decorative gold rings */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        width: 420,
                        height: 420,
                        border: '2px solid rgba(196,155,43,0.18)',
                    }}
                />
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        width: 320,
                        height: 320,
                        border: '1.5px solid rgba(196,155,43,0.28)',
                    }}
                />
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        width: 220,
                        height: 220,
                        background:
                            'radial-gradient(circle, rgba(196,155,43,0.12) 0%, transparent 70%)',
                    }}
                />

                {/* Corner accents */}
                <div
                    className="pointer-events-none absolute left-0 top-0 h-40 w-40"
                    style={{
                        background:
                            'radial-gradient(circle at top left, rgba(196,155,43,0.10) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 right-0 h-40 w-40"
                    style={{
                        background:
                            'radial-gradient(circle at bottom right, rgba(27,58,138,0.4) 0%, transparent 70%)',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-5 px-10 text-center">
                    {/* Logo with glow ring */}
                    <div
                        className="mb-1 flex h-32 w-32 items-center justify-center rounded-full p-1 shadow-2xl"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(196,155,43,0.35) 0%, rgba(27,58,138,0.5) 100%)',
                            boxShadow:
                                '0 0 0 6px rgba(196,155,43,0.15), 0 20px 60px rgba(0,0,0,0.5)',
                        }}
                    >
                        <img
                            src="/inqcorpLogo.jpeg"
                            alt="Inqilab Trading Corporation"
                            className="h-28 w-28 rounded-full object-cover"
                        />
                    </div>

                    {/* Company name */}
                    <div>
                        <h1
                            className="text-4xl font-extrabold tracking-tight text-white"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Kawsar Anher
                        </h1>
                        <p
                            className="mt-1 text-sm font-semibold uppercase tracking-widest"
                            style={{ color: '#C49B2B' }}
                        >
                            Build with Strength
                        </p>
                    </div>

                    {/* Divider */}
                    <div
                        className="my-1 h-px w-32"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(196,155,43,0.6), transparent)',
                        }}
                    />

                    {/* Quote */}
                    <div
                        className="max-w-xs rounded-2xl px-6 py-4"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(196,155,43,0.2)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faShieldHalved}
                            className="mb-2 text-xl"
                            style={{ color: '#C49B2B' }}
                        />
                        <p className="text-sm font-medium leading-relaxed text-white/70">
                            Secure Admin Portal
                        </p>
                        <p className="mt-0.5 text-xs text-white/40">
                            Inqilab Trading Corporation
                        </p>
                    </div>
                </div>

                {/* Bottom wordmark */}
                <p
                    className="absolute bottom-6 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20"
                >
                    Chattogram, Bangladesh
                </p>
            </div>

            {/* ─── RIGHT PANEL ─── */}
            <div className="flex w-full flex-col items-center justify-center bg-white px-6 lg:w-1/2">

                {/* Mobile logo */}
                <div className="mb-6 flex flex-col items-center lg:hidden">
                    <img
                        src="/inqcorpLogo.jpeg"
                        alt="Logo"
                        className="mb-2 h-16 w-16 rounded-full object-cover shadow"
                    />
                    <p
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: '#1B3A8A' }}
                    >
                        Kawsar Anher
                    </p>
                </div>

                {/* Card */}
                <div
                    className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10"
                    style={{
                        boxShadow:
                            '0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 50px -10px rgba(27,58,138,0.12)',
                        border: '1px solid rgba(27,58,138,0.08)',
                    }}
                >
                    {/* Heading */}
                    <div className="mb-8">
                        <h2
                            className="text-3xl font-extrabold"
                            style={{ color: '#1B3A8A' }}
                        >
                            Welcome Back
                        </h2>
                        <p className="mt-1 text-sm text-gray-400 font-medium">
                            Admin Portal — sign in to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-xs font-bold uppercase tracking-widest text-gray-500"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <span
                                    className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
                                    style={{ color: '#1B3A8A' }}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleForm}
                                    required
                                    placeholder="admin@inqilab.com"
                                    className="w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-300 outline-none transition-all"
                                    style={{
                                        background: '#F7F8FB',
                                        border: '1.5px solid #E5E9F2',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.border = '1.5px solid #1B3A8A'
                                        e.target.style.boxShadow =
                                            '0 0 0 3px rgba(27,58,138,0.08)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = '1.5px solid #E5E9F2'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="password"
                                className="text-xs font-bold uppercase tracking-widest text-gray-500"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span
                                    className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
                                    style={{ color: '#1B3A8A' }}
                                >
                                    <FontAwesomeIcon icon={faLock} className="text-sm" />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleForm}
                                    required
                                    placeholder="••••••••••"
                                    className="w-full rounded-xl py-3 pl-11 pr-12 text-sm font-medium text-gray-800 placeholder-gray-300 outline-none transition-all"
                                    style={{
                                        background: '#F7F8FB',
                                        border: '1.5px solid #E5E9F2',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.border = '1.5px solid #1B3A8A'
                                        e.target.style.boxShadow =
                                            '0 0 0 3px rgba(27,58,138,0.08)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = '1.5px solid #E5E9F2'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 transition hover:text-gray-600"
                                    tabIndex={-1}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="text-sm"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                                style={{
                                    background: 'rgba(220,38,38,0.06)',
                                    border: '1px solid rgba(220,38,38,0.18)',
                                    color: '#dc2626',
                                }}
                            >
                                <span className="mt-0.5 shrink-0">⚠</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!formData.email || !formData.password || loading}
                            className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
                            style={{ background: 'linear-gradient(135deg, #1B3A8A 0%, #152d6e 100%)' }}
                            onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled)
                                    e.currentTarget.style.background =
                                        'linear-gradient(135deg, #C49B2B 0%, #a87e1f 100%)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    'linear-gradient(135deg, #1B3A8A 0%, #152d6e 100%)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="h-4 w-4 animate-spin text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    <span>Signing In…</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </form>

                    {/* Footer note */}
                    <p className="mt-6 text-center text-xs text-gray-300">
                        Register Not Available — Admin access only
                    </p>
                </div>

                {/* Bottom brand */}
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-300">
                    © 2025 Inqilab Trading Corporation
                </p>
            </div>
        </div>
    )
}
