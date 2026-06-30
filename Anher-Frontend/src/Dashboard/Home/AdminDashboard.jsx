import React, { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { useOutletContext } from 'react-router'
import { useSelector } from 'react-redux'
import { capitalizeWords } from '../../Functions/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBoxesStacked,
    faLayerGroup,
    faPhotoFilm,
    faMessage,
    faUserShield,
    faTruck,
    faBangladeshiTakaSign,
    faShoppingCart,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend)

// ─── Colour tokens ───────────────────────────────────────────────────────────
const NAVY  = '#1B3A8A'
const GOLD  = '#C49B2B'
const NAVY_DARK = '#0F2257'

// ─── Mock price list ─────────────────────────────────────────────────────────
const PRICE_LIST = [
    { name: 'Fine Sand',         size: '< 2 mm',    price: 65,  emoji: '🟡' },
    { name: 'Medium Sand',       size: '2 – 4 mm',  price: 60,  emoji: '🟤' },
    { name: 'Coarse Sand',       size: '4 – 6 mm',  price: 55,  emoji: '🟠' },
    { name: 'Stone Chips',       size: '5 – 10 mm', price: 85,  emoji: '⚪' },
    { name: 'Stone Chips',       size: '10 – 20 mm',price: 95,  emoji: '🔵' },
    { name: 'Boulder',           size: '> 50 mm',   price: 120, emoji: '⬛' },
]

// ─── Mock recent orders ───────────────────────────────────────────────────────
const RECENT_ORDERS = [
    { id: '#ORD-1042', customer: 'Rahman Builders',    product: 'Stone Chips 10-20mm', qty: '120 CFT', status: 'Delivered' },
    { id: '#ORD-1041', customer: 'Skyline Constructions', product: 'Fine Sand',        qty: '85 CFT',  status: 'Processing' },
    { id: '#ORD-1040', customer: 'Hassan & Co.',        product: 'Coarse Sand',        qty: '200 CFT', status: 'Delivered' },
    { id: '#ORD-1039', customer: 'Metro Infra Ltd.',    product: 'Boulder',            qty: '60 CFT',  status: 'Pending' },
    { id: '#ORD-1038', customer: 'Green Valley Homes',  product: 'Medium Sand',        qty: '150 CFT', status: 'Delivered' },
]

const STATUS_STYLES = {
    Delivered:  { bg: 'rgba(16,185,129,0.1)',  color: '#059669', dot: '#10b981' },
    Processing: { bg: 'rgba(245,158,11,0.1)',  color: '#d97706', dot: '#f59e0b' },
    Pending:    { bg: 'rgba(239,68,68,0.08)',   color: '#dc2626', dot: '#ef4444' },
}

