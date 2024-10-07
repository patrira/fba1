export interface Post {
  id: string;
  title: string;
  content: string;
  likedBy: Array<{ displayName: string; likedAt: Date }>;
  comments: Array<{ text: string; createdAt: Date }>;
}
