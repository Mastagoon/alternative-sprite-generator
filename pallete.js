const fs = require("fs")

const pathToPalete = `./data/palette/¸ö`
const pathToCostumeFiles = `./data/palette/¸ö`

const append = (file, num) => {
    const [name, extension] = file.split(".")
    return `${name}_${num || 1}.${extension}`
}

fs.readdir(`./palette/¸ö`, (err, files) => {
    for(file of files) {
        for(let i = 1; i <= 4; i++) {
            fs.copyFileSync(`${pathToPalete}/${file}`, `${pathToCostumeFiles}/costume_${i}/${append(file, i)}`)
        }
        console.log(`finished copying ${file}.`)
    }
})