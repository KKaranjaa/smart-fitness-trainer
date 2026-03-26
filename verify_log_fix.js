const verify = async () => {
    const BASE_URL = 'http://localhost:3000';
    try {
        console.log('--- Verifying Activity Log Metrics ---');
        
        // 1. Create a dummy session
        const r1 = await fetch(`${BASE_URL}/api/sessions/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'U0001', machineId: 'M001' })
        });
        const d1 = await r1.json();
        const sid = d1.data.sessionId;
        console.log('Started session:', sid);

        // 2. Complete the session with stats
        const testReps = 15;
        const testAccuracy = 88;
        await fetch(`${BASE_URL}/api/sessions/${sid}/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reps: testReps, accuracy: testAccuracy, duration: 120 })
        });
        console.log('Completed session with:', testReps, 'reps,', testAccuracy, '% accuracy');

        // 3. Check Analytics
        const r3 = await fetch(`${BASE_URL}/api/analytics/recent-sessions`);
        const d3 = await r3.json();
        const latest = d3.data[0];
        
        console.log('API Reps:', latest.repsCompleted);
        console.log('API Accuracy:', latest.accuracy);

        if (latest.repsCompleted === testReps && latest.accuracy === testAccuracy) {
            console.log('RESULT: SUCCESS - Metrics are registering correctly.');
        } else {
            console.log('RESULT: FAILURE - Metrics mismatch.');
        }

    } catch (e) { console.error('Error:', e.message); }
};
verify();
