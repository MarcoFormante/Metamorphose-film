import { axiosInstance } from "./axiosInstance";


export const getGalleryImages = async (galleryName, offset) => {
    try {
        const res = await axiosInstance.get("gallery/" + galleryName, {
            params: {
                offset: offset,
            }
        })
        if (res.status !== 200) {
            throw new Error("error fetching images");
        }
        return {imgs:res.data.images,total: res.data.total};
    } catch (err) {
        throw err;
    }
}