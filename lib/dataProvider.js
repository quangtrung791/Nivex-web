// Custom data provider cho React Admin
import { stringify } from 'query-string'

const apiUrl = '/api/admin'

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return fetch(url)
      .then(response => {
        const total = parseInt(response.headers.get('X-Total-Count'), 10)
        return response.json().then(data => ({
          data,
          total,
        }))
      })
  },

  getOne: (resource, params) =>
    fetch(`${apiUrl}/${resource}/${params.id}`)
      .then(response => response.json())
      .then(data => ({ data })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    return fetch(url)
      .then(response => response.json())
      .then(data => ({ data }))
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      [params.target]: params.id,
      ...params.filter,
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return fetch(url)
      .then(response => {
        const total = parseInt(response.headers.get('X-Total-Count'), 10)
        return response.json().then(data => ({
          data,
          total,
        }))
      })
  },

  update: (resource, params) =>
    fetch(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => ({ data })),

  updateMany: (resource, params) => {
    const query = {
      id: params.ids,
    }
    return fetch(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => ({ data: params.ids }))
  },

  create: (resource, params) =>
    fetch(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => ({ data })),

  delete: (resource, params) =>
    fetch(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => ({ data })),

  deleteMany: (resource, params) => {
    const query = {
      id: params.ids,
    }
    return fetch(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => ({ data: params.ids }))
  },
}