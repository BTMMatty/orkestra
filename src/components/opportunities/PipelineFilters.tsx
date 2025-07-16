'use client';

import { useState } from 'react';

export function PipelineFilters({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({ owner: 'all', dateRange: 'this_month', minValue: 0 });

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="flex gap-4">
      <select onChange={e => handleChange('owner', e.target.value)} className="bg-black border-white/30">
        <option value="all">All Owners</option>
        {/* Mock options */}
      </select>
      <select onChange={e => handleChange('dateRange', e.target.value)} className="bg-black border-white/30">
        <option value="this_month">This Month</option>
        <option value="this_quarter">This Quarter</option>
      </select>
      <input 
        type="number" 
        placeholder="Min Value" 
        onChange={e => handleChange('minValue', parseInt(e.target.value))} 
        className="bg-black border-white/30 px-4 py-2"
      />
    </div>
  );
}