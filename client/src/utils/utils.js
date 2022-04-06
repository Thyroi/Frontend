// Notification

import styleNotification from "../components/Notification/Notification.module.scss";
export function Notifications(text) {
  let notification = document.querySelector("#notification");
  if (notification) {
    document.querySelector("#textNotification").innerHTML = text;

    if (notification.classList.contains(styleNotification.notification))
      notification.classList.remove(styleNotification.notification);

    if (notification.classList.contains(styleNotification.noNotification))
      notification.classList.remove(styleNotification.noNotification);

    if (notification.classList.contains(styleNotification.notification_hide))
      notification.classList.remove(styleNotification.notification_hide);

    notification.classList.add(styleNotification.notification);

    setTimeout(function () {
      notification.classList.remove(styleNotification.notification);

      if (notification.classList.contains(styleNotification.notification_hide))
        return;
      notification.classList.add(styleNotification.notification_hide);
    }, 5000);
  }
}

export function removeNotification() {
  let notification = document.querySelector("#notification");
  if (notification) {
    notification.classList.remove(styleNotification.notification);
    notification.classList.add(styleNotification.notification_hide);
  }
}

// Change default Image

export function selectImage(image) {
  let defaultImage = document.querySelector("#default_image");
  defaultImage.setAttribute("src", image);
}