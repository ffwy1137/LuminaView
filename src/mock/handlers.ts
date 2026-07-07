import overview from './data/overview.json'
import trend from './data/trend.json'
import categories from './data/categories.json'
import cities from './data/cities.json'
import capabilities from './data/capabilities.json'
import realtime from './data/realtime.json'
import network from './data/network.json'

export default [
  {
    url: '/api/overview',
    method: 'get',
    statusCode: 200,
    response: () => overview,
  },
  {
    url: '/api/trend',
    method: 'get',
    statusCode: 200,
    response: () => trend,
  },
  {
    url: '/api/categories',
    method: 'get',
    statusCode: 200,
    response: () => categories,
  },
  {
    url: '/api/cities',
    method: 'get',
    statusCode: 200,
    response: () => cities,
  },
  {
    url: '/api/capabilities',
    method: 'get',
    statusCode: 200,
    response: () => capabilities,
  },
  {
    url: '/api/realtime',
    method: 'get',
    statusCode: 200,
    response: () => realtime,
  },
  {
    url: '/api/network',
    method: 'get',
    statusCode: 200,
    response: () => network,
  },
]
