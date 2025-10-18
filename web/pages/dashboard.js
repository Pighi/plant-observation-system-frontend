import { useEffect, useState } from 'react';
import { useAuth } from '../src/context/auth';
import { apiClient } from '../src/lib/api';
import ObservationForm from '../src/components/ObservationForm';
import GrowthChart from '../src/components/GrowthChart';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [plants, setPlants] = useState([]);
  const [selected, setSelected] = useState(null);
  const client = apiClient(token);

  useEffect(() => {
    if (!token) return;
    client.get('/api/plants').then((r) => setPlants(r.data)).catch(console.error);
  }, [token]);

  return (
    <div className="container">
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: '30%' }} className="card">
          <h3>My Plants</h3>
          {plants.map((p) => <div key={p.id} style={{ marginTop: 8, cursor: 'pointer' }} onClick={() => setSelected(p)}>{p.name}</div>)}
        </div>
        <div style={{ width: '70%' }}>
          <div className="card">
            {selected ? (
              <>
                <h3>{selected.name}</h3>
                <ObservationForm plant={selected} onSaved={() => alert('Saved. Refresh chart.')} />
                <GrowthChart plantId={selected.id} token={token} />
              </>
            ) : (
              <div>Select a plant to add observations and see chart</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
