const BASE_URL = 'https://www.thecolorapi.com'

export const getColorInfo = async (hexCode: string) => {
  const cleanHex = hexCode.replace('#', '')
  const query = `/id?hex=${cleanHex}`

  try {
    const res = await fetch(BASE_URL + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
    })
    if (!res.ok) throw new Error()

    const result = await res.json()
    return result
  } catch {
    alert('색상을 불러오는 데 문제가 생겼어요.')
  }
}

export const getColorSchemes = async (hexCode: string) => {
  const cleanHex = hexCode.replace('#', '')
  const query = `/scheme?hex=${cleanHex}`

  try {
    const res = await fetch(BASE_URL + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
    })
    if (!res.ok) throw new Error()

    const result = await res.json()
    return result
  } catch {
    alert('색상을 불러오는 데 문제가 생겼어요.')
  }
}
