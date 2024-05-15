import { deleteFiles } from "../middleware/uploadFile";

export default async function cloudinaryDelete(file: string): Promise<boolean> {
  const { result } = await deleteFiles(file);

  if (result !== "ok") {
    return false;
  }

  return true;
}
