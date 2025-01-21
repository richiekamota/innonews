export interface Article {
    id: string;
    title: string;
    description: string;
    urlToImage: string;
    author: string;
    source: string;
    category: string;
    published_at: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface DropdownOptions {
    sources: { [key: number]: string };
    categories: { [key: number]: string };
  }