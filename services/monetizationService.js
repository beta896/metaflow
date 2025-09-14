// services/monetizationService.js
import axios from 'axios';

export async function fetchMonetizationData(userId) {
  try {
    const response = await axios.get(`${process.env.MONETIZATION_API}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Monetization fetch failed:', error.message);
    throw error;
  }
}

export async function triggerAutomationFlow(payload) {
  try {
    const response = await axios.post(`${process.env.AUTOMATION_API}/trigger`, payload);
    return response.data;
  } catch (error) {
    console.error('Automation flow error:', error.message);
    throw error;
  }
}