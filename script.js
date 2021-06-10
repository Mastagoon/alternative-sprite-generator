const fs = require("fs")
const { exit } = require("process")

const append = (file, num) => {
    const [name, extension] = file.split(".")
    if(name.split('_')[0] === '½ºÅäÄ¿_³²')
        return `½ºÅäÄ¿_³²_${num}.${extension}` 
    return `${name}_${num || 1}.${extension}`
}

// read all male spriets
fs.readdir('./data/³²', (err, files) => {
    //  swordsman,archer,thief,mage,merchant,acolyte
    const firstClassNames = ["°Ë»ç", "±Ã¼ö","µµµÏ","¸¶¹ý»ç","»óÀÎ","¼ºÁ÷ÀÚ"]
    // knight,crusader,hunter,bard,assassin,rogue,wiz,sage,alchemist,blacksmith,priest,monk
    const secondClassNames = ["±â»ç","Å©·ç¼¼ÀÌ´õ","ÇåÅÍ","¹Ùµå","¾î¼¼½Å","·Î±×","À§Àúµå","¼¼ÀÌÁö","¿¬±Ý¼ú»ç","Á¦Ã¶°ø","¼ºÅõ»ç","¸ùÅ©"]
    // lk,pally,sniper,clown,sinx,stalker,hwiz,prof,creator,mastersmith,hp,champion,
    const rebirthClassNames = ["·Îµå³ªÀÌÆ®","ÆÈ¶óµò","½º³ªÀÌÆÛ","Å¬¶ó¿î","¾î½Ø½ÅÅ©·Î½º","½ºÅäÄ¿","ÇÏÀÌÀ§Àúµå","ÇÁ·ÎÆä¼­","Å©¸®¿¡ÀÌÅÍ","È­ÀÌÆ®½º¹Ì½º","ÇÏÀÌÇÁ¸®","Ã¨ÇÇ¿Â"]
    // rk,rg,ranger,minstral,gx,SC,WL,Sorc,genetic,mechanic,AB,Sura
    const thirdClassNames = ["·é³ªÀÌÆ®","°¡µå","·¹ÀÎÁ®","¹Î½ºÆ®·²","±æ·ÎÆ¾Å©·Î½º","½¦µµ¿ìÃ¼ÀÌ¼","¿ö·Ï","¼Ò¼­·¯","Á¦³×¸¯","¹ÌÄÉ´Ð","¾ÆÅ©ºñ¼ó","½´¶ó"]
    // swordmen's lion, performers, thief, mage, merchant
    const mounts = ["»çÀÚ", "Å¸Á¶", "ÄÌº£·Î½º", "¿©¿ì", "äµÅÁö", "¾ËÆÄÄ«"]
    const fourthClassNames = ["dragon_knight","imperial_guard","windhawk","troubadour","shadow_cross","abyss_chaser","arch_mage","elemetal_master","biolo","meister","cardinal","inquisitor"]
    // rebel,tkm,tkm fly,ninja,starempror,staremp flying,SR,linker,taekwon
    const expandedClassNames = ["°Ç³Ê","±Ç¼º","±Ç¼ºÀ¶ÇÕ","´ÑÀÚ","¼ºÁ¦","¼ºÁ¦À¶ÇÕ","¼Ò¿ï¸®ÆÛ","¼Ò¿ï¸µÄ¿","ÅÂ±Ç¼Ò³â"]
    // files is an array with all the filenames of the sprites
    const actFiles = files.filter(f => f.toLowerCase().endsWith(".act"))
    const spriteFiles = files.filter(f => f.toLowerCase().endsWith(".spr"))
    // we start at rebirth classes
    // copy all 1st classes and put them into _1
    // rename all 1st classes to the according rebirth class
    const firstClassFiles = [], secondClassFiles = [], thirdClassFiles = [], fourthClassFiles = [], expandedClassFiles = []
    const fullFileList = [...spriteFiles.concat(actFiles)]

    secondClassNames.forEach(second => secondClassFiles.push([...fullFileList.filter(f => (f.includes(second) && !f.includes('_h_')))]))
    firstClassNames.forEach(first => firstClassFiles.push([...fullFileList.filter(f => (f.includes(first) && !f.includes('_h_')))]))
    thirdClassNames.forEach(third => thirdClassFiles.push([...fullFileList.filter(f => (f.includes(third) && !f.includes('_h_')))]))
    fourthClassNames.forEach(fourth => fourthClassFiles.push([...fullFileList.filter(f => (f.toLowerCase().includes(fourth)&& !f.includes("_h_")))]))
    expandedClassNames.forEach(expanded => expandedClassFiles.push([...fullFileList.filter( f => f.includes(expanded))]))
    // return console.log(a)
    // fixing things
    const rebirthFiles = []
    rebirthClassNames.forEach(re => rebirthFiles.push([...fullFileList.filter(f => (f.includes(re) && !f.includes("_h_")))]))

    let index = 0
    for(rebirth of rebirthFiles) {
        console.log(rebirth, rebirth.length)
        console.log(`Copying over files associated with the rebirth class of index ${index}`)
        // 2nd class
        console.log(`Copying 2nd job files..`)
        let list = secondClassFiles[index] // list is a list of sprites for the 1st job corresponding to the indexed rebirth job
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_1/${append(file.replace(secondClassNames[index], rebirthClassNames[index]), 1)}`)
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        // 2nd class mounts
        for(file of list) {
            if(file.includes("ÆäÄÚÆäÄÚ")) // knight pecopeco
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_1/${append(`·ÎµåÆäÄÚ_³².${file.split(".")[1]}`, 1)}`)
            if(file.includes("±¸ÆäÄÚÅ©·ç¼¼ÀÌ´õ"))   // crusader pecopeco
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_1/${append(`ÆäÄÚÆÈ¶óµò_³².${file.split(".")[1]}`, 1)}`)
        }
        // 3rd class
        console.log(`Copying 3rd job files and alternatives..`)
        list = thirdClassFiles[index]
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_2/${append(file.replace(thirdClassNames[index], rebirthClassNames[index]), 2)}`)
            try {
                fs.copyFileSync(`./³²/alt/${append(file, 1)}`, `./³²/costume_3/${append(file.replace(thirdClassNames[index], rebirthClassNames[index]), 3)}`)
            } catch(err) {
                console.log(err.message)
            }
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        // 3rd class mounts
        for(file of list) {
            if(file.includes("·é³ªÀÌÆ®»Ú¶ì")) { // rk dragon
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_2/${append(`·ÎµåÆäÄÚ_³².${file.split(".")[1]}`, 2)}`)    // #TODO colors?
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_3/${append(`·ÎµåÆäÄÚ_³².${file.split(".")[1]}`, 3)}`)    // #TODO colors?
            }
            if(file.includes("±×¸®Æù°¡µå")) {   // rg's chicken
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_2/${append(`ÆäÄÚÆÈ¶óµò_³².${file.split(".")[1]}`, 2)}`)    // #TODO colors?
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_3/${append(`ÆäÄÚÆÈ¶óµò_³².${file.split(".")[1]}`, 3)}`)    // #TODO colors?
            }
        }
        // 4th class
        console.log(`Copying 4th job files`)
        list = fourthClassFiles[index]
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(file.toLowerCase().replace(fourthClassNames[index], rebirthClassNames[index]), 4)}`)
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        //4th class mounts
        for(file of list) {
            if(file.toLowerCase().includes("dragon_knight_chicken"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`·ÎµåÆäÄÚ_³².${file.split(".")[1]}`, 4)}`)    // #TODO colors?
            if(file.toLowerCase().includes("dragon_knight_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`»çÀÚ·Îµå³ªÀÌÆ®_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("imperial_guard_chicken"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`ÆäÄÚÆÈ¶óµò_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("imperial_guard_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`»çÀÚÆÈ¶óµò_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("windhawk_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`Å¸Á¶½º³ªÀÌÆÛ_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("troubadour_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`Å¸Á¶Å©¶ó¿î_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("shadow_cross_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("abyss_chaser_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`ÄÌº£·Î½º½ºÅäÄ¿_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("arch_mage_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`¿©¿ìÇÏÀÌÀ§Àúµå_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("elemetal_master_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`¿©¿ìÇÁ·ÎÆä¼­_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("biolo_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`Å©¸®¿¡ÀÌÅÍ¸äµÅÁö_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("meister_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`È­ÀÌÆ®½º¹Ì½º¸äµÅÁö_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("cardinal_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`ÇÏÀÌÇÁ¸®½ºÆ®¾ËÆÄÄ«_³².${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("inquisitor_riding"))
                fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_4/${append(`Ã¨ÇÇ¿Â¾ËÆÄÄ«_³².${file.split(".")[1]}`, 4)}`)
        }
        index++
    }
    // expanded classes
    // ninja
    const ninjafiles = fullFileList.filter(f => f.includes('kagerou'))
    for(let i = 1; i <= 4; i++) {
        for(file of ninjafiles) {
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_${i}/${append(file.replace('kagerou', '´ÑÀÚ'),i)}`)
        }
    }
    // rebel
    const rebelFiles = fullFileList.filter(f => f.includes('rebellion'))
    for(let i = 1; i <= 4; i++) {
        for(file of rebelFiles)
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_${i}/${append(file.replace('rebellion', '°Ç³Ê'),i)}`)
    }
    // soul linker
    const linkerFiles = fullFileList.filter(f => f.includes('¼Ò¿ï¸®ÆÛ'))
    for(let i = 1; i <= 4; i++) {
        for(file of linkerFiles)
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_${i}/${append(file.replace('¼Ò¿ï¸®ÆÛ', '¼Ò¿ï¸µÄ¿'),i)}`)
    }
    // star emperor
    const starFiles = fullFileList.filter(f => f.includes('¼ºÁ¦'))
    for(let i = 1; i <= 4; i++) {
        for(file of starFiles)
            fs.copyFileSync(`./data/³²/${file}`, `./³²/costume_${i}/${append(file.replace('¼ºÁ¦', '±Ç¼º'),i)}`)
    }
    // exceptions
    // bard fix
    for(let i = 1; i <= 3; i++) {
        fs.copyFileSync(`./³²/costume_${i}/Å¸Á¶Å¬¶ó¿î_³²_${i}.spr`, `./³²/costume_${i}/Å¸Á¶Å©¶ó¿î_³²_${i}.spr`)
        fs.copyFileSync(`./³²/costume_${i}/Å¸Á¶Å¬¶ó¿î_³²_${i}.act`, `./³²/costume_${i}/Å¸Á¶Å©¶ó¿î_³²_${i}.act`)
        console.log("done fixing bard")
    }
    // shadow chaser fix
    for(let i = 2; i <= 3; i++) {
        fs.copyFileSync(`./³²/costume_${i}/½ºÅäÄ¿­_³²_${i}.spr`, `./³²/costume_${i}/½ºÅäÄ¿_³²_${i}.spr`)
        fs.copyFileSync(`./³²/costume_${i}/½ºÅäÄ¿­_³²_${i}.act`, `./³²/costume_${i}/½ºÅäÄ¿_³²_${i}.act`)
    }
    // fs.copyFileSync(`./³²/costume_3/ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_³²_3.spr`, `./³²/costume_1/ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_³²_1.spr`)
    // fs.copyFileSync(`./³²/costume_3/ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_³²_3.act`, `./³²/costume_1/ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_³²_1.act`)
})

