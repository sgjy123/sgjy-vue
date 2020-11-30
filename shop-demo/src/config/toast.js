import { Toast } from 'vant'
import 'vant/lib/toast/style';
export function toast(message, duration = 1000) {
    Toast({
        message, duration
    });
}
