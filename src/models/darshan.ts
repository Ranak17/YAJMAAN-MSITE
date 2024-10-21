export interface Comment {
    text: string;
    timestamp: string; // or `number` if you're using a timestamp as a number
    // userId: number,
    username: string
}
export interface DarshanVideo {
    templeId: number,
    videoUrl: string,
    filter: string,
    aboutTemple: TempleDetail,
    aartiTiming: string,
    videoViewCount: number,
    panditNames: []
    // comments: Comment[],
}

export interface TempleDetail {
    name: string,
    location: Location,
    description: string
}

export interface Location {
    houseNo: string,
    street: string,
    district: string,
    pincode: number,
    state: string
}
export interface DarshanVideosRequestDTO {
    offset: number,
    limit: number,
    filter: string | null
}

//TODO
export interface Temple {
    id: number,
    temple_story: string | null,
    temple_details: string | null,
    images: string[],
    temple_name: string
}

export interface DarshanAddComments {
    galleryId: number,
    userId: number,
    commentText: string
}

export interface DarshanCommentsResponseDTO {
    message: string,
    galleryId: number,
    userId: number,
    commentText: string
}

export interface DarshanVisitorCounterRequestDTO {
    galleryId: number,
    userId: number
}
export interface DarshanVisitorCounterResponseDTO {
    message: string,
}