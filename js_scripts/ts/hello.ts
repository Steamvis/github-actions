function greet(person: string, date: Date) {
    console.log(`hello, ${person}`, date.toDateString());
}

greet('John', new Date())


function printArr(items: string[]) {
    const m: number = 6
    items.forEach(s => console.log(s.toUpperCase()))

    console.log(m)
}

printArr(['string', 'string1', 'string2'])


function returnArr(msg: string): string[] {
    let result: string[]

    result = msg.split(' ')

    return result
}


console.log(returnArr('split me! please'))

function optionalArgs(required: string, required2: number, canBeEmpty?: number, canBeEmpty2?: string): string {
    let result: string = '';

    result = `${required.length} + ${required2} + ${canBeEmpty} + ${canBeEmpty2}`

    return result
}

console.log(
    optionalArgs('only', 1),
    optionalArgs('all', 1, 2, 'all')
)


type My = {
    x: number
    s: string
}

function myTypePrint(m: My) {
    console.log(m.s)
    console.log(m.x)
}

myTypePrint({s: 'sad', x: 5})


type MyString = string

function sanitaze(s: string): MyString {
    return s.replace('/[ ]/m', '_')
}

console.log(
    sanitaze('ksadas erwg sd 2314 ax zxfas')
)

interface User {
    Name: string
    Age: number
}

const person_user: User = {
    Name: 'Me',
    Age: 49
}

console.log(person_user)

interface Admin extends User {
    Policies: string[]
}

const admin_user: Admin = {
    Name: 'dispatch',
    Age: 0,
    Policies: [
        'all',
        '*'
    ]
}

console.log(admin_user)


const assert = '1'
const assert2 = assert as string

console.log(assert2)