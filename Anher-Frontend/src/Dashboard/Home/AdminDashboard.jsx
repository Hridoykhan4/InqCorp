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
} from '@fortawesome/free-solid-svg-icons'

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend)

const StatCard = ({ icon, label, value, accent = 'safety-red' }) => (
    <div className='rounded-2xl border border-safety-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg'>
        <div className='flex items-center justify-between'>
            <span
                className={`grid h-11 w-11 place-items-center rounded-xl bg-${accent}/10 text-${accent}`}
            >
                <FontAwesomeIcon icon={icon} />
            </span>
            <span className='text-[11px] font-bold uppercase tracking-[0.18em] text-safety-muted'>
                Live
            </span>
        </div>
        <p className='mt-4 text-xs font-bold uppercase tracking-[0.18em] text-safety-muted'>
            {label}
        </p>
        <p className='mt-1 text-3xl font-extrabold leading-none text-safety-ink'>
            {value ?? 0}
        </p>
    </div>
)

const AdminDashboard = () => {
    const {
        products,
        categories,
        banners,
        dashboardBanners,
        queries,
        blogs,
    } = useOutletContext()
    const admin = useSelector((state) => state.hvac.users)

    const categoryCounts = useMemo(() => {
        const map = new Map()
        ;(categories || []).forEach((c) => map.set(c.name, 0))
        ;(products || []).forEach((p) => {
            if (map.has(p.category)) map.set(p.category, map.get(p.category) + 1)
        })
        return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
    }, [products, categories])

    const palette = [
        '#b91c1c', '#f59e0b', '#0ea5e9', '#10b981',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
        '#6366f1', '#84cc16',
    ]

    const doughnutData = {
        labels: categoryCounts.map((c) => capitalizeWords(c.name)),
        datasets: [
            {
                data: categoryCounts.map((c) => c.count),
                backgroundColor: categoryCounts.map((_, i) => palette[i % palette.length]),
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    }

    const barData = {
        labels: categoryCounts.map((c) => capitalizeWords(c.name)),
        datasets: [
            {
                label: 'Products',
                data: categoryCounts.map((c) => c.count),
                backgroundColor: '#b91c1c',
                borderRadius: 6,
            },
        ],
    }

    const totalBanners =
        (dashboardBanners?.length ?? banners?.length ?? 0)

    return (
        <div className='space-y-6 p-2 sm:p-3'>
            <div className='flex flex-col gap-1 rounded-2xl border border-safety-border bg-gradient-to-r from-safety-red to-safety-red-dark p-5 text-white shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6'>
                <div>
                    <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-white/75'>
                        <FontAwesomeIcon icon={faUserShield} className='mr-1.5' />
                        Welcome back
                    </p>
                    <h1 className='mt-1 text-2xl font-extrabold leading-tight sm:text-3xl'>
                        {admin?.name ? capitalizeWords(admin.name) : 'Admin'}
                    </h1>
                    <p className='mt-1 text-sm text-white/85'>
                        {admin?.role === 'admin' ? 'Administrator' : 'Sub Admin'}
                        {admin?.employee_id ? ` · ID ${admin.employee_id}` : ''}
                    </p>
                </div>
                <div className='hidden sm:block'>
                    <div className='rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-md'>
                        <p className='text-[10px] font-bold uppercase tracking-[0.22em] text-white/80'>
                            Today
                        </p>
                        <p className='mt-0.5 text-base font-extrabold'>
                            {new Date().toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
                <StatCard
                    icon={faBoxesStacked}
                    label='Products'
                    value={products?.length}
                />
                <StatCard
                    icon={faLayerGroup}
                    label='Categories'
                    value={categories?.length}
                />
                <StatCard
                    icon={faPhotoFilm}
                    label='Banners'
                    value={totalBanners}
                />
                <StatCard
                    icon={faMessage}
                    label='Inquiries'
                    value={queries?.length}
                />
            </div>

            <div className='grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
                <div className='rounded-2xl border border-safety-border bg-white p-4 shadow-sm sm:p-5'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-safety-red'>
                                Catalogue
                            </p>
                            <h3 className='mt-1 text-base font-extrabold text-safety-ink sm:text-lg'>
                                Products per Category
                            </h3>
                        </div>
                        <span className='hidden text-xs text-safety-muted sm:block'>
                            {products?.length || 0} total products
                        </span>
                    </div>
                    <div className='mt-4 h-64 sm:h-80'>
                        {categoryCounts.length > 0 ? (
                            <Bar
                                data={barData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        x: { ticks: { font: { size: 10 } } },
                                        y: { beginAtZero: true, ticks: { precision: 0 } },
                                    },
                                }}
                            />
                        ) : (
                            <p className='grid h-full place-items-center text-sm text-safety-muted'>
                                Add categories and products to see distribution.
                            </p>
                        )}
                    </div>
                </div>

                <div className='rounded-2xl border border-safety-border bg-white p-4 shadow-sm sm:p-5'>
                    <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-safety-red'>
                        Mix
                    </p>
                    <h3 className='mt-1 text-base font-extrabold text-safety-ink sm:text-lg'>
                        Category Distribution
                    </h3>
                    <div className='mt-4 grid h-64 place-items-center sm:h-80'>
                        {categoryCounts.length > 0 ? (
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    cutout: '62%',
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: { font: { size: 10 }, boxWidth: 12 },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p className='text-sm text-safety-muted'>
                                Distribution will appear once categories exist.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className='rounded-2xl border border-safety-border bg-white p-4 shadow-sm sm:p-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-base font-extrabold text-safety-ink sm:text-lg'>
                        Activity Snapshot
                    </h3>
                    <span className='text-[11px] font-bold uppercase tracking-[0.18em] text-safety-muted'>
                        Updated live
                    </span>
                </div>
                <div className='mt-3 grid gap-3 sm:grid-cols-3'>
                    <div className='rounded-xl bg-safety-surface p-4'>
                        <p className='text-xs font-bold uppercase tracking-[0.16em] text-safety-muted'>
                            Blogs Published
                        </p>
                        <p className='mt-1 text-2xl font-extrabold text-safety-ink'>
                            {blogs?.length ?? 0}
                        </p>
                    </div>
                    <div className='rounded-xl bg-safety-surface p-4'>
                        <p className='text-xs font-bold uppercase tracking-[0.16em] text-safety-muted'>
                            Pending Inquiries
                        </p>
                        <p className='mt-1 text-2xl font-extrabold text-safety-ink'>
                            {queries?.length ?? 0}
                        </p>
                    </div>
                    <div className='rounded-xl bg-safety-surface p-4'>
                        <p className='text-xs font-bold uppercase tracking-[0.16em] text-safety-muted'>
                            Avg products / category
                        </p>
                        <p className='mt-1 text-2xl font-extrabold text-safety-ink'>
                            {categoryCounts.length > 0
                                ? Math.round(
                                      (products?.length || 0) / categoryCounts.length
                                  )
                                : 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
