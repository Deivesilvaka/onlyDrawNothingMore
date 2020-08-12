
class Mattress{

    constructor(){
        this.velocity = 0
        this.velocity2 = 0
        this.jumpForce = 0
        this.singleIdentifier = ""
        this.cnv = ""
        this.ctx = ""
        this.host = ""
        this.header = ""
    }

    clear() {
        return this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height)
    }

    singleId(){
        this.singleIdentifier = 7 * (window.innerWidth + window.innerHeight) * (window.innerWidth + window.innerHeight)
        return `${Math.sqrt(window.innerWidth, window.innerHeight)}${this.singleIdentifier.toFixed(2)}`
    }

    createCanvas(width, height) {

        if(!width || !height){
            width = 600
            height = 600
        }
        
        this.cnv = document.createElement("canvas")
        this.cnv.style.width = `${width}px`
        this.cnv.width = width
        this.cnv.style.height = `${height}px`
        this.cnv.height = height
        document.querySelector("body").appendChild(this.cnv)
        this.ctx = this.cnv.getContext("2d")
        return this.ctx
    }

    defineBorder() {
        this.cnv.style.border = "2px solid black"
    }

    center() {
        this.cnv.style.position = "absolute"
        this.cnv.style.margin = "auto"
        this.cnv.style.left = "0px"
        this.cnv.style.right = "0px"
        this.cnv.style.bottom = "0px"
        this.cnv.style.top = "0px"
    }

    gravity(player, Velocity) {
        this.velocity += Velocity
        player.y += this.velocity
        this.jumpForce = Math.floor(Velocity * 100)
    }

    fullScrean() {
        this.cnv.style.width = `100%`
        this.cnv.width = window.innerWidth
        this.cnv.style.height = `100%`
        this.cnv.height = window.innerHeight
        this.cnv.style.position = "absolute"
        this.cnv.style.border = "0"
    }

    collide(objA, objB) {
        
        const distX = (objA.x + objA.width/2) - (objB.x + objB.width/2)
		const distY = (objA.y + objA.height/2) - (objB.y + objB.height/2)

		const sumWidth = (objA.width + objB.width)/2
		const sumHeight = (objA.height + objB.height)/2

		if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
			const overlapX = sumWidth - Math.abs(distX)
			const overlapY = sumHeight - Math.abs(distY)

            if (overlapX > overlapY) {
                objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY
                this.velocity = 0
            } else {
                objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX
                this.velocity = 0
            }
        }
    }

    playSound(soundType, soundSrc, source) {

        var som = document.createElement("audio")

        for(let i in soundSrc){
            if (soundType === soundSrc[i]){
                som.src = source
            }
        }

        som.addEventListener("canplaythrough", function() {
            som.play()
        },false)
    }

    drawBackground(img) {
        this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.cnv.width, this.cnv.height)
    }

    backgroundMusic(musicSrc) {
        const sound = document.createElement("audio")
        sound.loop = true
        sound.autoplay = true
        sound.src = musicSrc
        sound.type = "audio/mpeg"
        sound.play()
    }

    configure(command) {
        if(command.header){
            this.header = command.header
        }else{
            this.header = ""
        }
        if(command.port){
            this.host = `${command.host}:${command.port}/`
        }else{
            this.host = `${command.host}`
        }
    }

    get(func, route, command) {
        let newHost = this.host+="/"
        if(route){
            newHost+=route
        }
        if(command){
            newHost += "?"
            for(const index in command){
                const itemName = index
                const itemValue = command[index]
                newHost += `${itemName}=${itemValue}&`
            }
            newHost = newHost.substring(0,(newHost.length - 1))
        }
        fetch(newHost, {
            mode:"cors",
            method:"GET"
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            func(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    post(func, route, command) {
        let newHost = this.host+="/"
        if(route){
            newHost+=route
        }
        if(command){
            newHost += "?"
            for(const index in command){
                const itemName = index
                const itemValue = command[index]
                newHost += `${itemName}=${itemValue}&`
            }
            newHost = newHost.substring(0,(newHost.length - 1))
        }
        fetch(newHost, {
            mode:"cors",
            method:"POST"
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            func(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

}
