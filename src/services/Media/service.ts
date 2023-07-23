import { useMutation } from "@tanstack/react-query";

import { deleteFile, uploadFile } from "./api-service";


export const useUpload = () => {
    return useMutation((body: FormData) => uploadFile(body));
};

export const useDelete = () => {
    return useMutation((body: any) => deleteFile(body))
}

