const white = ['#ffffff', '#fff', 'white', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']

export function isWhite(color: string): boolean {
    return white.includes(color)
}
