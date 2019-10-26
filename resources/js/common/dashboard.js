import axios from 'axios'

export const onChangeIncomeYear = requestPathname => {
  const selectIncomeYear = document.querySelector('.js-select-income-year')
  if (!selectIncomeYear) return

  selectIncomeYear.addEventListener('change', (event) => {
    return axios.get(requestPathname, {params: {income_year: `1/1/${event.target.value}`}}).then(({data}) => {
      if (!data.html) return data.html
      document.querySelector('.js-table-income-year-report').innerHTML = data.html
      return data
    }).catch(error => {
      throw error
    })
  })
}

export const onChangeIncomeMonth = requestPathname => {
  const selectIncomeMonth = document.querySelector('.js-select-income-month')
  if (!selectIncomeMonth) return

  selectIncomeMonth.addEventListener('change', (event) => {
    return axios.get(requestPathname, {params: {income_month: `${event.target.value}`}}).then(({data}) => {
      document.querySelector('.js-span-income-month-report-posts-count').textContent = data.posts_count
      document.querySelector('.js-span-income-month-report-price').textContent = data.price
      document.querySelector('.js-span-income-month-report-gross-income').textContent = data.gross_income
      document.querySelector('.js-span-income-month-report-tax').textContent = data.tax
      document.querySelector('.js-span-income-month-report-net-income').textContent = `${data.net_income} ${data.currency}`
      return data
    }).catch(error => {
      throw error
    })
  })
}

export const onChangePostStatMonth = requestPathname => {
  const selectPostStatMonth = document.querySelector('.js-select-post-stat-month')
  if (!selectPostStatMonth) return

  selectPostStatMonth.addEventListener('change', (event) => {
    return axios.get(requestPathname, {params: {month: `${event.target.value}`}}).then(({data}) => {
      document.querySelector('.js-p-posts-count-in-month').textContent = data.posts_count
      document.querySelector('.js-p-published-post-in-month').textContent = data.published_count
      document.querySelector('.js-p-rejected-post-in-month').textContent = data.rejected_count
      document.querySelector('.js-p-approved-post-in-month').textContent = data.approved_count
      document.querySelector('.js-p-reviewing-post-in-month').textContent = data.reviewing_count
      document.querySelector('.js-p-draft-post-in-month').textContent = data.draft_count
      return data
    }).catch(error => {
      throw error
    })
  })
}
