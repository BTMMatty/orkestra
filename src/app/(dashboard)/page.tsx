// src/app/(dashboard)/page.tsx
import { Suspense } from 'react'
import { CommandBar } from '@/components/nlp/CommandBar'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { PipelineChart } from '@/components/dashboard/PipelineChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Command Bar Section */}
      <section className="border-b border-white/20">
        <CommandBar />
      </section>

      {/* Metrics Grid */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6">BATTLE METRICS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="PIPELINE VALUE"
            value="$2.4M"
            change="+23%"
            trend="up"
          />
          <MetricCard
            title="WIN RATE"
            value="67%"
            change="+5%"
            trend="up"
          />
          <MetricCard
            title="AVG DEAL SIZE"
            value="$45K"
            change="+12%"
            trend="up"
          />
          <MetricCard
            title="VELOCITY"
            value="23 DAYS"
            change="-15%"
            trend="down"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div className="h-96 border border-white/20 animate-pulse" />}>
            <PipelineChart />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 border border-white/20 animate-pulse" />}>
            <RecentActivity />
          </Suspense>
        </div>
      </section>
    </div>
  )
}