const API_URL = 'http://localhost:8000';

export async function fetchLogEntries() {
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
}
