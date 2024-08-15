import DOMPurify from "dompurify";

export  const purifyProjects = (projects) => {
    return projects.map(p => ({
        id: DOMPurify.sanitize(p.id),
        name: DOMPurify.sanitize(p.name),
        abrName: DOMPurify.sanitize(p.abrName),
        collab_with: DOMPurify.sanitize(p.collab_with),
        made_by: DOMPurify.sanitize(p.made_by),
        youtube_video: DOMPurify.sanitize(p.youtube_video),
        background_video: DOMPurify.sanitize(p.background_video),
        isActive: DOMPurify.sanitize(p.isActive)
    }))
}




export const purifyProjectDataAdminPage = (p) => {
    return{
        id: DOMPurify.sanitize(p.id),
        name: DOMPurify.sanitize(p.name),
        abrName: DOMPurify.sanitize(p.abrName),
        collab_with: DOMPurify.sanitize(p.collab_with),
        made_by: DOMPurify.sanitize(p.made_by),
        youtube_video: DOMPurify.sanitize(p.youtube_video),
        background_video: DOMPurify.sanitize(p.background_video),
        isActive: DOMPurify.sanitize(p.isActive),
        images: p.images.map(i => ({src: DOMPurify.sanitize(i.src),id: DOMPurify.sanitize(i.id)})),
        staff:{
            artists: DOMPurify.sanitize(p.staff.artists),
            cadrage: DOMPurify.sanitize(p.staff.cadrage),
            decorateurs: DOMPurify.sanitize(p.staff.decorateurs),
            droniste: DOMPurify.sanitize(p.staff.droniste),
            montage: DOMPurify.sanitize(p.staff.montage),
            moreStaffFields: p.staff.moreStaffFields ?  p.staff.moreStaffFields.map(f => DOMPurify.sanitize(f)) : [],
            phPlateau: DOMPurify.sanitize(p.staff.phPlateau),
            production: DOMPurify.sanitize(p.staff.production),
        }
    }}



    export const purifyProjectData = (p) => {
        return{
            images: p.images.map(i => DOMPurify.sanitize(i)),
            staff:{
                artists: DOMPurify.sanitize(p.staff.artists),
                cadrage: DOMPurify.sanitize(p.staff.cadrage),
                decorateurs: DOMPurify.sanitize(p.staff.decorateurs),
                droniste: DOMPurify.sanitize(p.staff.droniste),
                montage: DOMPurify.sanitize(p.staff.montage),
                moreStaffFields: p.staff.moreStaffFields ?  p.staff.moreStaffFields.map(f => DOMPurify.sanitize(f)) : [],
                ph_plateau: DOMPurify.sanitize(p.staff.ph_plateau),
                production: DOMPurify.sanitize(p.staff.production),
            }
        }}

export const purifyImages = (images) => {
    if (Array.isArray(images) && images.length === 0) {
        return []
    }
    if (Array.isArray(images) && images.length === 1) {
        return [{src:DOMPurify.sanitize(images[0].src)}]
    }
    return images.map(i => ({src: DOMPurify.sanitize(i.src)}))
}

export const purifyImagesAdminPage = (images) => {
    if (Array.isArray(images) && images.length === 0) {
        return []
    }
    if (Array.isArray(images) && images.length === 1) {
        return [{src:DOMPurify.sanitize(images[0].src),id: DOMPurify.sanitize(images[0].id)}]
    }
    return images.map(i => ({src: DOMPurify.sanitize(i.src),id: DOMPurify.sanitize(i.id)}))
}