// read all female sprites
fs.readdir('./data/¿©', (err, files) => {
    //  swordsman,archer,thief,mage,merchant,acolyte
    const firstClassNames = ["°Ë»ç", "±Ã¼ö","µµµÏ","¸¶¹ý»ç","»óÀÎ","¼ºÁ÷ÀÚ"]
    // knight,crusader,hunter,bard,assassin,rogue,wiz,sage,alchemist,blacksmith,priest,monk
    const secondClassNames = ["±â»ç","Å©·ç¼¼ÀÌ´õ","ÇåÅÍ","¹«Èñ","¾î¼¼½Å","·Î±×","À§Àúµå","¼¼ÀÌÁö","¿¬±Ý¼ú»ç","Á¦Ã¶°ø","¼ºÅõ»ç","¸ùÅ©"]
    // lk,pally,sniper,clown,sinx,stalker,hwiz,prof,creator,mastersmith,hp,champion,
    const rebirthClassNames = ["·Îµå³ªÀÌÆ®","ÆÈ¶óµò","½º³ªÀÌÆÛ","Áý½Ã","¾î½Ø½ÅÅ©·Î½º","½ºÅäÄ¿","ÇÏÀÌÀ§Àúµå","ÇÁ·ÎÆä¼­","Å©¸®¿¡ÀÌÅÍ","È­ÀÌÆ®½º¹Ì½º","ÇÏÀÌÇÁ¸®","Ã¨ÇÇ¿Â"]
    // rk,rg,ranger,minstral,gx,SC,WL,Sorc,genetic,mechanic,AB,Sura
    const thirdClassNames = ["·é³ªÀÌÆ®","°¡µå","·¹ÀÎÁ®","¿ø´õ·¯","±æ·ÎÆ¾Å©·Î½º","½¦µµ¿ìÃ¼ÀÌ¼","¿ö·Ï","¼Ò¼­·¯","Á¦³×¸¯","¹ÌÄÉ´Ð","¾ÆÅ©ºñ¼ó","½´¶ó"]
    // swordmen's lion, performers, thief, mage, merchant
    const mounts = ["»çÀÚ", "Å¸Á¶", "ÄÌº£·Î½º", "¿©¿ì", "äµÅÁö", "¾ËÆÄÄ«"]
    //
    const fourthClassNames = ["dragon_knight","imperial_guard","windhawk","trouvere","shadow_cross","abyss_chaser","arch_mage","elemetal_master","biolo","meister","cardinal","inquisitor"]
    // rebel,tkm,tkm fly,ninja,starempror,staremp flying,SR,linker,SN,novice,taekwon
    // files is an array with all the filenames of the sprites
    const actFiles = files.filter(f => f.toLowerCase().endsWith(".act"))
    const spriteFiles = files.filter(f => f.toLowerCase().endsWith(".spr"))
    // we start at rebirth classes
    // copy all 1st classes and put them into _1
    // rename all 1st classes to the according rebirth class
    const firstClassFiles = [], secondClassFiles = [], thirdClassFiles = [], fourthClassFiles = []
    const fullFileList = [...spriteFiles.concat(actFiles)]

    secondClassNames.forEach(second => secondClassFiles.push([...fullFileList.filter(f => (f.includes(second) && !f.includes('_h_')))]))
    firstClassNames.forEach(first => firstClassFiles.push([...fullFileList.filter(f => (f.includes(first) && !f.includes('_h_')))]))
    thirdClassNames.forEach(third => thirdClassFiles.push([...fullFileList.filter(f => (f.includes(third) && !f.includes('_h_')))]))
    fourthClassNames.forEach(fourth => fourthClassFiles.push([...fullFileList.filter(f => (f.toLowerCase().includes(fourth)&& !f.includes("_h_")))]))
    // fixing things
    const rebirthFiles = []
    rebirthClassNames.forEach(re => rebirthFiles.push([...fullFileList.filter(f => (f.includes(re) && !f.includes("_h_")))]))

    let index = 0
    for(rebirth of rebirthFiles) {
        console.log(rebirth, rebirth.length)
        console.log(`Copying over files associated with the rebirth class of index ${index}`)
        // 2nd class
        console.log(`Copying 2nd job files..`)
        let list = secondClassFiles[index] // list is a list of sprites for the 1st job corresponding to the indexed rebirth job
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_1/${append(file.replace(secondClassNames[index], rebirthClassNames[index]), 1)}`)
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        // 2nd class mounts
        for(file of list) {
            if(file.includes("ÆäÄÚÆäÄÚ")) // knight pecopeco
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_1/${append(`·ÎµåÆäÄÚ_¿©.${file.split(".")[1]}`, 1)}`)
            if(file.includes("±¸ÆäÄÚÅ©·ç¼¼ÀÌ´õ"))   // crusader pecopeco
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_1/${append(`ÆäÄÚÆÈ¶óµò_¿©.${file.split(".")[1]}`, 1)}`)
        }
        // 3rd class
        console.log(`Copying 3rd job files and alternatives..`)
        list = thirdClassFiles[index]
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_2/${append(file.replace(thirdClassNames[index], rebirthClassNames[index]), 2)}`)
            try {
                fs.copyFileSync(`./¿©/alt/${append(file, 1)}`, `./¿©/costume_3/${append(file.replace(thirdClassNames[index], rebirthClassNames[index]), 3)}`)
            } catch(err) {
                console.log(err.message)
            }
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        // 3rd class mounts
        for(file of list) {
            if(file.includes("·é³ªÀÌÆ®»Ú¶ì")) { // rk dragon
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_2/${append(`·ÎµåÆäÄÚ_¿©.${file.split(".")[1]}`, 2)}`)    // #TODO colors?
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_3/${append(`·ÎµåÆäÄÚ_¿©.${file.split(".")[1]}`, 3)}`)    // #TODO colors?

            }
            if(file.includes("±×¸®Æù°¡µå")) {   // rg's chicken
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_2/${append(`ÆäÄÚÆÈ¶óµò_¿©.${file.split(".")[1]}`, 2)}`)    // #TODO colors?
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_3/${append(`ÆäÄÚÆÈ¶óµò_¿©.${file.split(".")[1]}`, 3)}`)    // #TODO colors?
            }
        }
        // 4th class
        console.log(`Copying 4th job files`)
        list = fourthClassFiles[index]
        console.log(list)
        for(file of list) {
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(file.toLowerCase().replace(fourthClassNames[index], rebirthClassNames[index]), 4)}`)
            console.log(`Copied file ${file} as a rebirth job file.`)
        }
        //4th class mounts
        for(file of list) {
            if(file.toLowerCase().includes("dragon_knight_chicken"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`·ÎµåÆäÄÚ_¿©.${file.split(".")[1]}`, 4)}`)    // #TODO colors?
            if(file.toLowerCase().includes("dragon_knight_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`»çÀÚ·Îµå³ªÀÌÆ®_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("imperial_guard_chicken"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`ÆäÄÚÆÈ¶óµò_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("imperial_guard_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`»çÀÚÆÈ¶óµò_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("windhawk_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`Å¸Á¶½º³ªÀÌÆÛ_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("trouvere_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`Å¸Á¶Å©¶ó¿î_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("shadow_cross_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`ÄÌº£·Î½º¾î½ê½ÅÅ©·Î½º_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("abyss_chaser_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`ÄÌº£·Î½º½ºÅäÄ¿_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("arch_mage_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`¿©¿ìÇÏÀÌÀ§Àúµå_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("elemetal_master_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`¿©¿ìÇÁ·ÎÆä¼­_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("biolo_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`Å©¸®¿¡ÀÌÅÍ¸äµÅÁö_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("meister_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`È­ÀÌÆ®½º¹Ì½º¸äµÅÁö_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("cardinal_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`ÇÏÀÌÇÁ¸®½ºÆ®¾ËÆÄÄ«_¿©.${file.split(".")[1]}`, 4)}`)
            if(file.toLowerCase().includes("inquisitor_riding"))
                fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_4/${append(`Ã¨ÇÇ¿Â¾ËÆÄÄ«_¿©.${file.split(".")[1]}`, 4)}`)
        }

        index++
    }
    // expanded classes
    // ninja
    const ninjafiles = fullFileList.filter(f => f.includes('oboro'))
    for(let i = 1; i <= 4; i++) {
        for(file of ninjafiles) {
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_${i}/${append(file.replace('oboro', '´ÑÀÚ'),i)}`)
        }
    }
    // rebel
    const rebelFiles = fullFileList.filter(f => f.includes('rebellion'))
    for(let i = 1; i <= 4; i++) {
        for(file of rebelFiles)
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_${i}/${append(file.replace('rebellion', '°Ç³Ê'),i)}`)
    }
    // soul linker
    const linkerFiles = fullFileList.filter(f => f.includes('¼Ò¿ï¸®ÆÛ'))
    for(let i = 1; i <= 4; i++) {
        for(file of linkerFiles)
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_${i}/${append(file.replace('¼Ò¿ï¸®ÆÛ', '¼Ò¿ï¸µÄ¿'),i)}`)
    }
    // star emperor
    const starFiles = fullFileList.filter(f => f.includes('¼ºÁ¦'))
    for(let i = 1; i <= 4; i++) {
        for(file of starFiles)
            fs.copyFileSync(`./data/¿©/${file}`, `./¿©/costume_${i}/${append(file.replace('¼ºÁ¦', '±Ç¼º'),i)}`)
    }
    // exceptions
    // shadow chaser fix
    for(let i = 2; i <= 3; i++) {
        fs.copyFileSync(`./¿©/costume_${i}/½ºÅäÄ¿­_¿©_${i}.spr`, `./¿©/costume_${i}/½ºÅäÄ¿_¿©_${i}.spr`)
        fs.copyFileSync(`./¿©/costume_${i}/½ºÅäÄ¿­_¿©_${i}.act`, `./¿©/costume_${i}/½ºÅäÄ¿_¿©_${i}.act`)
    }
})
