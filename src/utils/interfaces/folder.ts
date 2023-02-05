export interface IFolder {
  name: string;
  path: string;
  children: IFolder[];
  files: IFile[];
  id: string;
  parent: IFolder | null;
}
export interface IFile {
  name: string;
  path: string;
  id: string;
  parent: IFolder | null;
  cid: string;
}
