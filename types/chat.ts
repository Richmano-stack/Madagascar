
export type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai' | 'loading';
};