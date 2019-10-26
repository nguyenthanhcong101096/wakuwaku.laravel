import axios from 'axios'
import { delegate } from 'rails-ujs'
import { closest } from './util'
import createChannel from '../actioncable/cable'

const dropdown = () => document.querySelector('.js-dropdown-notification')
const count = () => dropdown().querySelector('.js-count-notification')

const notification = createChannel('NotificationChannel', {
  received(data) {
    if (!dropdown()) return

    liveNofications(data)
    clickDropDown(data)
  }
})

const liveNofications = data => {
  if (data['type'] === 'live') {
    const dataNotification = dropdown().querySelector('.js-list-notification').getAttribute('data-notification')
    if (dataNotification === 'notification-member') {
      dropdown().querySelector('.js-list-notification').insertAdjacentHTML('afterbegin', data['html_member'])
      count().classList.add('noti-badge')
      count().classList.remove('hidden')
    } else {
      dropdown().querySelector('.js-list-notification').insertAdjacentHTML('afterbegin', data['html_all'])
      count().classList.add('badge')
      count().classList.remove('hidden')
      count().innerText = data['count']
    }
  }
}

const clickDropDown = data => {
  if (data['type'] === 'read') count().classList.add('hidden')
}

export const onClickDropdownNotification = () => {
  if (!dropdown()) return

  dropdown().addEventListener('click', () => {
    notification.perform('click_dropdown_notifications')
  })
}

export const onclickReadNotification = () => {
  delegate(document, '.js-read-notification', 'click', event => {
    const notiId = parseInt(closest(event.target, '.js-read-notification').getAttribute('data'))
    if (!notiId) return

    notification.perform('read_notification', { id: notiId })
  })
}

export const onLoadMoreNotification = () => {
  const btnLoadMoreNotification = document.querySelector('.js-btn-load-more-noti')
  const notificationList = document.querySelector('.js-notification-list')
  if (!btnLoadMoreNotification || !notificationList) return

  btnLoadMoreNotification.addEventListener('click', e => {
    const dataNoti = JSON.parse(e.target.getAttribute('data-noti'))

    axios.get(`${window.location.pathname}?page=${parseInt(dataNoti.next_page)}`)
      .then(response => {
        response.data.notifications.forEach(noti => {
          notificationList.insertAdjacentHTML('beforeend', noti)
        })

        e.target.setAttribute('data-noti', JSON.stringify({next_page: response.data.next_page}))

        if (response.data.next_page === null) e.target.classList.add('u-hidden')
        
        return response
      })
      .catch(error => { throw error })
  })
}
