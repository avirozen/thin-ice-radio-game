/**
 * STUDENT DEVICE
 * 
 * When students see a smiley face, it is safe to move around. When radio number 0 received, students are on thin ice and must be careful with their movements as they seek solid ground (sit on a table). All movement increases their movement variable. If movement reaches 10 they are dead. The variable does not reset.
 */
radio.onReceivedNumber(function (receivedNumber) {
    if (Dead == true) {
        basic.showIcon(IconNames.Skull)
    } else {
        if (receivedNumber == 0) {
            for (let index = 0; index < 2; index++) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `)
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            }
            Game = true
        }
        if (receivedNumber == 1) {
            Game = false
            basic.showIcon(IconNames.Happy)
        }
    }
})
let Dead = false
let Game = false
radio.setGroup(11)
let Movement = 0
Game = false
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    if (Dead == false) {
        if (Game == true) {
            if (input.acceleration(Dimension.Strength) > 1100) {
                Movement += 1
            }
            if (Movement == 10) {
                basic.showIcon(IconNames.Skull)
                Dead = true
            } else {
                led.plotBarGraph(
                Movement,
                10
                )
            }
        }
    }
})
