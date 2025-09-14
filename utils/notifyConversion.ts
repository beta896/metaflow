import Notification from '../models/notification.model';

export async function notifyConversion({ offerId, payout, source }) {
  try {
    const message = \Conversion tracked: \ - \$\ from \\;
    const notification = new Notification({
      type: 'success',
      message,
      context: 'conversion'
    });
    await notification.save();
    console.log('[Notify] Conversion alert saved');
  } catch (err) {
    console.error('[Notify] Failed to log conversion alert:', err.message);
  }
}
