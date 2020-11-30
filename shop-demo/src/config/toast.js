import { Toast } from 'vant'
export function toast(message, duration = 1000) {
    Toast({
        message, duration
    });
}
