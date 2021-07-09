export async function getRequest(url) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAIN_HOST}${url}`, {
        'headers': {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
    })

    log(res)

    if (!res.ok) {
        return [null, res]
    }

    let data = null
    if (res.status != 204) {
        data = await res.json()
    }

    return [data, null]
}

export async function postRequest(url, request) {

    return sendRequest(url, 'POST', request)
}

export async function patchRequest(url, request) {

    return sendRequest(url, 'PATCH', request)
}

async function sendRequest(url, method, request) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAIN_HOST}${url}`, {
        method: method,
        'headers': {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        },
        body: JSON.stringify(request)
    })

    log(res)

    if (!res.ok) {
        return [null, res]
    }

    let data = null
    if (res.status != 204) {
        data = await res.json()
    }

    return [data, null]
}

async function log(res) {

    console.log({ res })

    if (!res.ok) {
        const response = await res.json()
        console.log(response)
        console.error(`Error response: ${res.statusText}`)        
    }
}