export interface metaDetail {
    title?: String,
    icon?: String,
    affix?: boolean,
    transition?: String
}
export interface metaItem {
    fullPath: string ,
    meta: metaDetail
}

export interface metaData{
    metaList:metaItem[],
    activeMeta:String
}