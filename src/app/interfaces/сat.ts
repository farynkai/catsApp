export interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
}

interface Breed {
  id: string;
  name: string;
}
