'use client'
import { GetBuyingDatas } from '@/actions/get_data_buying/route'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

interface BuyingData {
    id_buy: number;
    id_user: number;
    id_game: number;
    total: number;
    date_buying: string;
}

const Statistik = () => {
    const [summary, setSummary] = useState<{ 
        totalRevenue: number, 
        chartData: { id_game: number, totalSold: number, revenue: number }[] 
    }>()

    const GetBuyingDatasMethodByIdDev = async (id_dev: any) => {
        const result = await GetBuyingDatas(id_dev)
        processSummary(result.data)
    }

    const processSummary = (data: BuyingData[][]) => {
        let totalRevenue = 0
        const stats: { id_game: number, totalSold: number, revenue: number }[] = []

        data.forEach(gameList => {
            if (gameList.length > 0) {
                const id_game = gameList[0].id_game
                const totalSold = gameList.length
                const revenue = gameList.reduce((sum, item) => sum + item.total, 0)
                totalRevenue += revenue

                stats.push({ id_game, totalSold, revenue })
            }
        })

        setSummary({
            totalRevenue,
            chartData: stats
        })
    }

    useEffect(() => {
        const id_dev = localStorage.getItem("id_dev")
        if (id_dev) GetBuyingDatasMethodByIdDev(id_dev)
    }, [])

    if (!summary) return <p style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Loading statistik...</p>

    return (
        <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'system-ui, sans-serif', color: '#222', padding: '0 1rem' }}>
            <h2 style={{ fontWeight: '600', fontSize: '1.8rem', marginBottom: '1rem', textAlign: 'center' }}>📊 Statistik Penjualan Game</h2>

            <h3 style={{ fontWeight: '500', fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                💰 Total Pendapatan: Rp {summary.totalRevenue.toLocaleString()}
            </h3>

            <section style={{ marginBottom: '2rem' }}>
                {summary.chartData.map((game, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            padding: '0.75rem 1rem', 
                            borderBottom: i === summary.chartData.length - 1 ? 'none' : '1px solid #ddd',
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            fontSize: '0.95rem'
                        }}
                    >
                        <div>
                            <strong>🎮 Game ID:</strong> {game.id_game}
                        </div>
                        <div style={{ minWidth: 130, textAlign: 'right' }}>
                            <div>Terjual: {game.totalSold}x</div>
                            <div>Total: Rp {game.revenue.toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </section>

            <h3 style={{ fontWeight: '600', fontSize: '1.2rem', marginBottom: 12, textAlign: 'center' }}>
                📉 Chart Penjualan per Game
            </h3>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={summary.chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis 
                        dataKey="id_game" 
                        tick={{ fill: '#666', fontSize: 12 }} 
                        label={{ value: 'ID Game', position: 'insideBottom', offset: -5, fill: '#666', fontSize: 12 }} 
                    />
                    <YAxis 
                        tick={{ fill: '#666', fontSize: 12 }} 
                        tickFormatter={(value) => value.toLocaleString()} 
                    />
                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    <Bar dataKey="totalSold" fill="#333" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Statistik
