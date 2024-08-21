import { axiosInstance } from "./axiosInstance"


export async function getProjects() {
    try {
        const response = await axiosInstance.get("home/projects");
        if (response.status !== 200) {
            throw new Error("Error fetching projects");
        }
        if (!response.data.projects) {
            throw new Error("Error: no projects found");
        }
        return response.data.projects;
    } catch (error) {
        throw error; 
    }
}



export const getProjectData = async (id) => {
    try {
        const response = await axiosInstance.get("projectData/" + id);
            console.log(response);
            
        if (response.status !== 200) {
            throw new Error("Error fetching project data");
        }
        if (!response.data.projectData) {
            throw new Error("Error: no project data found");
        }
        return response.data.projectData;
    } catch (error) {
        throw error; 
    }
}



export const getProjectByName = async (name) => {
    try {
        const response = await axiosInstance.get("projectByName/" + name);
        
        if (response.status !== 200) {
            throw new Error("Error fetching project");
        }
        if (!response.data.project) {
            throw new Error("Error: no project found");
        }
        return response.data.project;
    } catch (error) {
        throw error; 
    }
}