// ─── Weekly mock sales data ───────────────────────────────────────────────────
const WEEKLY_LABELS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKLY_SALES   = [32400, 41200, 28700, 55800, 48100, 62300, 17100]
const WEEKLY_ORDERS  = [8,     11,    7,     15,    13,    18,    5    ]

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, badge, badgeColor = '#10b981', iconBg, iconColor }) => (
    <div
        className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        style={{ border: '1px solid rgba(27,58,138,0.08)' }}
    >
        <div className="flex items-start justify-between">
            <span
                className="grid h-11 w-11 place-items-center rounded-xl text-base shadow-sm"
                style={{ background: iconBg, color: iconColor }}
            >
                <FontAwesomeIcon icon={icon} />
            </span>
            {badge && (
                <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{ background: `${badgeColor}18`, color: badgeColor }}
                >
                    {badge}
                </span>
            )}
        </div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                {label}
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-gray-800 sm:text-3xl">
                {value}
            </p>
        </div>
    </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const { products, categories, queries } = useOutletContext()
    const admin = useSelector((state) => state.hvac.users)

    // Derive category distribution from real data
    const categoryCounts = useMemo(() => {
        const map = new Map()
        ;(categories || []).forEach((c) => map.set(c.name, 0))
        ;(products || []).forEach((p) => {
            if (map.has(p.category)) map.set(p.category, map.get(p.category) + 1)
        })
        return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
    }, [products, categories])

    // Bar chart — weekly sales in navy / gold alternating
    const salesBarData = {
        labels: WEEKLY_LABELS,
        datasets: [
            {
                label: 'Sales (৳)',
                data: WEEKLY_SALES,
                backgroundColor: WEEKLY_LABELS.map((_, i) =>
                    i % 2 === 0 ? NAVY : GOLD
                ),
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    }

    const salesBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` ৳${ctx.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: '600' }, color: '#6b7280' },
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.04)' },
                ticks: {
                    font: { size: 10 },
                    color: '#9ca3af',
                    callback: (v) => `৳${(v / 1000).toFixed(0)}k`,
                },
            },
        },
    }

    // Doughnut — category distribution
    const palette = ['#1B3A8A', '#C49B2B', '#0ea5e9', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#84cc16']
    const doughnutData = {
        labels: categoryCounts.map((c) => capitalizeWords(c.name)),
        datasets: [{
            data: categoryCounts.map((c) => c.count),
            backgroundColor: categoryCounts.map((_, i) => palette[i % palette.length]),
            borderWidth: 2,
            borderColor: '#ffffff',
        }],
    }

    return (
        <div className="space-y-5 p-2 sm:p-4">

            {/* ── Welcome banner ── */}
            <div
                className="flex flex-col gap-2 rounded-2xl p-5 text-white shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
                style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)` }}
            >
                <div className="flex items-center gap-4">
                    <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl shadow"
                        style={{ background: 'rgba(196,155,43,0.25)' }}
                    >
                        <FontAwesomeIcon icon={faUserShield} className="text-lg" style={{ color: GOLD }} />
                    </span>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                            Welcome back
                        </p>
                        <h1 className="text-xl font-extrabold leading-tight sm:text-2xl">
                            {admin?.name ? capitalizeWords(admin.name) : 'Admin'}
                        </h1>
                        <p className="text-xs text-white/60">
                            {admin?.role === 'admin' ? 'Administrator' : 'Sub Admin'}
                            {admin?.employee_id ? ` · ID ${admin.employee_id}` : ''}
                        </p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    <div
                        className="rounded-xl px-4 py-2.5 text-right"
                        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
                    >
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">Today</p>
                        <p className="mt-0.5 text-sm font-extrabold text-white">
                            {new Date().toLocaleDateString('en-GB', {
                                weekday: 'long', month: 'short', day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <StatCard
                    icon={faShoppingCart}
                    label="Total Orders"
                    value={queries?.length ?? 128}
                    badge="+12% today"
                    badgeColor="#10b981"
                    iconBg="rgba(27,58,138,0.10)"
                    iconColor={NAVY}
                />
                <StatCard
                    icon={faBangladeshiTakaSign}
                    label="Total Sales"
                    value="৳2,85,700"
                    badge="+18%"
                    badgeColor="#10b981"
                    iconBg="rgba(196,155,43,0.12)"
                    iconColor={GOLD}
                />
                <StatCard
                    icon={faTruck}
                    label="Deliveries Today"
                    value="14"
                    badge="+2"
                    badgeColor="#0ea5e9"
                    iconBg="rgba(14,165,233,0.10)"
                    iconColor="#0ea5e9"
                />
                <StatCard
                    icon={faUsers}
                    label="Total Customers"
                    value="256"
                    badge="+8%"
                    badgeColor="#8b5cf6"
                    iconBg="rgba(139,92,246,0.10)"
                    iconColor="#8b5cf6"
                />
            </div>

            {/* ── Charts row ── */}
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">

                {/* Sales Overview bar chart */}
                <div
                    className="rounded-2xl bg-white p-5 shadow-sm"
                    style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                                Analytics
                            </p>
                            <h3 className="mt-0.5 text-base font-extrabold text-gray-800">
                                Sales Overview
                            </h3>
                        </div>
                        <span
                            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                            style={{ background: NAVY }}
                        >
                            This Week
                        </span>
                    </div>

                    {/* Summary pills */}
                    <div className="mb-4 flex gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: NAVY }} />
                            Mon / Wed / Fri / Sun
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD }} />
                            Tue / Thu / Sat
                        </div>
                    </div>

                    <div className="h-56 sm:h-64">
                        <Bar data={salesBarData} options={salesBarOptions} />
                    </div>
                </div>

                {/* Category doughnut */}
                <div
                    className="rounded-2xl bg-white p-5 shadow-sm"
                    style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                        Distribution
                    </p>
                    <h3 className="mt-0.5 mb-4 text-base font-extrabold text-gray-800">
                        Categories
                    </h3>
                    <div className="grid h-52 place-items-center sm:h-60">
                        {categoryCounts.length > 0 ? (
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    cutout: '65%',
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: { font: { size: 10 }, boxWidth: 10, padding: 8 },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-center text-sm text-gray-400">
                                Add categories to see distribution.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Products + Price List row ── */}
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">

                {/* Products grid */}
                <div
                    className="rounded-2xl bg-white p-5 shadow-sm"
                    style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                                Inventory
                            </p>
                            <h3 className="mt-0.5 text-base font-extrabold text-gray-800">
                                Products
                                <span
                                    className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                                    style={{ background: NAVY }}
                                >
                                    {products?.length ?? 0}
                                </span>
                            </h3>
                        </div>
                        <FontAwesomeIcon icon={faBoxesStacked} style={{ color: NAVY, opacity: 0.4 }} />
                    </div>

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {products.slice(0, 6).map((product, i) => (
                                <div
                                    key={product._id || i}
                                    className="group relative overflow-hidden rounded-xl"
                                    style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                                >
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-20 w-full object-cover transition group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="grid h-20 w-full place-items-center text-2xl"
                                            style={{ background: 'rgba(27,58,138,0.04)' }}
                                        >
                                            🪨
                                        </div>
                                    )}
                                    <div className="p-1.5">
                                        <p className="truncate text-[10px] font-bold text-gray-700">
                                            {capitalizeWords(product.name || '')}
                                        </p>
                                        {product.category && (
                                            <p className="truncate text-[9px] text-gray-400">
                                                {capitalizeWords(product.category)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid h-40 place-items-center rounded-xl" style={{ background: 'rgba(27,58,138,0.03)' }}>
                            <div className="text-center">
                                <p className="text-3xl">🪨</p>
                                <p className="mt-1 text-sm text-gray-400">No products yet.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Price list table */}
                <div
                    className="rounded-2xl bg-white p-5 shadow-sm"
                    style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                                Pricing
                            </p>
                            <h3 className="mt-0.5 text-base font-extrabold text-gray-800">
                                Today's Price List
                            </h3>
                        </div>
                        <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                            style={{ background: 'rgba(196,155,43,0.12)', color: '#a07a1a' }}
                        >
                            Per CFT
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(27,58,138,0.08)' }}>
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr style={{ background: `linear-gradient(90deg, ${NAVY_DARK}, ${NAVY})` }}>
                                    <th className="px-3 py-2.5 font-bold uppercase tracking-wide text-white/80">Product</th>
                                    <th className="px-3 py-2.5 font-bold uppercase tracking-wide text-white/80">Size</th>
                                    <th className="px-3 py-2.5 text-right font-bold uppercase tracking-wide text-white/80">৳/CFT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PRICE_LIST.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="transition-colors hover:bg-blue-50/40"
                                        style={{
                                            borderBottom: i < PRICE_LIST.length - 1
                                                ? '1px solid rgba(27,58,138,0.06)'
                                                : 'none',
                                            background: i % 2 === 0 ? '#fff' : 'rgba(27,58,138,0.02)',
                                        }}
                                    >
                                        <td className="px-3 py-2.5 font-semibold text-gray-700">
                                            <span className="mr-1.5">{row.emoji}</span>
                                            {row.name}
                                        </td>
                                        <td className="px-3 py-2.5 text-gray-400">{row.size}</td>
                                        <td className="px-3 py-2.5 text-right">
                                            <span
                                                className="rounded-lg px-2 py-0.5 font-extrabold"
                                                style={{ color: NAVY, background: 'rgba(27,58,138,0.07)' }}
                                            >
                                                ৳{row.price}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── Recent Orders ── */}
            <div
                className="rounded-2xl bg-white p-5 shadow-sm"
                style={{ border: '1px solid rgba(27,58,138,0.08)' }}
            >
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                            Activity
                        </p>
                        <h3 className="mt-0.5 text-base font-extrabold text-gray-800">
                            Recent Orders
                        </h3>
                    </div>
                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: NAVY, opacity: 0.35 }} />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-xs">
                        <thead>
                            <tr
                                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                                style={{ borderBottom: `2px solid ${NAVY}18` }}
                            >
                                <th className="pb-2.5 text-gray-400">Order ID</th>
                                <th className="pb-2.5 text-gray-400">Customer</th>
                                <th className="pb-2.5 text-gray-400">Product</th>
                                <th className="pb-2.5 text-gray-400">Qty</th>
                                <th className="pb-2.5 text-right text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_ORDERS.map((order, i) => {
                                const s = STATUS_STYLES[order.status] || STATUS_STYLES.Pending
                                return (
                                    <tr
                                        key={i}
                                        className="transition-colors hover:bg-blue-50/30"
                                        style={{ borderBottom: '1px solid rgba(27,58,138,0.05)' }}
                                    >
                                        <td className="py-3 pr-3 font-bold" style={{ color: NAVY }}>
                                            {order.id}
                                        </td>
                                        <td className="py-3 pr-3 font-semibold text-gray-700">
                                            {order.customer}
                                        </td>
                                        <td className="py-3 pr-3 text-gray-500">
                                            {order.product}
                                        </td>
                                        <td className="py-3 pr-3 font-semibold text-gray-600">
                                            {order.qty}
                                        </td>
                                        <td className="py-3 text-right">
                                            <span
                                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold"
                                                style={{ background: s.bg, color: s.color }}
                                            >
                                                <span
                                                    className="h-1.5 w-1.5 rounded-full"
                                                    style={{ background: s.dot }}
                                                />
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Activity snapshot ── */}
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { label: 'Total Products', value: products?.length ?? 0, icon: faBoxesStacked, color: NAVY },
                    { label: 'Total Categories', value: categories?.length ?? 0, icon: faLayerGroup, color: GOLD },
                    { label: 'Pending Inquiries', value: queries?.length ?? 0, icon: faMessage, color: '#10b981' },
                ].map(({ label, value, icon, color }, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                        style={{ border: '1px solid rgba(27,58,138,0.08)' }}
                    >
                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                            style={{ background: `${color}15`, color }}
                        >
                            <FontAwesomeIcon icon={icon} className="text-sm" />
                        </span>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                                {label}
                            </p>
                            <p className="text-xl font-extrabold text-gray-800">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AdminDashboard
