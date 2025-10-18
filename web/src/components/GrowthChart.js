import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { apiClient } from '../lib/api';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);

export default function GrowthChart({ plantId, token }) {
  const [points, setPoints] = useState([]);
  const client = apiClient(token);

  useEffect(() => {
    if (!plantId) return;
    client.get('/api/observations/aggregate', { params: { plantId } }).then((res) => {
      const data = res.data.map((r) => ({ day: new Date(r.day).toLocaleDateString(), height: Number(r.avg_height) }));
      setPoints(data);
    }).catch(console.error);
  }, [plantId]);

  const data = {
    labels: points.map(p => p.day),
    datasets: [{ label: 'Height (cm)', data: points.map(p => p.height), fill: false }]
  };

  return <div><h4>Growth Chart</h4><Line data={data} /></div>;
}
