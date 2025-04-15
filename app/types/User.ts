export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  ensemble: string;
  stimmgruppe?: string;
  instrumentengruppe?: string;
  personal_info?: string;
  terms_accepted: boolean;
}
