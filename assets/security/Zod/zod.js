import {z} from 'zod';

export const newProjectSchema = z.object({
    name: z.string().min(1,"Le nom du project est obligatoire").max(255,"Le nom du project ne doit pas dépasser 255 caractères"),
    abrName: z.string().min(1,"L'abréviation du project est obligatoire").max(255,"L'abréviation du project ne doit pas dépasser 255 caractères"),
    yt: z.string().min(5).max(255,"Le lien youtube ne doit pas dépasser 255 caractères").refine((value) => {
        if (!value.includes("youtube.com/watch?v=")) {
            return false
        }
       
        return true
    }),
    collab: z.string().min(1,"Le nom du collaborateur est obligatoire").max(255,"Le nom du collaborateur ne doit pas dépasser 255 caractères"),
    video: z.instanceof(File).superRefine((f,ctx) => {
        if (!["video/mp4"].includes(f.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le fichier doit être un fichier vidéo de type mp4"
            })
        }

        if (f.size > (10 * 1024 * 1024)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La taille du fichier VIDEO ne doit pas dépasser 10MB"
            })
        }
    }),
    production: z.string().min(1,"Le nom de la production est obligatoire").max(255,"Le nom de la production ne doit pas dépasser 255 caractères"),
    madeBy: z.string().min(1,"Le nom du réalisateur est obligatoire").max(255,"Le nom du réalisateur ne doit pas dépasser 255 caractères"),
    artists: z.string().max(255,"Le nom de l'artiste ne doit pas dépasser 255 caractères").nullable(),
    montage: z.string().max(255,"Le nom du monteur ne doit pas dépasser 255 caractères").nullable(),
    cadrage: z.string().max(255,"Le nom du cadreur ne doit pas dépasser 255 caractères").nullable(),
    droniste: z.string().max(255,"Le nom du droniste ne doit pas dépasser 255 caractères").nullable(),
    phPlateau: z.string().max(255,"Le nom du photographe plateau ne doit pas dépasser 255 caractères").nullable(),
    decorateurs: z.string().max(255,"Le nom du décorateur ne doit pas dépasser 255 caractères").nullable(),
    moreStaffFields: z.array(z.object(
        {
            value1:z.string().max(255,"Le rôle du membre de l'équipe ne doit pas dépasser 255 caractères"),
            value2:z.string().max(255,"Le nom du membre de l'équipe ne doit pas dépasser 255 caractères"),
        }
    )).nullable(),
    images: z.array(z.instanceof(File).superRefine((f,ctx) => {
        if (!["image/webp"].includes(f.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le fichier doit être un fichier image de type webp"
            })
        }

        if (f.size > (3 * 1024 * 1024)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La taille du fichier IMAGE ne doit pas dépasser 3MB"
            })
    }}))
})

