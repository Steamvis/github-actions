async function wait() {
    const result = await new Promise(resolve => setInterval(resolve('done'), 1000))

    console.log('this is ' + result)
}

wait()