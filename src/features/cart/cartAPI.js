export function addToCart(item) {
  return new Promise(async (resolve , reject) => {
    const response = await fetch('http://localhost:8080/cart' , {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  })
}

export function fetchItemsByUserId(userId) {
  return new Promise(async ( resolve ) => {
    const response = await fetch('http://localhost:8080/cart?user=' + userId)
    const data = await response.json()
    console.log(data);
    resolve({ data })
  })
}

export function updateItem(updateInfo) {
  return new Promise(async (resolve , reject) => {
    const response = await fetch('http://localhost:8080/cart/' + updateInfo.id , {
      method: 'PATCH',
      body: JSON.stringify(updateInfo),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  })
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + itemId , {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data: {id: itemId} })
  })
}

export function resetCart(userId) {
  // get all the items of user's - cart and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId)
    const items = await response.data
    for(let item of items){
      await deleteItemFromCart(item.id)
    }
    resolve({ status: 'success' })
  })
}