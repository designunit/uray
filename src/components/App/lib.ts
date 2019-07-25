export function saveFavs(favs: any) {
    window.localStorage.setItem('favs', JSON.stringify(favs))
}

export function getFavs() {
    const favs = window.localStorage.getItem('favs')
    if (!favs) {
        return {}
    }

    return JSON.parse(favs)
}
