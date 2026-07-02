import { useEffect, useMemo, useState } from 'react'

const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim()

const extractCollection = (payload, collectionKey) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload[collectionKey])) {
    return payload[collectionKey]
  }

  const arrayKeys = ['results', 'items', 'data', 'docs']
  for (const key of arrayKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  if (payload[collectionKey] && typeof payload[collectionKey] === 'object') {
    for (const key of arrayKeys) {
      if (Array.isArray(payload[collectionKey][key])) {
        return payload[collectionKey][key]
      }
    }
  }

  return []
}

const getPaginationMeta = (payload, itemCount) => {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return {
      page: null,
      pageSize: null,
      total: itemCount,
    }
  }

  const pagination = payload.pagination ?? {}

  const page = payload.page ?? payload.currentPage ?? pagination.page ?? null
  const pageSize =
    payload.pageSize ?? payload.limit ?? payload.perPage ?? pagination.pageSize ?? pagination.limit ?? null
  const total =
    payload.total ??
    payload.totalItems ??
    payload.totalCount ??
    payload.count ??
    pagination.total ??
    pagination.totalItems ??
    itemCount

  return { page, pageSize, total }
}

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'string') {
    const asDate = new Date(value)
    if (!Number.isNaN(asDate.getTime()) && /date|time/i.test(value)) {
      return asDate.toLocaleString()
    }

    return value
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value)
  }

  if (value === null || value === undefined) {
    return '—'
  }

  return String(value)
}

function Teams() {
  const title = 'Teams'
  const collectionKey = 'teams'

  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState({ page: null, pageSize: null, total: 0 })
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const codespaceName = getCodespaceName()
  const hasCodespaceName = Boolean(codespaceName)

  const endpointUrl = useMemo(() => {
    const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    return hasCodespaceName ? codespaceEndpoint : 'http://localhost:8000/api/teams/'
  }, [hasCodespaceName])

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(endpointUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const parsedItems = extractCollection(payload, collectionKey)
        setItems(parsedItems)
        setPagination(getPaginationMeta(payload, parsedItems.length))
        setStatus('success')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        setItems([])
        setPagination({ page: null, pageSize: null, total: 0 })
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [collectionKey, endpointUrl])

  const columns = useMemo(() => {
    if (items.length === 0 || typeof items[0] !== 'object' || !items[0]) {
      return []
    }

    return Object.keys(items[0])
  }, [items])

  const usingCodespaceEndpoint = hasCodespaceName

  return (
    <section>
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <p className="small text-muted mb-0 text-break">Endpoint: {endpointUrl}</p>
        </div>
        <span className={`badge ${usingCodespaceEndpoint ? 'text-bg-success' : 'text-bg-secondary'}`}>
          {usingCodespaceEndpoint ? 'Codespace URL' : 'Local fallback URL'}
        </span>
      </div>

      {status === 'loading' && <p className="mb-0">Loading data...</p>}

      {status === 'error' && (
        <div className="alert alert-danger mb-0" role="alert">
          <p className="mb-1 fw-semibold">Failed to load {title.toLowerCase()}.</p>
          <p className="mb-0 small">{errorMessage}</p>
        </div>
      )}

      {status === 'success' && items.length === 0 && (
        <div className="alert alert-info mb-0" role="status">
          No records found.
        </div>
      )}

      {status === 'success' && items.length > 0 && (
        <>
          <div className="small text-muted mb-2">
            Total: {pagination.total}
            {pagination.page !== null && ` | Page: ${pagination.page}`}
            {pagination.pageSize !== null && ` | Page size: ${pagination.pageSize}`}
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={`${collectionKey}-${index}`}>
                    {columns.map((column) => (
                      <td key={`${collectionKey}-${index}-${column}`}>{formatValue(item[column])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export default Teams