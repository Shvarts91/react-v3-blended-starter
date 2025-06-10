export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostFormValues {
  title: string;
  body: string;
  id?: number;
}
