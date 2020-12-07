function Gradient(colors: string[], minRange: number, maxRange: number, iformat: 'hex' | 'rgb' = 'hex', oformat: 'hex' | 'rgb' = 'hex'): string[] {
    let colorArr: string[] = []
    let flag: Boolean = true
    if (minRange > maxRange) throw new RangeError('The minimum value is greater than the maximum value')
    checkColor(colors, iformat)
    let increment: number = (maxRange - minRange) / (colors.length - 1)
    for (let count: number = 0; count < colors.length - 1; count++) {
        colorArr.push(...Gradientor(minRange, minRange + increment - 1, colors[count], colors[count + 1]))
    }
    function checkColor(colors: string[], iformat: 'hex' | 'rgb' = 'hex'): void {
        let hexRegex: RegExp = /^[0-9a-fA-F]{6}$/i
        // let rgbRegex: RegExp = ???
        colors.forEach(color => { if (!hexRegex.test(color)) return [] });
    }
    return colorArr
}


function Gradientor(minRange: number, maxRange: number, startColor: string, endColor: string): string[] {
    let colorArr: string[] = []
    let MAX: number = maxRange
    let MIN: number = minRange
    for (MIN; MIN <= MAX; MIN++) {
        colorArr.push(
            gradientor(MIN, startColor.substring(0, 2), endColor.substring(0, 2)) +
            gradientor(MIN, startColor.substring(2, 4), endColor.substring(2, 4)) +
            gradientor(MIN, startColor.substring(4, 6), endColor.substring(4, 6))
        )
    }

    function gradientor(index: number, cStart_Base16: string, cEnd_Base16: string) {
        let range: number = maxRange - minRange
        // 16进制转10进制
        let cStart_Base10: number = parseInt(cStart_Base16, 16)
        let cEnd_Base10: number = parseInt(cEnd_Base16, 16)
        // 渐进叠加
        let cPerUnit: number = (cEnd_Base10 - cStart_Base10) / range
        let c_Base10: number = Math.round(cPerUnit * (index - minRange) + cStart_Base10)

        // 返回两位hex
        return formatHex(c_Base10.toString(16))
    }
    function formatHex(hex: string): string {
        return hex.length < 2 ? '0' + hex : hex
    }
    return colorArr
}

export default Gradient

