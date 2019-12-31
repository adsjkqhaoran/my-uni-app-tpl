import alertImgSrc from '../static/images/common/alert.png'
import errorImgSrc from '../static/images/common/error.png'
/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;
  static pause = false;

  /**
   * 弹出提示框
   */
  static success (title, duration = 500) {
    uni.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    });
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    }
  }

  /**
   * 弹出确认窗口
   */
  static modal (text, title = '提示') {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      });
    });
  }

  /**
   * 弹出确认窗口
   */
  static confirm (text, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload);
          } else if (res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      });
    });
  }
  // static longToast (title, onHide, icon = 'none') {
  //   uni.showToast({
  //     title: title,
  //     icon: icon,
  //     mask: true,
  //     duration: 1000
  //   });
  //   // 隐藏结束回调
  //   if (onHide) {
  //     setTimeout(() => {
  //       onHide();
  //     },  1000);
  //   }
  // }
  static toast (title, onHide, icon = 'none') {
    uni.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 800
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 700);
    }
  }

  /**
   * 警告框
   */
  static alert (title) {
    uni.showToast({
      title: title,
      image: alertImgSrc,
      mask: true,
      duration: 1500
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  /**
   * 错误框
   */

  static error (title, onHide) {
    uni.showToast({
      title: title,
      image: '/assets/images/icons/error.png',
      mask: true,
      duration: 1500
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 1500);
    }
  }

  /**
   * 弹出加载提示
   */
  static loading (title = '加载中') {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    if (uni.showLoading) {
      uni.showLoading({
        title: title,
        mask: true
      });
    } else {
      uni.showNavigationBarLoading();
    }
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (this.isLoading) {
      this.isLoading = false;
      if (uni.hideLoading) {
        uni.hideLoading();
      } else {
        uni.hideNavigationBarLoading();
      }
    }
  }

  /**
   * 弹出下拉动作栏
   */
  static action (...items) {
    return new Promise((resolve, reject) => {
      uni.showActionSheet({
        itemList: items,
        success: function (res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          };
          resolve(result);
        },
        fail: function (res) {
          reject(res.errMsg);
        }
      });
    });
  }

  static actionWithFunc (items, ...functions) {
    uni.showActionSheet({
      itemList: items,
      success: function (res) {
        const index = res.tapIndex;
        if (index >= 0 && index < functions.length) {
          functions[index]();
        }
      }
    });
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功');
      }
    };
  }

  static setLoading () {
    this.isLoading = true;
  }
}
