export function saveFavs(favs: any) {
    window.localStorage.setItem('favs', JSON.stringify(favs))
}

export function getFavs(joinWith: any) {
    const favs = window.localStorage.getItem('favs')
    if (!favs) {
        return {
            ...joinWith
        }
    }

    return {
        ...JSON.parse(favs),
        ...joinWith,
    }
}
