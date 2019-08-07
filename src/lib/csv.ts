import csv from 'csv'

type Row = {
    [key: string]: string
}

export async function decodeCsv<T>(content: string, map: (row: Row, index: number) => T): Promise<T[]> {
    const parser = csv.parse({
        delimiter: ',',
        columns: true,
    })
    const output: T[] = []
    let index = 0

    return new Promise((resolve, reject) => {
        parser.on('readable', function () {
            let record
            while (record = parser.read()) {
                output.push(map(record, index))
                index ++
            }
        })
        parser.on('error', function (err) {
            reject(err.message)
        })
        parser.on('end', function () {
            resolve(output)
        })
        parser.write(content)
        parser.end()
    })
}

export async function encodeCsv<T>(data: T[], header: string[], map: (row: T) => string[]): Promise<string> {
    let out = ''
    out += header.join(',')
    out += '\n'

    data.forEach(x => {
        out += map(x).join(',')
        out += '\n'
    })

    return out

    // const parser = csv.parse({
    //     delimiter: ',',
    //     columns: true,
    // })
    // const output: T[] = []

    // return new Promise((resolve, reject) => {
    //     parser.on('readable', function () {
    //         let record
    //         while (record = parser.read()) {
    //             output.push(map(record))
    //         }
    //     })
    //     parser.on('error', function (err) {
    //         reject(err.message)
    //     })
    //     parser.on('end', function () {
    //         resolve(output)
    //     })
    //     parser.write(content)
    //     parser.end()
    // })
}