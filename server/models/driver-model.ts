export interface BasicDriver {
    id: number
    code: string
    firstname: string
    lastname: string
    country: string
    team: string
}

export interface Driver extends BasicDriver {
    imgUrl: string
    place: number
}