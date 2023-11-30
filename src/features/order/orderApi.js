export function createOrder(orderInfo) {
  return new Promise(async (resolve , reject) => {
    const response = await fetch('http://localhost:8080/order' , {
      method: 'POST',
      body: JSON.stringify(orderInfo),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  })
}