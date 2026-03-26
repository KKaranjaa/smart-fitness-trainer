const verify = async () => {
    const BASE_URL = 'http://localhost:3000';
    try {
        console.log('--- Testing Eugene Mogare APIs ---');
        
        // 1. Get Clients
        const r1 = await fetch(`${BASE_URL}/api/clients`);
        const d1 = await r1.json();
        console.log('Total Clients Found:', d1.data.length);
        
        if (d1.data.length > 0) {
            const uid = d1.data[0].userId;
            console.log('Testing Detail for:', uid);

            // 2. Get Workouts
            const r2 = await fetch(`${BASE_URL}/api/clients/${uid}/workouts`);
            const d2 = await r2.json();
            console.log('Workouts Found:', d2.data.length);

            // 3. Post Note
            const testNote = 'Verified advanced tracking system logic ' + Date.now();
            const r3 = await fetch(`${BASE_URL}/api/clients/${uid}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: testNote })
            });
            const d3 = await r3.json();
            const lastNote = d3.data[d3.data.length - 1];
            console.log('Note Saved:', lastNote.content === testNote ? 'SUCCESS' : 'FAILURE');
        }

        console.log('\n--- Advanced Feature Verification Complete ---');
    } catch (e) { console.error('Error:', e.message); }
};
verify();
